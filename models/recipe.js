const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    instructions: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    foodImage: {
        type: Buffer,
        required: true
    },
    foodImageType: {
        type: String,
        required: true
    },
    cuisine: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cuisine'
    },
    prepTime: {
        type: Array,
        required: true,
        default: ["0", "0", "0"]
    }
})

recipeSchema.virtual('foodImagePath').get(function () {
    if (this.foodImage != null && this.foodImageType != null) {
        return `data:${this.foodImageType};charset=utf-8;base64,${this.foodImage.toString('base64')}`
    }
})

module.exports = mongoose.model("Recipe", recipeSchema)
