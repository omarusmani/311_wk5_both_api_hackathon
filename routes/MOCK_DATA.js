const express = require('express')
const MOCK_DATAController = require('../controllers/MOCK_DATA-controller')
const router = express.Router()

router.get('/MOCK_DATA', MOCK_DATAController.getAllUsers)
router.get('/MOCK_DATA/:id', MOCK_DATAController.getUserById)
router.post('/MOCK_DATA', MOCK_DATAController.createUser)
router.put('/MOCK_DATA/:id', MOCK_DATAController.updateUserById)
router.delete('/MOCK_DATA/:id', MOCK_DATAController.deleteUserById)

module.exports = router