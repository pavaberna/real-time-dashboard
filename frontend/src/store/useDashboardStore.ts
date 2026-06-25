import { create } from "zustand";
import type { DashboardData, CryptoData } from "../types/dashboard";

export const useDashboardStore = create<DashboardData>((set) => ({
  coins: {},
  isConnected: false,
  watchlist: [],
  selectedSymbol: null,

  updateCoinData: (newData: Omit<CryptoData, "history">) =>
    set((state) => {
      const existingHistory = state.coins[newData.symbol]?.history || [];

      const newHistoryPoint = {
        price: newData.price,
        timestamp: newData.timestamp,
      };

      const updatedHistory = [...existingHistory, newHistoryPoint].slice(-20);

      return {
        coins: {
          ...state.coins,
          [newData.symbol]: {
            ...newData,
            history: updatedHistory,
          },
        },
      };
    }),

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

  setSelectedSymbol: (symbol: string | null) => {
    set({
      selectedSymbol: symbol,
    });
  },
}));
