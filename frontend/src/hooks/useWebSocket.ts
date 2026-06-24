import { useEffect } from "react";
import { useDashboardStore } from "../store/useDashboardStore";

export const useWebSocket = (url: string) => {
  const updateCoinData = useDashboardStore((state) => state.updateCoinData);
  const setConnectionData = useDashboardStore(
    (state) => state.setConnectionStatus,
  );

  useEffect(() => {
    let isUnmounted = false;
    const socket = new WebSocket(url);

    socket.onopen = () => {
      if (isUnmounted) {
        socket.close();
        return;
      }

      setConnectionData(true);
    };

    socket.onerror = (error) => {
      if (isUnmounted) {
        return;
      }

      console.error("WebSocket error on frontend:", error);
    };

    socket.onclose = () => {
      if (isUnmounted) {
        return;
      }

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
      isUnmounted = true;
      socket.onmessage = null;
      socket.onerror = null;
      socket.onclose = null;

      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [url, updateCoinData, setConnectionData]);
};
