const express = require('express');
const router = express.Router();

const  { 
    login,
    createDriver,
    getDrivers
} = require('../controllers/auth.js');

router.post('/', login);
router.post('/create', createDriver);
router.get('/', getDrivers);

module.exports = router;