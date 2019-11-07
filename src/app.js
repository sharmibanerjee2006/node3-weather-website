const express = require('express')
const path = require('path')
const hbs = require('hbs')
const util = require('./utils/utils.js')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const dirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

const app = express()

app.use(express.static(dirPath))
app.set('view engine', 'hbs');
app.set('views', viewPath);

app.get('',(req, res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Sharmi Banerjee'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title : 'Help',
        name: 'Sharmi Banerjee',
        mailid: 'sharmi.banerjee@cognizant.com'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Sharmi Banerjee'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send('provide a valid address')
     }

     console.log(req.query.address)
     util.geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if(error) {
            return res.send({error})
        }
          util.forecast(lat, long, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location,
                forcast : forecastData,
                address : req.query.address
            })
          })
      })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send('provide a valid search string')
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title : 'Error',
        error : 'Help article is not found',
        name : 'Sharmi Banerjee'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title : 'Error',
        error : 'My 404 page',
        name : 'Sharmi Banerjee'
    })
})

app.listen(3000, () => {
    console.log('server is up')
})