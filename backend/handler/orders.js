const Order = require('../schema/orders');
const Product = require('../schema/products');
const Cart = require('../schema/cart');
const store = require('store2');

const cartCache = 'CART';

const addOrder = async (req, res) => {
  if (!store.get(cartCache)){
    return res.send({
      message: 'cart empty',
    })
  }
  const itemsId = store.get(cartCache).map((item) => item.id)

  itemsId.forEach(async (itemId) => {
    const itemData = await Product.findByPk(itemId);
    const itemStock = itemData['dataValues']['stock'];
    console.log(itemStock);
    Product.update({ stock: itemStock-1 }, { where: { id: itemId } })
      .then(() => {})
      .catch((err) => {
        return res.status(500).send({
          message: err || 'internal server error',
        });
      });
  })

  await Order.sync();
  Order.create({...req.body, products: `[${itemsId}]`})
    .then(() => {
      store.remove(cartCache)
      return res.status(201).send({
        message: 'succesful',
      })
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: err || 'internal server error',
      });
    });
}

const getAllOrder = (req, res) => {
  Order.findAll({ where: { userId: req.params.userId } })
    .then((order) => {
      if (!order) {
        return res.status(500).send({
          message: 'internal server error',
        })
      }
      return res.send({
        message: 'successful',
        data: order,
      })
    })
    .catch((err) => res.status(500).send({ message: err || 'internal server error' }));
}

const getOrder = (req, res) => {
  Order.findOne({ where: { id: req.params.orderId }})
    .then((order) => {
      if (!order) {
        return res.status(400).send({
          message: 'order not found',
        })
      }
      return res.send({
        message: 'successful',
        data: order,
      })
    })
}

module.exports = {
  addOrder,
  getAllOrder,
  getOrder
}