'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
let UserRoutes = require('./routes/user-routes');
const TopicRoutes = require('./routes/topic-routes');
const CommentRoutes = require('./routes/comment-routes');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(cors());

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/topics', TopicRoutes);
app.use('/api/v1/comments', CommentRoutes);

module.exports = app;
