if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const path = require("path")
const methodOverride = require("method-override")

const flash = require("express-flash")
const session = require("express-session")

const indexRouter = require('./routes/index')
const cuisineRouter = require('./routes/cuisines')
const recipeRouter = require('./routes/recipes')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret:"yash is a super star",
      cookie: { secure: false, maxAge: 14400000 },
    })
);
app.use(flash())

app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, '/public/')))

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

app.use(function (req, res, next) { res.locals.url = req.url; next(); });

const mongoose = require("mongoose")
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected successfully!"))

app.use('/', indexRouter)
app.use('/cuisines', cuisineRouter)
app.use('/recipes', recipeRouter)


app.listen(process.env.PORT || 3000)