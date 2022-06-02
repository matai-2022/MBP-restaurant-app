const express = require('express')
const hbs = require('express-handlebars')
const fsPromises = require('fs').promises

const server = express()

const routes = require('./routes')

const path = require('path')

const filename = path.join(__dirname, 'data.json')

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here

module.exports = server

server.get('/', (req, res) => {
  fsPromises
    .readFile(filename, 'utf-8')
    .then((restaurantData) => {
      const parsedRestaurantData = JSON.parse(restaurantData)
      return res.render('home', parsedRestaurantData)
    })
    .catch((err) => {
      console.error(err, 'No data found')
    })
})
