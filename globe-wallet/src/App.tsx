import { useEffect, useState } from "react";
import {
  BrowserProvider,
  Contract,
  formatUnits,
  parseUnits,
} from "ethers";
import { TOKENS } from "./constants/token";
import type { TokenConfig } from "./constants/token";
import Logo from "./components/logo";
import Navbar from "./components/Navbar";

declare global {
  interface Window {
    ethereum?: any;
  }
}

function App() {
  const [account, setAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<TokenConfig>(TOKENS[0]);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not detected");
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
  };

  const loadBalance = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const contract = new Contract(
        selectedToken.address,
        selectedToken.abi,
        provider
      );

      const raw = await contract.balanceOf(userAddress);
      const decimals = await contract.decimals();
      const formatted = formatUnits(raw, decimals);
      setBalance(formatted);
    } catch (err) {
      console.error("Error loading balance:", err);
      setBalance("0");
    }
  };

  const sendToken = async () => {
    try {
      setStatus("Sending...");

      if (!recipient || !amount) {
        setStatus("❌ Please fill in both the recipient address and amount.");
        return;
      }

      if (isNaN(Number(amount)) || Number(amount) <= 0) {
        setStatus("❌ Please enter a valid amount greater than 0.");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(
        selectedToken.address,
        selectedToken.abi,
        signer
      );
      const decimals = await contract.decimals();
      const value = parseUnits(amount, decimals);

      const tx = await contract.transfer(recipient, value);
      await tx.wait();

      setStatus("✅ Transfer successful!");
      setRecipient("");
      setAmount("");
      loadBalance();
    } catch (err: any) {
      setStatus("❌ Error: " + (err.message || "Failed"));
    }
  };

  useEffect(() => {
    if (account) loadBalance();
  }, [account, selectedToken]);

  return (
    <div className="relative min-h-screen gradient-bg-welcome text-yellow-300">
      <Navbar />

      {/* Connect Wallet Button */}
      <div className="absolute top-4 right-4 z-50 h-12">
        <button
          onClick={connectWallet}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition-opacity duration-200 ${
            account ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          Connect Wallet
        </button>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="white-glassmorphism p-6 rounded-2xl shadow-xl max-w-md w-full space-y-6">
          <div className="flex justify-center">
            <Logo />
          </div>

          {account && (
            <>
              <div className="text-sm">
                Connected Account:{" "}
                <span className="font-mono text-yellow-200">{account}</span>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold">Select Token</label>
                <select
                  value={selectedToken.symbol}
                  onChange={(e) =>
                    setSelectedToken(
                      TOKENS.find((t) => t.symbol === e.target.value) ||
                      TOKENS[0]
                    )
                  }
                  className="w-full border border-gray-300 p-2 rounded text-black focus:ring-2 focus:ring-primary"
                >
                  {TOKENS.map((token: TokenConfig) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.name} ({token.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-lg font-medium">
                Balance: {balance} {selectedToken.symbol}
              </div>

              <input
                type="text"
                placeholder="Recipient address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-white text-black border border-gray-300 p-2 rounded focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder={`Amount (${selectedToken.symbol})`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white text-black border border-gray-300 p-2 rounded focus:ring-2 focus:ring-primary"
              />

              <button
                onClick={sendToken}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded"
              >
                Send {selectedToken.symbol}
              </button>

              {status && (
                <div className="text-sm text-center">{status}</div>
              )}
            </>
          )}
        </div>
      </div>

      <footer className="absolute bottom-2 w-full text-center text-xs text-yellow-400">
        GlobeWallet © 2025
      </footer>
    </div>
  );
}

export default App;
