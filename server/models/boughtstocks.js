const mongoose = require("mongoose");

const BoughtStocksSchema = new mongoose.Schema({
    username: String,
    stockName: String,
    buyPrice: String,
    buyDate: String,
});

// compile model from schema
module.exports = mongoose.model("boughtstocks", BoughtStocksSchema);