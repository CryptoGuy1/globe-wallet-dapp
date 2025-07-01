import { BrowserProvider } from "ethers";

export const getProvider = () =>
  new BrowserProvider(window.ethereum);

export const connectWallet = async () => {
  const provider = getProvider();
  await provider.send("eth_requestAccounts", []);
  return await provider.getSigner();
};
