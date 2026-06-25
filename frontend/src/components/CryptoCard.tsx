import { useDashboardStore } from "../store/useDashboardStore";

export const CryptoCard = ({ symbol }: { symbol: string }) => {
  const coinData = useDashboardStore((state) => state.coins[symbol]);
  const selectedSymbol = useDashboardStore((state) => state.selectedSymbol);
  const setSelectedSymbol = useDashboardStore(
    (state) => state.setSelectedSymbol,
  );

  if (!coinData) {
    return (
      <div className="text-slate-500 font-mono text-xs animate-pulse p-6 border border-white/5 rounded-2xl bg-[#030712]/40 w-72 text-center">
        LOADING DATA...
      </div>
    );
  }

  const isPositive = coinData.changePercent >= 0;
  const isSelected = selectedSymbol === symbol;

  return (
    <div
      onClick={() => {
        if (isSelected) {
          setSelectedSymbol(null);
        } else {
          setSelectedSymbol(symbol);
        }
      }}
      className={`glass-panel p-6 rounded-2xl cursor-pointer w-72 transition-all duration-300 hover:-translate-y-1 ${
        isSelected
          ? "!border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-[#0f172a]/60"
          : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-white font-bold text-xl tracking-wide font-orbitron">
          {coinData.symbol.replace("USDT", "")}
        </p>
        <span className="text-[9px] text-slate-500 tracking-widest font-mono">
          // LIVE
        </span>
      </div>

      <p className="text-white font-extrabold text-3xl tracking-tight my-3 font-sans">
        $ {coinData.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>

      <p
        className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold font-mono tracking-wider mt-2 
            ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.05)]"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.05)]"
            }`}
      >
        {isPositive ? "+" : ""}
        {coinData.changePercent.toFixed(2)} %
      </p>
    </div>
  );
};
