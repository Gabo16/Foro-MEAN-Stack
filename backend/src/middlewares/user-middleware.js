"use strict";

const User = require("../models/user-model");
let bcrypt = require('bcryptjs');
const validator = require('validator');
const MyResponse = require("../response/response");

const mdUser = {};

mdUser.save = function (req, res, next) {
    /**===============================================
    *   Validando la constraseña
    ===============================================**/
    let password = req.body.password || '';
    password = password.trim();
    if (validator.isEmpty(password)) {
        return res.status(400).json(MyResponse._400({
            errors: {
                password: {
                    message: 'Password cannot be null',
                    name: 'ValidatorError',
                    properties: {
                        message: 'Password cannot be null',
                        type: 'required',
                        path: 'password'
                    },
                    kind: 'required',
                    path: 'password'
                }
            }
        }));
    }
    if (password.length > 0 && password.length < 8) {
        return res.status(400).json(MyResponse._400({
            errors: {
                password: {
                    message: 'Password must not be less than 8 characters',
                    name: 'ValidatorError',
                    properties: {
                        message: 'Password must not be less than 8 characters',
                        type: 'minlength',
                        minlength: 8,
                        path: 'password'
                    },
                    kind: 'minlength',
                    path: 'password'
                }
            }
        }));
    }
    /**===============================================
    *   Cifrando la contraseña
    ===============================================**/
    password = bcrypt.hashSync(password, 10);
    /**===============================================
      *   Se crea el usuario y se pasa a la request
    ===============================================**/
    let user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password,
        role: req.body.role,
        image: req.body.image
    });

    req.body.user = user;

    delete req.body.name;
    delete req.body.surname;
    delete req.body.password;
    delete req.body.email;
    delete req.body.role;
    delete req.body.image;

    next();
};

mdUser.update = (req, res, next) => {
    /**===============================================
      *   Se eliminan datos que no estan permitidos actualizar
      ===============================================**/
    delete req.body.password;
    delete req.body.image;
    delete req.body._id;

    next();
};

module.exports = mdUser;
