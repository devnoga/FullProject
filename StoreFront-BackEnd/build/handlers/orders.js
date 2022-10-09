"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const users_1 = require("./users");
const orderStore = new orders_1.OrderStore();
const create = async (req, res) => {
    try {
        const newOrder = {
            userId: parseInt(req.body.userId),
            status: req.body.status,
        };
        const createdOrder = await orderStore.create(newOrder);
        res.status(200).json(createdOrder);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};
const currentOrder = async (req, res) => {
    try {
        const currentOrder = await orderStore.currentOrder(parseInt(req.params.userId));
        if (currentOrder)
            res.status(200).json(currentOrder);
        else
            throw new Error(`Error: No current order for user ${req.params.userId}`);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};
const addProduct = async (req, res) => {
    try {
        const addedProduct = await orderStore.addProduct(parseInt(req.body.quantity), parseInt(req.params.orderId), parseInt(req.body.productId));
        res.status(200).json(addedProduct);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};
const ordersRoute = (app) => {
    app.get('/orders/:userId', users_1.verifyAuthToken, currentOrder);
    app.post('/orders', users_1.verifyAuthToken, create);
    app.post('/orders/:orderId/prodcuts', users_1.verifyAuthToken, addProduct);
};
exports.default = ordersRoute;
