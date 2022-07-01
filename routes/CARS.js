const express = require('express')
const CARSController = require('../controllers/CARS-controller')
const router = express.Router()

router.get('/CARS', CARSController.getAllCars)
router.get('/CARS/:id', CARSController.getCarsByID)
router.post('/CARS', CARSController.createCar)
router.put('/CARS/:id', CARSController.updateCarByID)
router.delete('/CARS/:id', CARSController.deleteCarByID)

module.exports = router