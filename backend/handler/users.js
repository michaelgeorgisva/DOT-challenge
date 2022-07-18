const bcrypt = require('bcrypt');
const produceJWT = require('../utils/produceJWT');
const User = require('../schema/users');


const register = (req, res) => {
  User.sync()
    .then(() => console.log('Success sync'))
    .catch((err) => console.log(`Fail: ${err}`));

  if (req.body.password) {
    User.findOne({ where: { userName: req.body.userName } }).then((user) => {
      if (user) {
        return res.status(400).send({
          message: 'username has already been used',
        });
      }

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).send({
            message: err || 'internal server error',
          });
        }

        const user = {
          name: req.body.name,
          birthDate: req.body.birthDate,
          email: req.body.email,
          userName: req.body.userName,
          password: hash,
        };

        User.create(user)
          .then(() => {
            return res.status(201).send({
              message: 'successful',
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send({
              message: err || 'internal server error',
            });
          });
      });
    });
  } else {
    res.status(400).send({
      message: "password can't be empty",
    });
  }
};

const login = (req, res) => {
  User.findOne({ where: { userName: req.body.userName } })
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: 'there is no user with related credentials',
        });
      }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(500).send({
            message: err || 'internal server error',
          });
        }

        if (user.userName === "admin") {
          const accessToken = produceJWT.accessTokenAdmin(user);

          return res.status(200).send({
            message: 'successful',
            data: {
              userId: user.id,
              accessToken,
            },
          });
        }

        if (result) {
          const accessToken = produceJWT.accessToken(user);

          return res.status(200).send({
            message: 'successful',
            data: {
              userId: user.id,
              accessToken,
            },
          });
        }
        return res.status(400).send({
          message: 'there is no user with the related credentials',
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err || 'internal server error',
      });
    });
};

// const logout = (req, res) => {
//   const { refreshToken } = req.cookies;
//   if (!refreshToken) return res.status(404).send({ message: 'already logged out' });
//   res.clearCookie('refreshToken');
//   res.status(200).send({
//     message: 'successful',
//   });
// };

const getUserById = (req, res) => {
  if (req.userData.id === parseInt(req.params.id, 10)) {
    User.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password'] } })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'user not found',
          });
        }
        return res.send({
          message: 'sucessfull',
          data: user,
        });
      })
      .catch((err) => res.status(500).send({ message: err || 'internal server error' }));
  } else {
    res.status(403).send({
      message: 'forbidden',
    });
  }
};

const update = (req, res) => {
  if (req.userData.id === parseInt(req.params.id, 10)) {
    User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'user not found',
          });
        }

        User.sync();
        User.update({...req.body}, { where: { id: user.id } })
          .then((user) => {
            if (user[0] === 1) {
              return res.send({
                message: 'sucessfull',
              });
            }
            return res.send({
              message: `fail`,
            });
          })
          .catch((err) => {
            return res.status(500).send({
              message: err || 'internal server error',
            });
          });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err || 'internal server error',
        });
      });
  } else {
    return res.status(403).send({
      message: 'forbidden',
    });
  }
};


module.exports = {
  register,
  login,
  update,
  getUserById,
};
