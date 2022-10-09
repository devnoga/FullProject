"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    async showPopularProducts() {
        try {
            const sql = 'SELECT product_id, SUM(quantity) as s FROM order_products  GROUP BY product_id ORDER BY s DESC LIMIT 5';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error: a database error happened while retrieving most popular 5 products: ${error}`);
        }
    }
    async showProductsByCategory(category) {
        try {
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [category]);
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error: Could not find products with category: ${category}: ${error}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
