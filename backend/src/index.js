'use strict'
let mongoose = require('mongoose');
let app = require('./app');

let port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_node', { useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log('Database connected to port: 27017')
        app.listen(port, () => {
            console.log(`Server run on port: ${port}`);
        })
    })
    .catch(err => console.log(err));
