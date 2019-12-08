'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const validator = require('validator');

const Schema = mongoose.Schema;

const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not an allowed role'
}

/**===============================================
*   Esquema
===============================================**/
let UserSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name cannot be null'],
        match: [/^[a-zA-ZáéíóúÑñ ]+$/, 'Name should only contain letters'],
        minlength: [3, 'Name must not be less than 3 characters'],
        maxlength: [30, 'Name must not have more than 30 characters', 'size name']
    },
    surname: {
        type: String,
        trim: true,
        required: [true, 'Surname cannot be null'],
        match: [/^[a-zA-ZáéíóúÑñ ]+$/, 'Surname should only contain letters'],
        minlength: [3, 'Surname must not be less than 3 characters', 'size surname'],
        maxlength: [30, 'Surname must not have more than 30 characters', 'size surname']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email cannot be null'],
        validate: [validator.isEmail, 'Is not a valid email addres', 'invalid email address']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password cannot be null'],
        minlength: [8, 'Password must not be less than 8 characters', 'size password']
    },
    role: {
        type: String,
        trim: true,
        default: 'USER_ROLE',
        uppercase: true,
        enum: rolesValidos
    },
    image: {
        type: String,
        trim: true,
        default: 'noavatar.png',
        required: false,
        match: [/^[/\w/ ._-]+$/, 'Invalid image name']
    }
}, { versionKey: false });

/**===============================================
*   Otras Validaciones
===============================================**/
// Esta Validacion es solo un ejemplo, ya esta implementada mas arriba
// UserSchema.path('email').validate(function (email) {
//     return validator.isEmail(email)
// }, 'Is not a valid email addres', 'invalid email address')
/**===============================================
*   Validacion unique que en el caso de este esquema solo es el email
===============================================**/
UserSchema.plugin(uniqueValidator, { message: 'This email has already been registered in the database' });

/**===============================================
*   Agregando el plugin mongoosePaginate
===============================================**/
UserSchema.plugin(mongoosePaginate);

/**===============================================
*   Elimina la contraseña al enviar el JSON
===============================================**/
UserSchema.methods.toJSON = function () {
    let userObject = this.toObject();
    delete userObject.password;
    return userObject;
};



module.exports = mongoose.model('User', UserSchema);