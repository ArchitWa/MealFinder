const express = require("express")

const Cuisine = require("../models/cuisine")
const Recipe = require("../models/recipe")
const router = express.Router()

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']



// All Recipes Route
router.get('/', async (req, res) => {
    let query = Recipe.find()
    if (req.query.title !== null && req.query.title !== "") {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.rawIng) {
        const ingredients = req.query.rawIng.endsWith(",") ? req.query.rawIng.substring(0, req.query.rawIng.length - 1).split(",") : req.query.rawIng.split(",")
        query = query.find({ ingredients: { $all: ingredients } })
    }

    try {
        const recipes = await query.exec()
        res.render('recipes/index', {
            recipes: recipes,
            searchOptions: req.query
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }

})

// New Recipe Route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Recipe())
})

// Create Recipe Route
router.post('/', async (req, res) => {
    let ingredients = req.body.rawIng.endsWith(",") ? req.body.rawIng.substring(0, req.body.rawIng.length - 1).split(",") : req.body.rawIng.split(",")
    if (ingredients.length === 1 && ingredients[0] == '') ingredients = null
    const recipe = new Recipe({
        title: req.body.title,
        cuisine: req.body.cuisine,
        description: req.body.description.trim(),
        instructions: req.body.instructions.trim(),
        ingredients: ingredients,
    })

    saveImage(recipe, req.body.image)

    try {
        const newRecipe = await recipe.save()
        // res.redirect(`cuisines/${newRecipe.id}`)
        res.redirect(`recipes`)
    } catch {
        renderNewPage(res, recipe, true)
    }
})


async function renderNewPage(res, recipe, hasError = false) {
    try {
        const cuisines = await Cuisine.find({})
        const params = {
            cuisines: cuisines,
            recipe: recipe
        }
        if (hasError) params.errorMessage = 'Error Creating Recipe'
        res.render('recipes/new', params)
    } catch {
        res.redirect('/recipes')
    }
}

function saveImage(recipe, imageEncoded) {
    if (imageEncoded == null) return

    const image = JSON.parse(imageEncoded)
    if (image != null && imageMimeTypes.includes(image.type)) {
        recipe.foodImage = new Buffer.from(image.data, 'base64')
        recipe.foodImageType = image.type
    }
}


module.exports = router