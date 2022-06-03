const express = require('express')

const router = express.Router()

const path = require('path')

const fsPromises = require('fs').promises

const filename = path.join(__dirname, 'data.json')

module.exports = router

//new form with router.get

//form input opening hours your're interested in

//return all restaurants that meet criteria - clickable like home page to redirect to specific restaurant

//create GET route to render particular puppy. The route should contain the id as a parameter so you can access it via req.params.id -- so /:id
router.get('/:id', (req, res) => {
  fsPromises

    .readFile(filename, 'utf-8')
    .then((restaurantData) => {
      //parse puppies to read from JSON file so that data in puppies is not a string.

      const parsedRestaurantData = JSON.parse(restaurantData)

      //turn req.params.id into number from string
      const urlID = req.params.id

      //select the array of puppies in data object
      const pizzaArr = parsedRestaurantData.restaurants

      //match specific puppy id with the url id
      const pizzaId = pizzaArr.find((item) => item.name === urlID)

      //return specific puppy data.
      return res.render('branch-details', pizzaId)
    })
    .catch((err) => {
      console.error(err, 'No data found')
    })
})

router.get('/:id/edit', (req, res) => {
  fsPromises

    .readFile(filename, 'utf-8')
    .then((restaurantData) => {
      //parse puppies to read from JSON file so that data in puppies is not a string.

      const parsedPuppy = JSON.parse(restaurantData)

      //turn req.params.id into number from string
      const urlID = req.params.id

      //select the array of puppies in data object
      const pizzaArr = parsedRestaurantData.restaurants

      //match specific puppy id with the url id
      const pizzaId = pizzaArr.find((item) => item.name === urlID)

      //return specific puppy data.
      return res.render('edit', pizzaId)
    })
    .catch((err) => {
      console.error(err, 'No data found')
    })
})

router.post('/:id/edit-form', async (req, res) => {
  try {
    //read file
    const restaurantData = await fsPromises.readFile(filename, 'utf-8')

    //parsed data
    const parsedRestaurantData = JSON.parse(restaurantData)

    //req.params.id
    const urlID = req.params.id

    //match specific puppy id with the url id
    const pizzaMatch = parsedRestaurantData.restaurants.find(
      (pizza) => pizza.name === urlID
    )
    //reassign data
    pizzaMatch.name = req.body.name
    pizzaMatch.openingHours = req.body.openingHours
    pizzaMatch.pickup = req.body.pickup
    pizzaMatch.delivery = req.body.delivery

    //write entire array back to JSON file

    const stringifyPizza = JSON.stringify(parsedRestaurantData, null, 2)
    await fsPromises.writeFile(filename, stringifyPizza, 'utf-8')

    //redirect to puppies/:id route

    return res.redirect('/')
  } catch (err) {
    console.error(err, 'No data found')
  }
})
