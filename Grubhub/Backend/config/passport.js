const jwts = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const secret = require('./jwtConfig');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret.secret;

module.exports = passport => {
 passport.use(
     new jwts(opts,(jwt_payload,done) => {

     })
 )   
}