import { ethers } from "hardhat";

async function main() {
  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(BigInt(10 ** 6) * BigInt(10 ** 18)); // 1 million tokens
  await token.waitForDeployment();
  console.log(`Token deployed to: ${token.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
