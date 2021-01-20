const mongoose = require("mongoose");

const RecentActivitySchema = new mongoose.Schema({
    username: String,
    bought: String,
    bPrice: String,
    sold: String,
    sPrice: String,
});

// compile model from schema
module.exports = mongoose.model("recentactivity", RecentActivitySchema);