
---

```markdown
# 🌍 GlobeWallet

**GlobeWallet** is a decentralized web application (DApp) that allows users to connect their MetaMask wallet, view token balances, and securely send ERC-20 tokens such as GBT, USDC, and DAI across supported Ethereum-compatible networks.

> 🔗 Live demo: [globe-wallet-dapp.vercel.app](https://globe-wallet-dapp.vercel.app)

---

## 🚀 Features

- 🔐 Connect MetaMask wallet securely
- 💰 View token balances (GBT, USDC, DAI)
- 🔄 Transfer ERC-20 tokens to any Ethereum address
- 🎨 Responsive, modern UI with gradient background and glassmorphism effects
- 🛠️ Built with Ethers.js and TypeScript for optimal type safety and blockchain interaction

---

## 🧱 Tech Stack

| Layer              | Technology                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **Frontend**       | [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/) |
| **UI Framework**   | [TailwindCSS](https://tailwindcss.com/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Blockchain**     | [Ethers.js](https://docs.ethers.org/), MetaMask, [Alchemy](https://www.alchemy.com/) |
| **Tooling**        | [Vite](https://vitejs.dev/) for bundling, [Hardhat](https://hardhat.org/) for smart contract deployment |
| **Hosting**        | [Vercel](https://vercel.com/)                                               |

---

## 📁 Folder Structure

```

├── public/                  # Static files
├── src/
│   ├── components/          # Navbar, Logo, Reusable UI
│   ├── constants/           # Token configurations
│   ├── App.tsx              # Main application component
│   ├── index.css            # Tailwind and custom styles
│   └── main.tsx             # Entry point
├── .env                     # Alchemy and Private Key (not committed)
├── tailwind.config.ts       # Tailwind configuration
└── vite.config.ts           # Vite configuration

````

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/globe-wallet.git
cd globe-wallet
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```bash
VITE_ALCHEMY_API_KEY=your_alchemy_key
PRIVATE_KEY=your_private_key
```

> ⚠️ Never commit your `.env` file.

### 4. Start the development server

```bash
npm run dev
```

---

## 📦 Build for Production

```bash
npm run build
```

Then deploy using [Vercel](https://vercel.com/) or any static hosting platform.

---

## ✅ TODO (Future Work)

* Add Airdrop feature
* Show transaction history with block explorer links
* Support multiple chains (Polygon, BNB, etc.)
* Implement dark mode toggle
* Add QR code scanning for recipient wallet address

---

## 🛡️ Security Notes

* The app interacts with MetaMask using secure browser APIs.
* Private keys are never exposed in frontend; all blockchain interactions use MetaMask signer or server-side logic when applicable.

---

## 📄 License

MIT License

---

## 🙌 Acknowledgments

* [Ethers.js](https://docs.ethers.io/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Vercel](https://vercel.com/)
* [Alchemy](https://www.alchemy.com/)
* Inspired by Ethereum’s open financial ecosystem

---

## 📬 Contact

Built with 💙 by **Benjamin Nweke**

Connect on [LinkedIn](https://linkedin.com/in/your-profile) • Follow on [GitHub](https://github.com/YOUR_USERNAME)

```

---

```
