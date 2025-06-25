//MIDDLEWARES
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      message: "User is authenticated",

    })
  }
  next()
}

function checkNotAuthenticaded(req, res, next){
  if (req.isAuthenticated()) {
    return res.status(200).json({
      message: "User is authenticated",
    })
  }

  res.status(401).json({
    message: "User is not authenticated",
  })
}

module.exports = { checkAuthenticated, checkNotAuthenticaded };