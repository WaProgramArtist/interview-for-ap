import express from 'express';
const userRouter = express.Router();
const userController = require('../controllers/users/users.controller');

userRouter.route('/').get(userController.getListUsers).post(userController.createUser);

userRouter
    .route('/:id')
    .get(userController.getUserInfo)
    .put(userController.updateUser)
    .delete(userController.removeUser);

userRouter.route('/news/:id').get(userController.getNewsOfUser);

userRouter.route('/news/:userId/:newsId').get(userController.updateUserReadNews);

module.exports = userRouter;
