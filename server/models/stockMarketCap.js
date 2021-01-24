const mongoose = require("mongoose");

const MarketCapSchema = new mongoose.Schema({
    stockSymbol: String,
    month: String,
    marketNumber: String,
    stockMarketCap: String,
});

// compile model from schema
module.exports = mongoose.model("stockmarketcaps", MarketCapSchema);