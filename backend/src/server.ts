import express from "express";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("A Full-stack szerverünk él és virul!");
});

app.listen(PORT, () => {
  console.log(`Szerver fut a következő címen: http://localhost:${PORT}`);
});
