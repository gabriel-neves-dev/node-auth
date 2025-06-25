const passport = require("passport");

const checkAuthenticated = passport.authenticate("jwt", { session: false });

module.exports = { checkAuthenticated };