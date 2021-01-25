const mongoose = require("mongoose");

const BoughtStocksSchema = new mongoose.Schema({
    userID: String,
    stockName: String,
    quantity: String,
    costBasis: String,
});

// compile model from schema
module.exports = mongoose.model("boughtstocks", BoughtStocksSchema);