const mongoose = require("mongoose");

const fcfSchema = new mongoose.Schema({
    stockSymbol: String,
    quarter: String,
    marketNumber: String,
    freeCashFlow: String,
});

// compile model from schema
module.exports = mongoose.model("freecashflows", fcfSchema);