const express = require('express')
const DRUGSController = require('../controllers/drugs')
const router = express.Router()

router.get('/DRUGS', DRUGSController.getAllDrugs)
router.get('/DRUGS/:id', DRUGSController.getDrugsByID)
router.post('/DRUGS', DRUGSController.createDrug)
router.put('/DRUGS/:id', DRUGSController.updateDrugByID)
router.delete('/DRUGS/:first_name', DRUGSController.deleteDrugByID)

module.exports = router