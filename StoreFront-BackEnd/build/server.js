"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./handlers/users"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const dashboard_1 = __importDefault(require("./handlers/dashboard"));
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/', function (req, res) {
    res.send('Hello World  World!');
});
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
(0, dashboard_1.default)(app);
const port = process.env.port || 3000;
app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
