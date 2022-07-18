const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
 addOrder,
 getAllOrder,
 getOrder
} = require('../handler/orders');

router.route('/')
  .post(authMiddleware, addOrder);

router.route('/:userId')
  .get(getAllOrder);
// .put(adminMiddleware, updateProduct);

router.route('/:userId/:orderId')
  .get(getOrder)

module.exports = router;
