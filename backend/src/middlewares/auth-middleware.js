"use strict";

let jwt = require("jwt-simple");
let moment = require("moment");
const SECRET = "cl4v3p4r463n3r4r31t0k3n";
const Response = require("../response/response");

exports.auth = (req, res, next) => {
  let payload = null;

  // Comprobar  si llega autorizacion
  if (!req.headers.authorization) {
    return res.status(403).json(Response._403('The request does not have the authorization header'));
  }

  let token = req.headers.authorization.replace(/['"]+/g, '');

  try {
    // Decodicar token
    payload = jwt.decode(token, SECRET);
    // Comprobar si el token he expirado
    if (payload.exp <= moment().unix()) {
      return res.status(403).json(Response._403('Token has expired'));
    }
  } catch (ex) {
    return res.status(403).json(Response._403('Token is not valid'));
  }
  // Adjunta usuario identificado a request
  req.user = payload;
  // Pasar a la accion
  next();
};
