const express = require('express');
const {
    userPostController,
    userDeleteController,
    userGetController,
    userGetControllerById,
    userUpdateController,
    userLogin,
} = require('../__controllers__/userController');
const {
    urlPostController,
    urlGetController,
    getIdUrl,
    urlGetController2,
} = require('../__controllers__/urlController');
const { TokenCheckerMiddleware } = require('../middleware');
const UserRouter = express.Router();

UserRouter.delete('/user/:userId', userDeleteController)
    .post('/user', userPostController)
    .get('/user', userGetController)
    .get('/user/:id', userGetControllerById)
    .put('/user/:userId', userUpdateController)
    .post('/login', userLogin)
    .post('/url', urlPostController)
    .get('/url', urlGetController)
    .get('/urlid/:userId', getIdUrl)
    .get('/users/:userId', urlGetController2);
module.exports = UserRouter;
