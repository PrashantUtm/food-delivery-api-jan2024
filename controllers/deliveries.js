const { Delivery } = require('../models');

const getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find({ assignedDriverId: '' });
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
        const delivery = await Delivery.findById(req.params.id);
        if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
        if (delivery.assignedDriverId !== req.driver.id) {
            return res.status(403).json({ message: 'You are not authorized to view this delivery' });
        }
        res.json(delivery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update delivery status
const updateStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const delivery = await Delivery.findById(req.params.id);
        if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
        if (delivery.assignedDriverId !== req.driver.id) {
            return res.status(403).json({ message: 'You are not authorized to update this delivery' });
        }

        delivery.status = status;
        await delivery.save();
        res.json({ message: 'Delivery status updated', delivery });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllDeliveries,
    getDriverDeliveries,
    getDeliveryById,
    updateStatus
}