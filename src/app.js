const path = require('path'), express = require('express'), hbs = require('hbs'), geocode = require('./utils/geocode'), forecast = require('./utils/forecast'), app = express(), publicDirectoryPath = path.join(__dirname, '../public'), viewsPath = path.join(__dirname, '../templates/views'), partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs');app.set('views', viewsPath);hbs.registerPartials(partialsPath);app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akshat'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akshat'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Akshat'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    forecast(req.query.address,(error, forecastData) => {
        if(error) {
            return res.send({ error })
        }
            res.send({
            forecast: forecastData,
            address: req.query.address
        })
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akshat',
        errorMessage: 'Page not found.'
    })
})
app.listen(8080, () => {
    console.log('Server is up on port 8080.')
})