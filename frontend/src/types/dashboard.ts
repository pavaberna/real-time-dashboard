export interface HistoricalData {
  price: number;
  timestamp: number;
}

export interface CryptoData {
  symbol: string;
  price: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  timestamp: number;
  history: HistoricalData[];
}

export interface DashboardData {
  coins: Record<string, CryptoData>;
  isConnected: boolean;
  watchlist: string[];
  selectedSymbol: string | null;
  updateCoinData: (data: Omit<CryptoData, "history">) => void;
  setConnectionStatus: (isConnected: boolean) => void;
  initializeTop3Watchlist: () => void;
  setSelectedSymbol: (symbol: string | null) => void;
}
