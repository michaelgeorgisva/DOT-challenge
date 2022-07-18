const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || '98103fhjdb6%$$8v189@87^^)fi1'
module.exports = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (token == null) {
    return res.status(401).send({
      message: 'unauthorized',
    });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        message: err,
      });
    }
    req.userData = decoded;
    next();
  });
};
