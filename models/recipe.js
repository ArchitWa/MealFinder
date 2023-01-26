const mongoose = require("mongoose")
const path = require("path")

const foodImageBasePath = 'uploads/foodImages'

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
    foodImageName: {
        type: String,
        required: true
    },
    cuisine: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cuisine'
    }
})

recipeSchema.virtual('foodImagePath').get(function () {
    if (this.foodImageName != null) {
        return path.join('/', foodImageBasePath, this.foodImageName)
    }
})

module.exports = mongoose.model("Recipe", recipeSchema)
module.exports.foodImageBasePath = foodImageBasePath