"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard");
const dashborad = new dashboard_1.DashboardQueries();
const getPopularProduct = async (req, res) => {
    try {
        const result = await dashborad.showPopularProducts();
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};
const getProductsByCategory = async (req, res) => {
    try {
        const result = await dashborad.showProductsByCategory(req.body.category);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
};
const dashboardRoutes = (app) => {
    app.get('/popular_product', getPopularProduct);
    app.get('/products_by_category', getProductsByCategory);
};
exports.default = dashboardRoutes;
