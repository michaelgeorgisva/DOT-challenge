const express = require('express');
const userRouter = require('./routes/users')
const productRouter = require('./routes/products')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/orders')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  return res.send({
    message: "Hello Welcome",
  });
})

app.use('/user', userRouter)
app.use('/products', productRouter)
app.use('/cart', cartRouter)
app.use('/orders', orderRouter)

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
})