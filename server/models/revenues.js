const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema({
    stockSymbol: String,
    quarter: String,
    marketNumber: String,
    revenue: String,
});

// compile model from schema
module.exports = mongoose.model("revenues", revenueSchema);