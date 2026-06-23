import { useEffect } from "react";
import { useDashboardStore } from "../store/useDashboardStore";

export const useWebSocket = (url: string) => {
  const updateCoinData = useDashboardStore((state) => state.updateCoinData);
  const setConnectionData = useDashboardStore(
    (state) => state.setConnectionStatus,
  );

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      setConnectionData(true);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error on frontend:", error);
    };

    socket.onclose = () => {
      setConnectionData(false);
    };

    socket.onmessage = (event) => {
      try {
        const data = event.data;
        const result = JSON.parse(data);
        updateCoinData(result);
      } catch (error) {
        console.error("Error processing incoming data:", error);
      }
    };

    return () => {
      socket.close();
    };
  }, [url, updateCoinData, setConnectionData]);
};
