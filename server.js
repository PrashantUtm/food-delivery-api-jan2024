require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mocked_routes = require('./routes/mock.js');
const deliveries_routes = require('./routes/deliveries.js');
const auth_routes = require('./routes/auth.js');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

console.log(process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(express.json({limit: '50mb'}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    next();
  });

app.options('/*', (_, res) => {
  res.sendStatus(200);
});

const { auth } = require('./controllers/auth.js');

app.use('/api/login', auth_routes);
app.use('/api/mocks', auth, mocked_routes);
app.use('/api/deliveries', deliveries_routes);
