// ✅ Define the ERC20_ABI first
export const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
  ] as const;
  
  // ✅ Then define the TokenConfig type
  export type TokenConfig = {
    name: string;
    symbol: string;
    address: string;
    abi: readonly string[];
  };
  
  // ✅ Then define the TOKENS array
  export const TOKENS: TokenConfig[] = [
    {
      name: "GlobeToken",
      symbol: "GBT",
      address: "0x6DCA7B47aEDe4EfFfE15329e4b94b207fDfb0f22",
      abi: ERC20_ABI,
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: ERC20_ABI,
    },
    {
      name: "Dai Stablecoin",
      symbol: "DAI",
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      abi: ERC20_ABI,
    },
  ];
  