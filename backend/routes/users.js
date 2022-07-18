const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  register,
  login,
  getUserById,
  update,
} = require('../handler/users');

router.route('/register')
  .post(register);

router.route('/login')
  .post(login);

router.route('/:id')
  .get(authMiddleware, getUserById)
  .put(authMiddleware, update);

module.exports = router;
