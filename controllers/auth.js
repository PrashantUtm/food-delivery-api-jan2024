const jwt = require('jsonwebtoken');
const { Driver } = require('../models.js');
const drivers = require('../data/drivers.js');
const bcrypt = require('bcryptjs');

const saltRounds = 10;
const jwtSecret = '6b49b1141686633a0884ca3688723e6758461c0c17b9e57490586dd7ec5817df699310';

const login = async (req, res, next) => {
    const { username, password } = req.body
    // Check if username provided
    if (!username) {
        return res.status(400).json({
            message: "Username not present",
        })
    }
    try {
        let driver;
        if (process.env.USE_DB === 'true') {
          driver = await Driver.findOne({ username });
          if (!driver) return res.status(404).json({ message: 'Driver not found' });
          
          const isMatch = await bcrypt.compare(password, driver.password);
          if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        } else {
          driver = drivers.find(u => u.id === username && u.id === password)
        }
        
        if (!driver) {
        res.status(400).json({
            message: "Login not successful",
            error: "User not found",
        })
        } else {
            const maxAge = 24 * 60 * 60;
            const token = jwt.sign(
                { id: username },
                jwtSecret,
                {
                    expiresIn: maxAge, // 24hrs in sec
                }
            );
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000, // 24hrs in ms
            });
            res.status(201).json({
                user: driver.username,
                token: token
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
};

const getUserId = (token) => {
  let userId;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (decodedToken) {
        userId = decodedToken.id
      }
    })
  }
  return String(userId);
}

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          if (decodedToken) {
            next()
          }
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
  }

const getDrivers = ((req, res) => {
    Driver.find({})
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({msg: error}));
});

const createDriver = ((req, res) => {
  const newDriver = req.body;
  bcrypt.hash(newDriver.password, saltRounds, function(err, hash) {
    newDriver.password = hash;
    Driver.create(newDriver)
        .then(result => res.status(201).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }));
  });
  
});

module.exports = {
    login,
    auth,
    getUserId,
    getDrivers,
    createDriver
};