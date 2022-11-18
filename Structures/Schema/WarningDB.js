const mongoose = require("mongoose")

module.exports = mongoose.model(
    "⭕ Warnings",
    new mongoose.Schema({
        userId: String,
        guildId: String,
        moderatorId: String,
        reason: String,
    }));