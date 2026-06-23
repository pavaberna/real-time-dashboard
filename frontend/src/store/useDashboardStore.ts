import { create } from "zustand";
import type { DashboardData, CryptoData } from "../types/dashboard";

export const useDashboardStore = create<DashboardData>((set) => ({
  coins: {},
  isConnected: false,

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
}));
