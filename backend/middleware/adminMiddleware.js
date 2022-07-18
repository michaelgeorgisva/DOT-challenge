const jwt = require('jsonwebtoken');
const SECRET_KEY_ADMIN = process.env.SECRET_KEY_ADMIN || '1$$8v189bak@87^^)fi1198-9130-==;'
module.exports = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (token == null) {
    return res.status(401).send({
      message: 'unauthorized',
    });
  }
  jwt.verify(token, SECRET_KEY_ADMIN, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        message: err,
      });
    }
    req.userData = decoded;
    next();
  });
};
