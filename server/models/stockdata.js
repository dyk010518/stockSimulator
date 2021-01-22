const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    stockName: String,
    stockSymbol: String,
    stockPrice: String,
    date: String,
});

// compile model from schema
module.exports = mongoose.model("stocks", StockSchema);