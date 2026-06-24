import { useEffect } from "react";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { CryptoGrid } from "./components/CryptoGrid";
import { useWebSocket } from "./hooks/useWebSocket";
import { useDashboardStore } from "./store/useDashboardStore";

export default function App() {
  useWebSocket("ws://localhost:3000");

  const coins = useDashboardStore((state) => state.coins);
  const watchlist = useDashboardStore((state) => state.watchlist);
  const initializeTop3Watchlist = useDashboardStore(
    (state) => state.initializeTop3Watchlist,
  );

  useEffect(() => {
    if (Object.keys(coins).length >= 4 && watchlist.length === 0) {
      initializeTop3Watchlist();
    }
  }, [coins, watchlist, initializeTop3Watchlist]);

  return (
    <div className="p-5 font-sans flex justify-center items-center flex-col bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Crypto Dashboard</h1>
      <ConnectionStatus />
      <CryptoGrid />
    </div>
  );
}
