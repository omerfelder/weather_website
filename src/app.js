const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup the static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Omer Felder'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Omer Felder'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Welcome to the help section ',
        title: 'Help',
        name: 'Omer Felder'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide an address!"
        })
    }

    geocode(req.query.address,(error, {latitude,longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }  
        
          forecast(latitude,longitude, (error, {temprature, feelslike, wind} = {}) => {
            if(error) {
                return res.send({
                    error: "Please provide an address"
                })
            }
            
            res.send({address: req.query.address,
                location: location,
                forecast: 'It is ' + temprature + ' degress out there but it feels like ' + feelslike + '. The wind is ' + wind})
          })
      })

    
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errMessage: 'Help article not found',
        title: 'Help Error',
        name: 'Omer Felder'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errMessage: 'Page not found.',
        title: 'Wrong Page',
        name: 'Omer Felder'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})