const router = require('express').Router();
const adminMiddleware = require('../middleware/adminMiddleware');

const {
  addProduct,
  getAllProduct,
  getProduct,
  updateProduct
} = require('../handler/products');

router.route('/')
  .get(getAllProduct)
  .post(adminMiddleware, addProduct);

router.route('/:id')
  .get(getProduct)
  .put(adminMiddleware, updateProduct);


module.exports = router;
