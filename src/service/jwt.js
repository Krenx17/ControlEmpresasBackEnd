'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
const { use } = require("../routes/user.routes");
var secret="secret_key";

exports.createToken = function (user){
    var payload = {
        sub: user._id,
        company: user.company,
        celphone: user.celphone,
        email: user.email,
        user: user.user,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().day(10, "days").unix()
    }
    
    return jwt.encode(payload, secret);
}