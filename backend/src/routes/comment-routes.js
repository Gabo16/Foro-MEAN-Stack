'use strict'

const express = require('express');
const auth = require('../middlewares/auth-middleware');
const CommentCtrl = require('../controllers/comment-controller');

const Router = express.Router();

Router.post('/topic/:topicId', auth.auth, CommentCtrl.save);
Router.put('/:commentId', auth.auth, CommentCtrl.update);
Router.delete('/:topicId/:commentId', auth.auth, CommentCtrl.delete);

module.exports = Router;