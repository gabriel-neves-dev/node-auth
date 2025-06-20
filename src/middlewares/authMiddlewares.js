//MIDDLEWARES
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/dashboard")
  }
  next()
}

function checkNotAuthenticaded(req, res, next){
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect("/users/login")
}

module.exports = { checkAuthenticated, checkNotAuthenticaded };