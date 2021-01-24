const mongoose = require("mongoose");

const enterpriseSchema = new mongoose.Schema({
    stockSymbol: String,
    month: String,
    marketNumber: String,
    stockEnterprise: String,
});

// compile model from schema
module.exports = mongoose.model("stockenterprises", enterpriseSchema);