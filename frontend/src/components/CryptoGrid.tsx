import { CryptoCard } from "./CryptoCard";
import { useDashboardStore } from "../store/useDashboardStore";

export const CryptoGrid = () => {
  const watchlist = useDashboardStore((state) => state.watchlist);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8 pl-2">
        <span className="text-cyan-400 text-xs font-semibold uppercase tracking-widest block mb-1 font-sans">
          TERMINAL MONITOR
        </span>
        <h2 className="font-sans font-extrabold text-2xl text-white tracking-wide">
          Figyelt Eszközök
        </h2>
      </div>

      {watchlist.length === 0 ? (
        <div className="text-center text-slate-500 font-sans text-sm py-12 animate-pulse border border-white/5 rounded-2xl bg-[#030712]/20">
          INITIALIZING WATCHLIST FEED...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {watchlist.map((s) => (
            <CryptoCard key={s} symbol={s} />
          ))}
        </div>
      )}
    </section>
  );
};
