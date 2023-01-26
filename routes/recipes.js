const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const Cuisine = require("../models/cuisine")
const Recipe = require("../models/recipe")
const router = express.Router()

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const uploadPath = path.join('public', Recipe.foodImageBasePath)
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

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
router.post('/', upload.single('image'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    let ingredients = req.body.rawIng.endsWith(",") ? req.body.rawIng.substring(0, req.body.rawIng.length - 1).split(",") : req.body.rawIng.split(",")
    if (ingredients.length === 1 && ingredients[0] == '') ingredients = null
    const recipe = new Recipe({
        title: req.body.title,
        cuisine: req.body.cuisine,
        description: req.body.description.trim(),
        instructions: req.body.instructions.trim(),
        ingredients: ingredients,
        foodImageName: fileName
    })

    try {
        const newRecipe = await recipe.save()
        // res.redirect(`cuisines/${newRecipe.id}`)
        res.redirect(`recipes`)
    } catch {
        if (recipe.foodImageName !== null) {
            removeFoodImage(recipe.foodImageName)
        }

        renderNewPage(res, recipe, true)
    }
})

function removeFoodImage(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.error(err)
    })
}

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


module.exports = router