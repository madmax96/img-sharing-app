var UserModel = require('../models/UserModel');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth') || req.query['xAuth'];
  UserModel.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
    res.set('Access-Control-Expose-Headers','x-auth');
  }).catch(() => {
    res.status(401).send();
  });
};

module.exports = authenticate;
