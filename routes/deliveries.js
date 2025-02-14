const express = require('express');
const router = express.Router();

const  { 
    getAllDeliveries,
    getDriverDeliveries,
    getDeliveryById,
    updateDelivery,
    createDelivery
} = require('../controllers/deliveries.js');

router.get('/', getAllDeliveries);
router.get('/driver', getDriverDeliveries);
router.get('/:id', getDeliveryById);
router.put('/:id', updateDelivery);
router.post('/', createDelivery);

module.exports = router;