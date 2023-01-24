const mongoose = require("mongoose")

const cuisineSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Cuisine", cuisineSchema)