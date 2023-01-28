const mongoose = require("mongoose")
const Recipe = require("./recipe")

const cuisineSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    }
})

cuisineSchema.pre('remove', function(next) {
    Recipe.find({ cuisine: this.id }, (err, recipes) => {
        if (err) {
            next(err)
        } else if (recipes.length > 0) {
            next(new Error("This cuisine has recipes still"))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model("Cuisine", cuisineSchema)