"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModle = new users_1.Users();
const createUser = async (req, res) => {
    try {
        validateUserData(req);
        const user = getUserData(req);
        const createdUser = await userModle.create(user);
        //Create token
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign(createdUser, process.env.TOKEN_SECRET);
        res.status(200).json(token);
    }
    catch (error) {
        console.error(error);
        res
            .status(400)
            .send(`Error: An error happened while Creating a new user. ${error}`);
    }
};
const index = async (req, res) => {
    try {
        const users = await userModle.index();
        console.log(`users: ${users}`);
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res
            .status(400)
            .send(`Error: An error happened while retriving users data. ${error}`);
    }
};
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!id)
            throw new Error('Error: User id is not a valid id');
        const user = await userModle.show(id);
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res
            .status(400)
            .send(`Error: An error happened while retrieving user: ${req.params.id} data. ${error}`);
    }
};
const authonticate = async (req, res) => {
    try {
        const user = await userModle.authenticate(req.body.username, req.body.password);
        if (user) {
            //Create token
            //@ts-ignore
            const token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET);
            res.status(200).json(token);
        }
        else
            throw new Error('Error: username is not correct!');
    }
    catch (error) {
        console.error(error);
        res
            .status(400)
            .send(`Error: An error happened while retrieving user: ${req.params.username} data. ${error}`);
    }
};
//@ts-ignore
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        //@ts-ignore
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        console.log('verification Done:');
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401);
        res.json(`Access denied, Invalid token`);
        return;
    }
};
exports.verifyAuthToken = verifyAuthToken;
//A helper function to validate the provided user data from the request.
const validateUserData = (req) => {
    if (!req.body.firstname)
        throw new Error(`Error: Invalid firstname`);
    if (!req.body.lastname)
        throw new Error(`Error: Invalid lastname`);
    if (!req.body.username)
        throw new Error(`Error: Invalid username`);
    if (!req.body.password)
        throw new Error(`Error: Invalid password`);
};
//A helper function to construct user object from the request data.
const getUserData = (req) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
    };
    return user;
};
const usersRoute = (app) => {
    app.post('/users', createUser);
    app.post('/users/authonticate', authonticate);
    app.get('/users', exports.verifyAuthToken, index);
    app.get('/users/:id', exports.verifyAuthToken, show);
};
exports.default = usersRoute;
