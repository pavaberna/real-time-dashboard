import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const PORT = 5000;

const server = createServer(app);

const wss = new WebSocketServer({ server });

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

const binanceSocket = new WebSocket(
  "wss://stream.binance.com:9443/ws/btcusdt@ticker",
);

binanceSocket.on("message", (data) => {
  try {
    const binanceData = JSON.parse(data.toString());

    const mappedData = {
      symbol: binanceData.s,
      price: parseFloat(binanceData.c),
      changePercent: parseFloat(binanceData.P),
      high: parseFloat(binanceData.h),
      low: parseFloat(binanceData.l),
      volume: parseFloat(binanceData.v),
      timestamp: binanceData.E,
    };

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(mappedData));
      }
    });
  } catch (error) {
    console.log("Error processing Binance data:", error);
  }
});

binanceSocket.on("error", (err) => {
  console.error("Binance WebSocket error occurred:", err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
