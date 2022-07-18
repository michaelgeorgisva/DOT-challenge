const store = require('store2');
const Cart = require('../schema/cart');
const Product = require('../schema/products');
const cartCache = 'CART';

const addToCart = (req, res) => {
  Product.findOne({ where: { id: req.body.productId } })
    .then((product) => {
      const isAlreadyInCart = Cart.some(item => item.id === product.id)

      if (isAlreadyInCart) {
        return res.status(400).send({
          message: 'item already in the cart'
        })
      }

      if (!product) {
        return res.status(400).send({
          message: 'product not found'
        })
      }

      

      Cart.push({ ...product['dataValues'] });
      store.set(cartCache, Cart);
      console.log(store.get(cartCache));
      return res.send({
        message: 'successful'
      })
    })
    .catch((err) => { 
      console.log(err);
      return res.status(500).send({ message: err || 'internal server error' })
    } );
}

const getCart = (req, res) => res.send({ message: 'successful', data: store.get(cartCache) });

module.exports = {
  addToCart,
  getCart
}