import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboardStore } from "../store/useDashboardStore";
import { useState } from "react";

export const CryptoChart = () => {
  const selectedSymbol = useDashboardStore((state) => state.selectedSymbol);
  const watchlist = useDashboardStore((state) => state.watchlist);
  const coins = useDashboardStore((state) => state.coins);
  const [visiblePoints, setVisiblePoints] = useState(20);

  const finalSymbol = selectedSymbol || watchlist[0];
  const coinData = coins[finalSymbol];

  if (!coinData) {
    return (
      <div className="text-slate-500 font-mono text-xs animate-pulse p-6 border border-white/5 rounded-2xl bg-[#030712]/40 w-full h-[450px] flex items-center justify-center">
        INITIALIZING COIN TELEMETRY...
      </div>
    );
  }

  const chartData = coinData.history.map(({ price, timestamp }) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleTimeString("hu-HU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      price: price,
      timestamp: formattedDate,
    };
  });

  const slicedData = chartData.slice(-visiblePoints);

  const isPositive = coinData.changePercent >= 0;

  return (
    <div className="glass-panel p-6 rounded-2xl w-full h-[450px] flex flex-col justify-between relative overflow-hidden group">
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-cyan-500/15" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="text-cyan-400 text-[10px] font-bold font-mono tracking-widest uppercase">
              TELEMETRY_STREAM
            </span>
          </div>
          <h3 className="font-orbitron font-extrabold text-2xl text-white tracking-wider uppercase flex items-baseline gap-2">
            {coinData.symbol.replace("USDT", "")}
            <span className="text-xs font-mono text-slate-500 font-normal tracking-normal lowercase">
              vs usdt
            </span>
          </h3>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-white font-sans font-black text-3xl tracking-tight">
            ${" "}
            {coinData.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p
            className={`text-xs font-mono font-bold tracking-wider mt-0.5 ${isPositive ? "text-emerald-400" : "text-rose-400"}`}
          >
            {coinData.changePercent.toFixed(2)}% (24H)
          </p>
        </div>
      </div>

      <div className="w-full flex-1 min-h-[280px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={slicedData}
            margin={{ top: 10, right: 5, left: 5, bottom: 0 }}
          >
            <defs>
              <linearGradient id="cyberCyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(71, 85, 105, 0.15)"
              vertical={false}
            />

            <XAxis
              dataKey="timestamp"
              stroke="#475569"
              tickLine={false}
              axisLine={false}
              dy={10}
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                fill: "#64748b",
              }}
            />

            <YAxis
              domain={[
                (min: number) => min * 0.999,
                (max: number) => max * 1.001,
              ]}
              hide
            />

            <Tooltip
              cursor={{
                stroke: "rgba(6, 182, 212, 0.2)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                backgroundColor: "rgba(10, 15, 30, 0.9)",
                borderColor: "rgba(6, 182, 212, 0.4)",
                borderRadius: "16px",
                backdropFilter: "blur(12px)",
                color: "#fff",
                fontFamily: "monospace",
                fontSize: "12px",
                boxShadow:
                  "0 0 25px rgba(6, 182, 212, 0.2), inset 0 0 10px rgba(6, 182, 212, 0.1)",
              }}
              formatter={(value) => [
                `$ ${Number(value).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
                "ÁR",
              ]}
              labelFormatter={(label) => `IDŐ: ${label}`}
            />

            <Area
              type="monotone"
              dataKey="price"
              activeDot={false}
              dot={false}
              stroke="#06b6d4"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#cyberCyan)"
              style={{ filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))" }}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
          <span className="text-[10px] font-mono text-slate-400 uppercase">
            Távolság: {visiblePoints}p
          </span>
          <input
            type="range"
            min="5"
            max="30"
            value={visiblePoints}
            onChange={(e) => setVisiblePoints(Number(e.target.value))}
            className="w-24 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>
    </div>
  );
};
