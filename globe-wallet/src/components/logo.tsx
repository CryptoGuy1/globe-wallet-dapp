import logo from '../assets/logo.png'; // adjust path if necessary

function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 text-primary font-bold text-2xl">
      <img src={logo} alt="GlobeWallet Logo" className="w-8 h-8" />
      <span>GlobeWallet</span>
    </div>
  );
}

export default Logo;
