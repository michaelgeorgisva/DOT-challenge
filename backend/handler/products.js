const Product = require('../schema/products');

const addProduct = async (req, res) => {
  await Product.sync();

  Product.findOne({ where: { name: req.body.name } })
    .then((product) => {
      if (product) {
        return res.status(400).send({
          message: 'product has already exist',
        });
      }

      Product.create({...req.body})
        .then(() => {
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
    })
}

const getAllProduct = (req, res) => {
  Product.findAll()
    .then((product) => {
      if (!product) {
        return res.status(500).send({
          message: 'internal server error',
        })
      }
      return res.send({
        message: 'successful',
        data: product,
      })
    })
    .catch((err) => res.status(500).send({ message: err || 'internal server error' }));
}

const getProduct = (req, res) => {
  Product.findOne({ where: { id: req.params.id } })
    .then((product) => {
      if (!product) {
        return res.status(400).send({
          message: 'product not found',
        })
      }
      return res.send({
        message: 'successful',
        data: product,
      })
    })
    .catch((err) => res.status(500).send({ message: err || 'internal server error' }));
}

const updateProduct = (req, res) => {
  Product.findOne({ where: { id: req.params.id } })
    .then((product) => {
      if (!product) {
        return res.status(400).send({
          message: 'product not found',
        });
      }

      Product.sync();
      Product.update({...req.body}, { where: { id: product.id } })
        .then((product) => {
          if (product[0] == 1) {
            return res.send({
              message: 'successful',
            });
          }
          res.send({
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
}


module.exports = {
  addProduct,
  getAllProduct,
  getProduct,
  updateProduct
}