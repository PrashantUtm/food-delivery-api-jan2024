const express = require('express');
const router = express.Router();

const  { 
    getAllDeliveries,
    getDriverDeliveries,
    getDeliveryById,
    updateStatus
} = require('../controllers/deliveries.js');

router.get('/', getAllDeliveries);
router.get('/driver', getDriverDeliveries);
router.get('/:id', getDeliveryById);
router.put('/:id', updateStatus);

module.exports = router;