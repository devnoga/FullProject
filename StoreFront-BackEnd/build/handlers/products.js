"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const users_1 = require("./users");
// import jwt from 'jsonwebtoken';
const productStore = new products_1.ProductStore();
const index = async (req, res) => {
    try {
        const products = await productStore.index();
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!id)
            throw new Error('Error: product id is not a valid id');
        const product = await productStore.show(id);
        res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};
const create = async (req, res) => {
    try {
        validateProductData(req);
        const product = getProductData(req);
        const products = await productStore.create(product);
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};
const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!id)
            throw new Error('Error: product id is not a valid id');
        const product = await productStore.delete(id);
        res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};
//A helper function to validate the provided product data from the request.
const validateProductData = (req) => {
    if (!req.body.name)
        throw new Error(`Error: Invalid product name`);
    if (!req.body.price)
        throw new Error(`Error: Invalid product price`);
    if (!req.body.category)
        throw new Error(`Error: Invalid product category`);
};
//A helper function to construct user object from the request data.
const getProductData = (req) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        url: req.body.url,
        description: req.body.description,
    };
    return product;
};
const productsRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', users_1.verifyAuthToken, create);
    app.delete('/products/:id', users_1.verifyAuthToken, remove);
};
exports.default = productsRoutes;
