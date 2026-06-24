import { create } from "zustand";
import type { DashboardData, CryptoData } from "../types/dashboard";

export const useDashboardStore = create<DashboardData>((set) => ({
  coins: {},
  isConnected: false,
  watchlist: [],

  updateCoinData: (newData: CryptoData) =>
    set((state) => ({
      coins: {
        ...state.coins,
        [newData.symbol]: newData,
      },
    })),

  setConnectionStatus: (status: boolean) =>
    set({
      isConnected: status,
    }),

  initializeTop3Watchlist: () => {
    set((state) => {
      const top3Symbols = Object.values(state.coins)
        .sort((a, b) => b.price - a.price)
        .slice(0, 3)
        .map((coin) => coin.symbol);

      return { watchlist: top3Symbols };
    });
  },
}));
