'use strict';

const express = require('express');
const auth = require('../middlewares/auth-middleware');
const TopicCtrl = require('../controllers/topic-controller');

const Router = express.Router();

Router.get('/:page?', TopicCtrl.getTopics);
Router.get('/topic/:id', TopicCtrl.getTopic);
Router.get('/user-topics/:user', TopicCtrl.getTopicByUserId);
Router.post('/', auth.auth, TopicCtrl.save);
Router.post('/search', TopicCtrl.search);
Router.post('/search-paginated/:page', TopicCtrl.searchPaginated);
Router.put('/:id', auth.auth, TopicCtrl.update);
Router.delete('/:id', auth.auth, TopicCtrl.delete);

module.exports = Router;
