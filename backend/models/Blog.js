const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    image: String,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", blogSchema);