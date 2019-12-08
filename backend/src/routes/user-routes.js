'use strict'

const express = require('express');
const multiparty = require('connect-multiparty');
const auth = require('../middlewares/auth-middleware');
const mdUser = require('../middlewares/user-middleware');
const mdUpload = require('../middlewares/upload-middleware');
const UserController = require('../controllers/user-controller');

const uploadFile = multiparty({ uploadDir: './src/uploads/users' });

let Router = express.Router();

Router.get("/", UserController.getUsers);
Router.get("/:id", UserController.getUser);
Router.post("/", mdUser.save, UserController.save);
Router.put("/", [auth.auth, mdUser.update], UserController.update);
Router.delete("/", auth.auth, UserController.delete);

Router.post("/token", UserController.token);
Router.post("/avatar", auth.auth, uploadFile, mdUpload.avatar, UserController.uploadAvatar);
Router.get("/avatar/:fileName", UserController.getAvatar);

module.exports = Router;