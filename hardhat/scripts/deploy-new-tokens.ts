const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying tokens with account:", deployer.address);

  const Token = await hre.ethers.getContractFactory("MyERC20Token");

  const usdc = await Token.deploy("USD Coin", "USDC", 1_000_000);
  await usdc.waitForDeployment();
  console.log("USDC deployed to:", await usdc.getAddress());

  const dai = await Token.deploy("Dai Stablecoin", "DAI", 1_000_000);
  await dai.waitForDeployment();
  console.log("DAI deployed to:", await dai.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
