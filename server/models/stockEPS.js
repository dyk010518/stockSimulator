const mongoose = require("mongoose");

const EPSSchema = new mongoose.Schema({
    stockSymbol: String,
    day: String,
    marketNumber: String,
    stockEPS: String,
});

// compile model from schema
module.exports = mongoose.model("stockEPSes", EPSSchema);