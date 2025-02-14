const { Delivery } = require('../models');
const { randomUUID } = require('crypto');
const { getUserId } = require('./auth');

const getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find({ assignedDriverId: null });
        //const mappedDeliveries = deliveries.map(delivery => ({ ...delivery, id: delivery._id }));
        res.json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDriverDeliveries = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const userId = getUserId(token);
        const deliveries = await Delivery.find({ assignedDriverId: userId });
        res.json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get one delivery by ID
const getDeliveryById = async (req, res) => {
    try {
        const delivery = await Delivery.findOne({ id: req.params.id });
        if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
        
        res.json(delivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update delivery status
const updateDelivery = async (req, res) => {
    const updatedDelivery = req.body;
    try {
        const token = req.headers.authorization;
        const userId = getUserId(token);

        const delivery = await Delivery.findOne({ id: req.params.id });
        if (!delivery) return res.status(404).json({ message: 'Delivery not found' });

        delivery.status = updatedDelivery.status;
        if (updatedDelivery.status === 1) {
            delivery.assignedDriverId = userId;
        }
        if (updatedDelivery.status === 0) {
            delivery.assignedDriverId = null;
        }

        if (updatedDelivery.status === 3) {
            delivery['feedback'] = updatedDelivery.feedback;
            delivery['paymentMethod'] = updatedDelivery.paymentMethod;
            delivery['paymentStatus'] = updatedDelivery.paymentStatus;
            delivery['proofOfDelivery'] = updatedDelivery.proofOfDelivery;
        }
        await delivery.save();
        res.json({ message: 'Delivery status updated', delivery });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createDelivery = ((req, res) => {
    const newDelivery = req.body;
    if (!validateDelivery(newDelivery)) {
        return res.status(400).json('Missing required data')
    }
    newDelivery['id'] = randomUUID();
    setDefaults(newDelivery);
    Delivery.create(newDelivery)
        .then(result => res.status(201).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }));
});

const validateDelivery = (delivery) =>
    delivery.customer.id &&
    delivery.customer.name &&
    delivery.customer.address &&
    delivery.customer.phoneNumber &&
    delivery.restaurant.id &&
    delivery.restaurant.name &&
    delivery.restaurant.address &&
    delivery.restaurant.phoneNumber &&
    delivery.details.items &&
    delivery.details.totalPrice;

const setDefaults = (delivery) => {
    if (!delivery.paymentMethod)
        delivery['paymentMethod'] = 0;
    if (!delivery.paymentStatus)
        delivery['paymentStatus'] = 0;
    delivery['status'] = 0;

    delivery.dateOrdered = new Date();
    if (!delivery.expectedDeliveryTime) {
        delivery.expectedDeliveryTime = delivery.dateOrdered.getTime() + (60*60*1000);
    }
}
    

module.exports = {
    createDelivery,
    getAllDeliveries,
    getDriverDeliveries,
    getDeliveryById,
    updateDelivery
}