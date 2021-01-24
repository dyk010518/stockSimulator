const mongoose = require("mongoose");

const PBSchema = new mongoose.Schema({
    stockSymbol: String,
    month: String,
    marketNumber: String,
    stockPB: String,
});

// compile model from schema
module.exports = mongoose.model("stockPBs", PBSchema);