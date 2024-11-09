const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.get("/blockchains", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      }
    );

    const blockchains = response.data.map((coin) => ({
      name: coin.name,
      symbol: coin.symbol,
      marketCap: coin.market_cap,
      price: coin.current_price,
      description: coin.description || "No description available",
    }));

    res.json(blockchains);
  } catch (error) {
    console.error("Erro de busca:", error);
    res.status(500).json({ error: "Erro ao obter dados da API pública" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
