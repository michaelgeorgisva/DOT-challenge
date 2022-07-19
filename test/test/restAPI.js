const supertest = require('supertest');
const { expect } = require('chai');
const { USER } = require('../../backend/db/config');

const request = supertest('http://localhost:8080');

let USER_ID = 0
let PRODUCT_ID = 0
let TOKEN = ''

describe('Users', () => {
  
  // it('POST /user/register', (done) => {
  //   const data = {
  //     email: 'mybaby@gmail.com',
  //     userName: 'mybaby',
  //     password: 'mybaby',
  //   }

  //   request
  //     .post('/user/register')
  //     .send(data)
  //     .end((err, res) => {
  //       expect(res.status).to.eq(201);
  //       expect(res.body.message).to.eq('successful');
  //       done();
  //     })
  // })

  it('POST /user/login', (done) => {
    const data = {
      userName: 'mybaby',
      password: 'mybaby',
    }

    request
      .post('/user/login')
      .send(data)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        expect(res.body.data).to.not.be.empty;
        expect(res.body.message).to.eq('successful');
        TOKEN = res.body.data.accessToken;
        USER_ID = res.body.data.userId;
        done();
      })
  })

  it('GET /user/:userId', (done) => {
    request
      .get(`/user/${USER_ID}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        expect(res.body.data).to.not.be.empty;
        expect(res.body.data.id).to.eq(USER_ID);
        done();
      })
  })

  it('PUT /user/:userId', (done) => {
    const data = {
      name: 'test',
      birthDate: Date.now(),
    }

    request
      .put(`/user/${USER_ID}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('successful');
        done();
      })
  })
})

describe('Products', () => {
  it('GET /products', (done) => {
    request
      .get('/products')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        expect(res.body.data).to.not.be.empty;
        expect(res.body.message).to.eq('successful');
        PRODUCT_ID = res.body.data[Math.floor(Math.random()*12)]['id'];
        // console.log(PRODUCT_ID);
        done();
      })
  })

  it('GET /products/:id', (done) => {
    request
      .get(`/products/${PRODUCT_ID}`)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        expect(res.body.data).to.not.be.empty;
        expect(res.body.message).to.eq('successful');
        expect(res.body.data.id).to.eq(PRODUCT_ID);
        // console.log(res.body.data);
        done();
      })
  })
})

describe('Cart', () => {
  it('POST /cart', (done) => {
    const data = {
      productId: PRODUCT_ID 
    }

    request
      .post('/cart')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('successful');
        // console.log(res.body);
        done();
      })
  })

  it('GET /cart', (done) => {
    request
      .get('/cart')
      .set('Authorization', `Bearer ${TOKEN}`)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        expect(res.body.data).to.not.be.empty;
        expect(res.body.message).to.eq('successful');
        // console.log(res.body.data);
        done();
      })
  })
})

describe('Order', () => {

  it('POST /orders', (done) => {
    const data = {
      userId: USER_ID
    }

    request
      .post('/orders')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('successful');
        // console.log(res.body);
        done();
      })
  })

  it('GET /orders/:userId', (done) => {
    request
      .get(`/orders/${USER_ID}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        expect(res.body.data).to.not.be.empty;
        expect(res.body.message).to.eq('successful');
        // console.log(res.body.data);
        done();
      })
  })
})