import { useDashboardStore } from "../store/useDashboardStore";

export const ConnectionStatus = () => {
  const isConnected = useDashboardStore((state) => state.isConnected);

  return (
    <div>
      <span
        className={`flex items-center gap-2 p-2 rounded-lg text-sm font-semibold w-fit mb-4 ${
          isConnected
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {isConnected ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
};
