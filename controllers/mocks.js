const deliveries = require('../data/deliveries.js');
const drivers = require('../data/drivers.js');
const { getUserId } = require('./auth.js');

const getMockedDeliveries = ((req, res) => {
    return res.status(200).json(deliveries.filter(delivery => !delivery.assignedDriverId || delivery.assignedDriverId === ''));
});

const getMockedDriverDeliveries = ((req, res) => {
    const token = req.headers.authorization;
    const userId = getUserId(token);
    return res.status(200).json(deliveries
        .filter(delivery => delivery.assignedDriverId === userId)
        );
});

const getMockedDelivery = ((req, res) => {
    const id = String(req.params.id);
    const delivery = deliveries.find(delivery => delivery?.id == id);
    if (!delivery) {
        return res.status(404).send('Delivery not found');
    }
    res.json(delivery);
});

const updateMockedDelivery = ((req, res) => {
    const id = String(req.params.id);
    const delivery = deliveries.find(delivery => delivery?.id == id);
    if (!delivery) {
        return res.status(404).send('Delivery not found');
    }
    const updatedDelivery = req.body;
    delivery.status = updatedDelivery.status;
    delivery.assignedDriverId = updatedDelivery.assignedDriverId;
    delivery['feedback'] = updatedDelivery.feedback;
    delivery['paymentMethod'] = updatedDelivery.paymentMethod;
    delivery['paymentStatus'] = updatedDelivery.paymentStatus;
    delivery['proofOfDelivery'] = updatedDelivery.proofOfDelivery;
    res.json(delivery);
});

module.exports = {
    getMockedDeliveries,
    getMockedDriverDeliveries,
    getMockedDelivery,
    updateMockedDelivery
}