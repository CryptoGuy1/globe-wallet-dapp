/// <reference types="vite/client" />
import type { Eip1193Provider } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}
