/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

// eslint-disable-next-line no-unused-vars
const should = chai.should();
const { TransactionController } = require('../controllers/transactions');

chai.use(chaiHttp);


describe('Transaction Controller', () => {
  it('TransactionController should exist', () => {
    TransactionController.should.exist;
  });
});


describe('Credit Transaction Endpoint', () => {
  it('Credit transaction method should exist', () => {
    TransactionController.credit.should.exist;
  });

  it('Credit(POST) should credit an account with the specified amount', (done) => {
    chai.request(server)
      .post('api/v1/transactions/2019030001/credit')
      .send({
        amount: '30000.21',
      })
      .end((err, res) => {
        // eslint-disable-next-line no-console
        console.log(res);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
      });
    done();
  });
});
