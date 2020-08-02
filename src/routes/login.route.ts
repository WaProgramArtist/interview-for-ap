import express from 'express';
const loginRouter = express.Router();

const loginController = require('../controllers/users/login.controller');

loginRouter.route('/').post(loginController.login);

module.exports = loginRouter;
