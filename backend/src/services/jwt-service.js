'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
const SECRET = 'cl4v3p4r463n3r4r31t0k3n';

exports.createToken = (user) => {

    let payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode(payload, SECRET);

}