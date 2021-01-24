const mongoose = require("mongoose");

const DebtEquitySchema = new mongoose.Schema({
    stockSymbol: String,
    quarter: String,
    marketNumber: String,
    stockDebtEquity: String,
});

// compile model from schema
module.exports = mongoose.model("stockdebtequities", DebtEquitySchema);