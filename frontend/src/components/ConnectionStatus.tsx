import { useDashboardStore } from "../store/useDashboardStore";

export const ConnectionStatus = () => {
  const isConnected = useDashboardStore((state) => state.isConnected);

  return (
    <div>
      <span
        className={`flex items-center gap-2 py-1.5 px-4 rounded-full text-xs font-semibold font-orbitron tracking-wider border transition-all duration-300 w-fit ${
          isConnected
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            : "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            isConnected
              ? "bg-emerald-400 shadow-[0_0_6px_#10b981]"
              : "bg-rose-400 shadow-[0_0_6px_#f43f5e]"
          }`}
        />

        {isConnected ? "CONNECTED" : "DISCONNECTED"}
      </span>
    </div>
  );
};
