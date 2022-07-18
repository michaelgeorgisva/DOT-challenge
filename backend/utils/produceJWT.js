const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY || '98103fhjdb6%$$8v189@87^^)fi1'
const SECRET_KEY_ADMIN = process.env.SECRET_KEY_ADMIN || '1$$8v189bak@87^^)fi1198-9130-==;'

module.exports = {
  accessToken: function({email, id, userName}){
    return jwt.sign(
      {
        email,
        id,
        userName,
      },
      SECRET_KEY,
      {
        expiresIn: '1d',
      }
    );
  },

  accessTokenAdmin: function({email, id, userName}){
    return jwt.sign(
      {
        email,
        id,
        userName,
      },
      SECRET_KEY_ADMIN,
      {
        expiresIn: '1w',
      }
    );
  }
}