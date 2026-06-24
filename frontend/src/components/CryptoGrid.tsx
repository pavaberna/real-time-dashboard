import { CryptoCard } from "./CryptoCard";
import { useDashboardStore } from "../store/useDashboardStore";

export const CryptoGrid = () => {
  const watchlist = useDashboardStore((state) => state.watchlist);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 justify-items-center">
      {watchlist.map((s) => (
        <CryptoCard key={s} symbol={s} />
      ))}
    </div>
  );
};
