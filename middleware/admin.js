function admin(req, res, next) {
  console.log(req.user);
  if (!req.user.isAdmin)
    return res
      .status(403)
      .send("You are not authorised to perform for this action");

  next();
}

module.exports = admin;
