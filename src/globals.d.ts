interface Token {
  address?: Address;
  name: string;
  symbol: string;
  image: string;
  decimals: number;
  price?: string;
  balance?: number;
}

interface User {
  wallet_address: string;
  ref_address: string;
}

type Address = `0x${string}`;

type ChainId = 56;
