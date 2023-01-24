const express = require("express")
const Cuisine = require("../models/cuisine")
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
        // res.redirect(`cuisines/${newCuisine.id}`)
        res.redirect(`cuisines`)
    } catch {
        res.render("cuisines/new", {
            cuisine: cuisine,
            errorMessage: "Error creating cuisine"
        })
    }
})

module.exports = router