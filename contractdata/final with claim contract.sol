// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

contract BCXPresaleNative is Ownable {
    using SafeERC20 for IERC20;

    // --- Presale Settings ---
    uint256 public rate;
    uint256 public minBuyLimit;
    uint256 public maxBuyLimit;
    uint256 public totalTokensforSale;
    uint256 public totalTokensSold;

    bool public isPresaleActive;
    bool public isUnlockingStarted;
uint256 public constant REFERRAL_BPS = 500; // 5.00%
uint256 public constant BPS_DENOMINATOR = 10_000;

    // --- Pricing / Whitelist ---
    mapping(address => bool) public tokenWL;
    mapping(address => uint256) public tokenPrices;

    // --- Referral System ---
    mapping(address => address) public referrerOf;
    mapping(address => uint256) public referralEarnings;
    mapping(address => uint256) public totalReferredUsers;

    // --- Accounting ---
    mapping(address => uint256) public userBCXAllocation;
    mapping(address => bool) public isDelivered;

    // --- Purchase Records ---
  struct PurchaseRecord {
    address buyer;
    address payToken;
    uint256 amountPaid;
    uint256 bcxReceived;
    uint256 timestamp;
    bool isReferralReward; 
}


    PurchaseRecord[] public allPurchases;
    mapping(address => PurchaseRecord[]) public userPurchases;
    mapping(address => address[]) public referredUsers;

// --- Claiming / Delivery ---
struct ClaimRecord {
    address user;      // original buyer
    address to;        // wallet provided at claim time (can be same as user)
    uint256 amount;    // BCX amount claimed in this operation
    uint256 timestamp; // block.timestamp when claimed
}

mapping(address => uint256) public claimedBCX;          // total claimed so far per user
ClaimRecord[] public allClaims;                         // global claim log (for admin/CSV)
mapping(address => ClaimRecord[]) public userClaims;    // per-user claim log

    // --- Events ---
    event Purchased(address indexed buyer, address indexed payToken, uint256 amountPaid, uint256 bcxAmount);
    event ReferralUsed(address indexed user, address indexed referrer, uint256 reward);
    event ETHWithdrawn(uint256 amount);
    event TokenWithdrawn(address token, uint256 amount);
    event PresaleToggled(bool status);
    event RateSet(uint256 newRate);
    event LimitsSet(uint256 minBuy, uint256 maxBuy);
    event TokenWhitelisted(address token, uint256 pricePerBCX);
    event TokenRemovedFromWhitelist(address token);
    event TotalTokensForSaleSet(uint256 newTotal);
    event UnlockingStatusSet(bool isUnlocking);

event Claimed(address indexed user, address indexed to, uint256 amount);

    constructor(address owner_) Ownable(owner_) {}

    // --- Modifiers ---
    modifier presaleActive() {
        require(isPresaleActive, "Presale is not active");
        _;
    }

    // --- Fallbacks ---
    receive() external payable {
        buyToken(address(0), 0, address(0));
    }

    fallback() external payable {}

    // --- Admin Functions ---
    function togglePresale(bool status) external onlyOwner {
        isPresaleActive = status;
        emit PresaleToggled(status);
    }

    function setRate(uint256 _rate) external onlyOwner {
        rate = _rate;
        emit RateSet(_rate);
    }

    function setMinMax(uint256 _min, uint256 _max) external onlyOwner {
        minBuyLimit = _min;
        maxBuyLimit = _max;
        emit LimitsSet(_min, _max);
    }

    function whitelistToken(address token, uint256 pricePerBCX) external onlyOwner {
        require(pricePerBCX > 0, "Invalid price");
        tokenWL[token] = true;
        tokenPrices[token] = pricePerBCX;
        emit TokenWhitelisted(token, pricePerBCX);
    }

    function removeWhitelistToken(address token) external onlyOwner {
        tokenWL[token] = false;
        tokenPrices[token] = 0;
        emit TokenRemovedFromWhitelist(token);
    }

    function setSaleTokenParams(uint256 _totalTokensforSale) external onlyOwner {
        totalTokensforSale = _totalTokensforSale;
        emit TotalTokensForSaleSet(_totalTokensforSale);
    }

    function startUnlocking() external onlyOwner {
        isUnlockingStarted = true;
        emit UnlockingStatusSet(true);
    }

    function stopUnlocking() external onlyOwner {
        isUnlockingStarted = false;
        emit UnlockingStatusSet(false);
    }

    function markAsDelivered(address buyer) external onlyOwner {
        require(userBCXAllocation[buyer] > 0, "Nothing to deliver");
        isDelivered[buyer] = true;
    }

    // --- Purchase with Referral ---
    function buyToken(address _token, uint256 _amount, address _referrer) public payable presaleActive {
        uint256 bcxAmount;

        if (_token == address(0)) {
            require(msg.value > 0, "No ETH sent");
            require(rate > 0, "ETH rate not set");
            bcxAmount = Math.mulDiv(msg.value, 1e18, rate);
        } else {
            require(tokenWL[_token], "Token not whitelisted");
            require(_amount > 0, "Zero token amount");
            uint256 price = tokenPrices[_token];
            require(price > 0, "Token price not set");
            bcxAmount = Math.mulDiv(_amount, 1e18, price);
            IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);
        }

        // Record referral
      if (_referrer != address(0) && _referrer != msg.sender && referrerOf[msg.sender] == address(0)) {
    referrerOf[msg.sender] = _referrer;
    totalReferredUsers[_referrer]++;
    referredUsers[_referrer].push(msg.sender);
}



        // Limits
        require(bcxAmount >= minBuyLimit, "Below min limit");
        require(userBCXAllocation[msg.sender] + bcxAmount <= maxBuyLimit, "Above max limit");

        uint256 totalBcxWithReferral = bcxAmount;

        // Referral reward (5%)
    if (referrerOf[msg.sender] != address(0)) {
    address referrer = referrerOf[msg.sender];
    uint256 reward = bcxAmount * REFERRAL_BPS / BPS_DENOMINATOR;
    userBCXAllocation[referrer] += reward;
    referralEarnings[referrer] += reward;
    totalBcxWithReferral += reward;

    emit ReferralUsed(msg.sender, referrer, reward);

    // ✅ Add this below to log referral reward as a transaction
 PurchaseRecord memory referralRecord = PurchaseRecord({
    buyer: referrer,
    payToken: address(0),
    amountPaid: 0,
    bcxReceived: reward,
    timestamp: block.timestamp,
    isReferralReward: true
});
allPurchases.push(referralRecord);
userPurchases[referrer].push(referralRecord);

}


        require(totalTokensSold + totalBcxWithReferral <= totalTokensforSale, "Presale cap reached");

        userBCXAllocation[msg.sender] += bcxAmount;
        totalTokensSold += totalBcxWithReferral;

       PurchaseRecord memory record = PurchaseRecord({
    buyer: msg.sender,
    payToken: _token,
    amountPaid: _token == address(0) ? msg.value : _amount,
    bcxReceived: bcxAmount,
    timestamp: block.timestamp,
    isReferralReward: false
});
allPurchases.push(record);
userPurchases[msg.sender].push(record);


      

        emit Purchased(msg.sender, _token, record.amountPaid, bcxAmount);
    }

    // --- Withdrawals ---
    function withdrawETH() external onlyOwner {
        uint256 amt = address(this).balance;
        require(amt > 0, "No ETH to withdraw");
        (bool ok, ) = payable(msg.sender).call{value: amt}("");
        require(ok, "ETH transfer failed");
        emit ETHWithdrawn(amt);
    }

    function withdrawToken(address token) external onlyOwner {
        uint256 bal = IERC20(token).balanceOf(address(this));
        require(bal > 0, "No token balance");
        IERC20(token).safeTransfer(msg.sender, bal);
        emit TokenWithdrawn(token, bal);
    }

    // --- Views ---
    function getTokenAmount(address token, uint256 amount) public view returns (uint256) {
        if (!isPresaleActive) return 0;
        if (token == address(0)) {
            require(rate > 0, "Rate not set");
            return Math.mulDiv(amount, 1e18, rate);
        } else {
            require(tokenWL[token], "Token not allowed");
            uint256 price = tokenPrices[token];
            require(price > 0, "Token price not set");
            return Math.mulDiv(amount, 1e18, price);
        }
    }

    function getAllPurchases() external view returns (PurchaseRecord[] memory) {
        return allPurchases;
    }

    function getUserPurchases(address user) external view returns (PurchaseRecord[] memory) {
        return userPurchases[user];
    }
    /// @notice Returns how many users someone referred and their total referral earnings
function getReferralStats(address user) external view returns (
    uint256 referredCount,
    uint256 totalEarnings,
    address[] memory referredAddresses,
    uint256[] memory bcxBoughtByEach
) {
    address[] memory users = referredUsers[user];
    uint256[] memory bcxBought = new uint256[](users.length);

    for (uint256 i = 0; i < users.length; i++) {
        bcxBought[i] = userBCXAllocation[users[i]];
    }

    return (users.length, referralEarnings[user], users, bcxBought);
}
/// @notice Returns (totalBought, totalClaimed, remainingToClaim) for a user.
function getUserTotals(address user) public view returns (uint256 totalBought, uint256 totalClaimed, uint256 remaining) {
    totalBought = userBCXAllocation[user];
    totalClaimed = claimedBCX[user];
    remaining = totalBought > totalClaimed ? totalBought - totalClaimed : 0;
}

/// @notice Convenience for frontend Claim screen.
function getUserClaimInfo(address user) external view returns (
    uint256 totalBought,
    uint256 totalClaimed,
    uint256 remaining,
    ClaimRecord[] memory claims,
    PurchaseRecord[] memory purchases
) {
    (totalBought, totalClaimed, remaining) = getUserTotals(user);
    claims = userClaims[user];
    purchases = userPurchases[user]; // frontend can show purchases + remaining
}
/// @notice Claim all remaining BCX to a provided wallet `to`.
/// Frontend will show the provided wallet and amount on the claim screen.
function claim(address to) external {
    require(isUnlockingStarted, "Claiming not started");
    require(to != address(0), "Invalid destination");

    ( , , uint256 remaining) = getUserTotals(msg.sender);
    require(remaining > 0, "Nothing to claim");

    // Effects
    claimedBCX[msg.sender] += remaining;

    // Log claim (for admin/CSV & user history)
    ClaimRecord memory c = ClaimRecord({
        user: msg.sender,
        to: to,
        amount: remaining,
        timestamp: block.timestamp
    });
    allClaims.push(c);
    userClaims[msg.sender].push(c);

    // NOTE: Actual BCX token transfer happens off-chain or in a later distribution step.
    // This contract is a presale ledger; the admin can use `allClaims` to fulfill.

    emit Claimed(msg.sender, to, remaining);
}
function getAllClaims() external view returns (ClaimRecord[] memory) {
    return allClaims;
}

function getUserClaimsLog(address user) external view returns (ClaimRecord[] memory) {
    return userClaims[user];
}



}
