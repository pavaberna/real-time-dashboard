import { useEffect } from "react";
import { CryptoGrid } from "./components/CryptoGrid";
import { useWebSocket } from "./hooks/useWebSocket";
import { useDashboardStore } from "./store/useDashboardStore";
import { Navbar } from "./components/Navbar";
import { BackgroundCanvas } from "./components/BackgroundCanvas";
import { CryptoChart } from "./components/CryptoChart";

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
    <div className="text-slate-100 font-sans min-h-screen relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <BackgroundCanvas />

      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="relative z-10 pt-24 pb-20">
        <CryptoGrid />
        <CryptoChart />
      </main>
    </div>
  );
}
