export interface CryptoData {
  symbol: string;
  price: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  timestamp: number;
}

export interface DashboardData {
  coins: Record<string, CryptoData>;
  isConnected: boolean;
  watchlist: string[];
  updateCoinData: (data: CryptoData) => void;
  setConnectionStatus: (isConnected: boolean) => void;
  initializeTop3Watchlist: () => void;
}
