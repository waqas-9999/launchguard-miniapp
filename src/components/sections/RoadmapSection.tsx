import "./roadmap-mini.css";
import HeaderLabel from "../HeaderLabel/HeaderLabel";
import bulletIcon from "../../assets/img/bullet.png";

const RoadmapSection = () => {
  return (
    <div className="remtittix__roadmap section__padding container mx-auto min-h-screen relative overflow-hidden py-8 sm:py-12 lg:py-20">
      {/* Background Effects removed */}

      <div className="container relative z-10 px-4 sm:px-6 lg:px-0">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="relative inline-block">
            {/* Glow Effects removed */}

            <h2 className="text-2xl lg:text-6xl font-bold text-white leading-tight">
              <span className="text-[#efb81c]">Explore</span> Roadmap
            </h2>

            <p className="text-base sm:text-lg lg:text-xl pt-4 text-white/70 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Discover the journey ahead and witness our vision come to life
            </p>


          </div>
        </div>

        {/* Enhanced Roadmap Cards Container */}
        <div className="relative mb-12 max-w-7xl mx-auto sm:mb-16 lg:mb-20">
          {/* Connection Lines */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#efb81c]/40 transform -translate-x-1/2 hidden lg:block"></div>

          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {/* Step 1 */}
            <div className="group relative">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                {/* Left Content */}
                <div className="flex-1 w-full lg:w-auto order-2 lg:order-1">
                  <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                    {/* Removed hover glow overlay */}

                    <div className="relative z-10 space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <HeaderLabel
                          text="Vision & Foundation (2022)"
                          type="label"
                          fontSize="16px"
                          fontWeight="600"
                          color="#efb81c"
                          width="100%"
                          height="50px"
                          backgroundColor="rgba(15, 17, 21, 0.8)"
                          textAlign="center"
                          showBefore={false}
                          showAfter={false}
                        />
                      </div>

                      <div className="h-px bg-[#efb81c]/50"></div>

                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Researched blockchain scalability and exchange security challenges.

                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Defined a unique ownership-driven exchange model.
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Established mission to create a transparent, community-owned platform.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Timeline with Number */}
                <div className="relative z-20 flex-shrink-0 order-1 lg:order-2">
                  <div className="relative">
                    {/* Removed glow */}
                    {/* Number Circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#efb81c] via-[#efb81c]/90 to-[#efb81c]/80 rounded-full border-4 border-white/20 shadow-2xl flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-black">1</span>
                    </div>
                  </div>
                </div>

                {/* Right Content (Empty for Step 1) */}
                <div className="flex-1 order-3 lg:order-3"></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                {/* Left Content (Empty for Step 2) */}
                <div className="flex-1 order-2 lg:order-1"></div>

                {/* Center Timeline with Number */}
                <div className="relative z-20 flex-shrink-0 order-1 lg:order-2">
                  <div className="relative">
                    {/* Removed glow */}
                    {/* Number Circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#efb81c] via-[#efb81c]/90 to-[#efb81c]/80 rounded-full border-4 border-white/20 shadow-2xl flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-black">2</span>
                    </div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 w-full lg:w-auto order-3 lg:order-3">
                  <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                    {/* Removed hover glow overlay */}

                    <div className="relative z-10 space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <HeaderLabel
                          text="Exchange Development (2023)"
                          type="label"
                          fontSize="16px"
                          fontWeight="600"
                          color="#efb81c"
                          width="100%"
                          height="50px"
                          backgroundColor="rgba(15, 17, 21, 0.8)"
                          textAlign="center"
                          showBefore={false}
                          showAfter={false}
                        />
                      </div>

                      <div className="h-px bg-[#efb81c]/50"></div>

                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Conducted deep R&D on trading infrastructure, security, and compliance.

                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Designed BCX tokenomics for true exchange ownership.

                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Developed core systems in preparation for presale and mainnet.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                {/* Left Content */}
                <div className="flex-1 w-full lg:w-auto order-2 lg:order-1">
                  <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                    {/* Removed hover glow overlay */}

                    <div className="relative z-10 space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <HeaderLabel
                          text="Ownership Model Launch (2024)"
                          type="label"
                          fontSize="16px"
                          fontWeight="600"
                          color="#efb81c"
                          width="100%"
                          height="50px"
                          backgroundColor="rgba(15, 17, 21, 0.8)"
                          textAlign="center"
                          showBefore={false}
                          showAfter={false}
                        />
                      </div>

                      <div className="h-px bg-[#efb81c]/50"></div>

                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Introduced BCX, the first Exchange Ownership Coin.
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Launched transparent monthly buyback and burn mechanism.
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Empowered holders with governance rights and profit-sharing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Timeline with Number */}
                <div className="relative z-20 flex-shrink-0 order-1 lg:order-2">
                  <div className="relative">
                    {/* Removed glow */}
                    {/* Number Circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#efb81c] via-[#efb81c]/90 to-[#efb81c]/80 rounded-full border-4 border-white/20 shadow-2xl flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-black">3</span>
                    </div>
                  </div>
                </div>

                {/* Right Content (Empty for Step 3) */}
                <div className="flex-1 order-3 lg:order-3"></div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group relative">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                {/* Left Content (Empty for Step 4) */}
                <div className="flex-1 order-2 lg:order-1"></div>

                {/* Center Timeline with Number */}
                <div className="relative z-20 flex-shrink-0 order-1 lg:order-2">
                  <div className="relative">
                    {/* Removed glow */}
                    {/* Number Circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#efb81c] via-[#efb81c]/90 to-[#efb81c]/80 rounded-full border-4 border-white/20 shadow-2xl flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-black">4</span>
                    </div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 w-full lg:w-auto order-3 lg:order-3">
                  <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                    {/* Removed hover glow overlay */}

                    <div className="relative z-10 space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <HeaderLabel
                          text="BuyCex Infinity Chain Mainnet Launch (2025)"
                          type="label"
                          fontSize="16px"
                          fontWeight="600"
                          color="#efb81c"
                          width="100%"
                          height="50px"
                          backgroundColor="rgba(15, 17, 21, 0.8)"
                          textAlign="center"
                          showBefore={false}
                          showAfter={false}
                        />

                      </div>

                      <div className="h-px bg-[#efb81c]/50"></div>

                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Deployed hybrid EVM + Cosmos SDK blockchain.
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Released native $BCX coin powering both chain and exchange utilities.
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Delivered scalable, interoperable, and low-cost Layer 1 network.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                {/* Left Content */}
                <div className="flex-1 w-full lg:w-auto order-2 lg:order-1">
                  <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                    {/* Removed hover glow overlay */}

                    <div className="relative z-10 space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <HeaderLabel
                          text="Ecosystem & Product Expansion (2025–2026)"
                          type="label"
                          fontSize="16px"
                          fontWeight="600"
                          color="#efb81c"
                          width="100%"
                          height="50px"
                          backgroundColor="rgba(15, 17, 21, 0.8)"
                          textAlign="center"
                          showBefore={false}
                          showAfter={false}
                        />
                        <div className="relative mx-auto sm:mx-0">
                          {/* Removed glow */}

                        </div>
                      </div>

                      <div className="h-px bg-[#efb81c]/50"></div>

                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Released BitSaver, automating daily BTC savings with autosave feature.
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Launched BuyCex Launch Guard for safe early investment in new crypto projects with USDT or BCX.
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Expanded Web3 tools enabling project listing, auditing, and community engagement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Timeline with Number */}
                <div className="relative z-20 flex-shrink-0 order-1 lg:order-2">
                  <div className="relative">
                    {/* Removed glow */}
                    {/* Number Circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#efb81c] via-[#efb81c]/90 to-[#efb81c]/80 rounded-full border-4 border-white/20 shadow-2xl flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-black">5</span>
                    </div>
                  </div>
                </div>

                {/* Right Content (Empty for Step 5) */}
                <div className="flex-1 order-3 lg:order-3"></div>
              </div>
            </div>
            <div className="group relative">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                {/* Left Content (Empty for Step 4) */}
                <div className="flex-1 order-2 lg:order-1"></div>

                {/* Center Timeline with Number */}
                <div className="relative z-20 flex-shrink-0 order-1 lg:order-2">
                  <div className="relative">
                    {/* Removed glow */}
                    {/* Number Circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#efb81c] via-[#efb81c]/90 to-[#efb81c]/80 rounded-full border-4 border-white/20 shadow-2xl flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-black">6</span>
                    </div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 w-full lg:w-auto order-3 lg:order-3">
                  <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                    {/* Removed hover glow overlay */}

                    <div className="relative z-10 space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <HeaderLabel
                          text="Towards Global Community Ownership (2026 & Beyond)"
                          type="label"
                          fontSize="16px"
                          fontWeight="600"
                          color="#efb81c"
                          width="100%"
                          height="50px"
                          backgroundColor="rgba(15, 17, 21, 0.8)"
                          textAlign="center"
                          showBefore={false}
                          showAfter={false}
                        />
                      </div>

                      <div className="h-px bg-[#efb81c]/50"></div>

                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Expanding to multi-chain and cross-exchange interoperability.
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Targeting onboarding millions into community-owned exchange ecosystem.
                        </p>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative mt-1 flex-shrink-0">
                          <div className="relative bg-[#efb81c] p-1.5 sm:p-2 rounded-full">
                            <img
                              src={bulletIcon}
                              alt="Bullet"
                              className="h-2.5 w-2.5 sm:h-2 sm:w-2 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-medium">
                          Advancing full decentralization and user-driven revenue-sharing platform.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default RoadmapSection;
