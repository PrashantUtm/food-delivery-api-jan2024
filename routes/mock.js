const express = require('express');
const router = express.Router();

const  { 
    getMockedDeliveries,
    getMockedDriverDeliveries,
    getMockedDelivery,
} = require('../controllers/mocks.js');

router.get('/deliveries/', getMockedDeliveries);
router.get('/deliveries/driver', getMockedDriverDeliveries);
router.get('/deliveries/:id', getMockedDelivery);

module.exports = router;