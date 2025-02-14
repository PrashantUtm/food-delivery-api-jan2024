const mongoose = require('mongoose');

// Delivery Model
const deliverySchema = new mongoose.Schema({
    customer: {
        id: String,
        name: String,
        address: String,
        phoneNumber: String
    },
    restaurant: {
        id: String,
        name: String,
        address: String,
        phoneNumber: String,
        photoUrl: String
    },
    assignedDriverId: String,
    dateOrdered: Date,
    expectedDeliveryTime: Date,
    paymentMethod: String,
    paymentStatus: String,
    notes: String,
    details: {
        items: [String],
        totalPrice: Number
    },
    proofOfDelivery: String,
    feedback: String,
    status: String,
    id: String
});

const Delivery = mongoose.model('Delivery', deliverySchema);

// Driver Model
const driverSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    phoneNumber: String
});

const Driver = mongoose.model('Driver', driverSchema);

// Export models
module.exports = { Driver, Delivery };
