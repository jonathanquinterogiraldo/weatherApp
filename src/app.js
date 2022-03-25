const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')

//setup handelbars and views location
app.set('views', viewPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPaths)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jonathan Quintero Giraldo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jonathan Quintero Giraldo'
    } )
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a informative message!',
        title: 'Help',
        name: 'Jonathan Quintero Giraldo'
    } )
})

app.get('/weather', (req, res) => {
    const { address } = req.query
   
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, { latitude, logitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, logitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {    
    res.render('404', {
        errorMessage: 'Help article not foud',  
        title: 'Help',
        name: 'Jonathan Quintero Giraldo'      
    } )


})

app.get('*', (req, res) => {    
    res.render('404', {
        errorMessage: 'My 404 page!',
        title: '404',
        name: 'Andrew Mead'
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
