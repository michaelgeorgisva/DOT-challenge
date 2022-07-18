const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

const { addToCart, getCart } = require('../handler/cart')

router.route('/')
  .post(authMiddleware, addToCart)
  .get(authMiddleware, getCart);


module.exports = router;