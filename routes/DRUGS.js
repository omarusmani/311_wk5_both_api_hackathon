const express = require('express')
const DRUGSController = require('../controllers/DRUGS-controller')
const router = express.Router()

router.get('/DRUGS', DRUGSController.getAllUsers)
router.get('/DRUGS/:id', DRUGSController.getUserById)
router.post('/DRUGS', DRUGSController.createUser)
router.put('/DRUGS/:id', DRUGSController.updateUserById)
router.delete('/DRUGS/:first_name', DRUGSController.deleteUserByFirstName)

module.exports = router