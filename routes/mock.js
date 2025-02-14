const express = require('express');
const router = express.Router();

const  { 
    getMockedDeliveries,
    getMockedDriverDeliveries,
    getMockedDelivery,
    updateMockedDelivery
} = require('../controllers/mocks.js');

router.get('/deliveries/', getMockedDeliveries);
router.get('/deliveries/driver', getMockedDriverDeliveries);
router.get('/deliveries/:id', getMockedDelivery);
router.put('/deliveries/:id', updateMockedDelivery);

module.exports = router;