import { ConnectionStatus } from "../components/ConnectionStatus";

export const Navbar = () => {
  return (
    <nav className="w-full bg-[#030712]/60 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 py-3 flex justify-between items-center sticky top-0 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300">
      <div className="flex items-center gap-3 group cursor-pointer">
        <img
          src="/ikon.png"
          alt="Crypto Logo"
          className="w-8 h-8 object-contain transition-transform duration-500 group-hover:rotate-12 filter drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
        />
        <span className="font-orbitron font-extrabold text-lg tracking-widest bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent uppercase">
          Crypto{" "}
          <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            Dashboard
          </span>
        </span>
      </div>

      <div className="flex items-center justify-end">
        <ConnectionStatus />
      </div>
    </nav>
  );
};
