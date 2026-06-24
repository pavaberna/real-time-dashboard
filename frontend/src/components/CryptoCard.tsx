import { useDashboardStore } from "../store/useDashboardStore";

export const CryptoCard = ({ symbol }: { symbol: string }) => {
  const coinData = useDashboardStore((state) => state.coins[symbol]);

  const isPositive = coinData.changePercent >= 0;

  return !coinData ? (
    <div>Loading market data..</div>
  ) : (
    <div className="bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl shadow-xl w-72 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700">
      <p className="text-white font-bold text-xl tracking-wide mb-2">
        {coinData.symbol.replace("USDT", "")}
      </p>
      <p className="text-white font-extrabold text-3xl tracking-tight my-2">
        $ {coinData.price}
      </p>
      <p
        className={`inline-block px-2.5 py-1 rounded-md text-sm font-medium mt-2 
            ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            }`}
      >
        {coinData.changePercent} %
      </p>
    </div>
  );
};
