const express = require("express")
const Cuisine = require("../models/cuisine")
const Recipe = require("../models/recipe")
const router = express.Router()

// All Cuisines Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.type != null && req.query.name !== '') {
        searchOptions.type = new RegExp(req.query.type, 'i')
    }
    try {
        const cuisines = await Cuisine.find(searchOptions)
        res.render("cuisines/index", {
            cuisines: cuisines,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New Cuisines Route
router.get('/new', (req, res) => {
    res.render("cuisines/new", { cuisine: new Cuisine() })
})

// Create Cuisine Route
router.post('/', async (req, res) => {
    const cuisine = new Cuisine({
        type: req.body.type
    })
    try {
        const newCuisine = await cuisine.save()
        res.redirect(`cuisines/${newCuisine.id}`)
    } catch {
        res.render("cuisines/new", {
            cuisine: cuisine,
            errorMessage: "Error creating cuisine"
        })
    }
})

// Show Cuisine Route
router.get('/:id', async (req, res) => {
    try {
        const cuisine = await Cuisine.findById(req.params.id)
        const recipes = await Recipe.find({ cuisine: cuisine.id }).limit(6).exec()

        res.render('cuisines/show', {
            cuisine: cuisine,
            recipesInCuisine: recipes
        })
    } catch {
        res.redirect('/')
    }
})

// Edit Cuisine Route
router.get('/:id/edit', async (req, res) => {
    try {
        const cuisine = await Cuisine.findById(req.params.id)
        res.render("cuisines/edit", { cuisine: cuisine })
    } catch {
        res.redirect("/cuisines")
    }
})

// Update Cuisine Route
router.put('/:id', async (req, res) => {
    let cuisine
    try {
        cuisine = await Cuisine.findById(req.params.id)
        cuisine.type = req.body.type
        await cuisine.save()
        res.redirect(`/cuisines/${cuisine.id}`)
    } catch {
        if (cuisine == null) {
            res.redirect('/')
        }
        res.render("cuisines/edit", {
            cuisine: cuisine,
            errorMessage: "Error updating cuisine"
        })
    }
})

// Delete Cuisine Route
router.delete('/:id', async (req, res) => {
    let cuisine
    try {
        cuisine = await Cuisine.findById(req.params.id)
        await cuisine.remove()
        res.redirect(`/cuisines`)
    } catch {
        if (cuisine == null) {
            res.redirect('/')
        }
        res.redirect(`/cuisines/${cuisine.id}`)
    }
})

module.exports = router