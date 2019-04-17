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


describe('Credit/Debit Transaction Endpoint', () => {
  it('CreDebit transaction method should exist', () => {
    TransactionController.creDebit.should.exist;
  });

  it('Credit/Debit(POST) should credit/debit an account with the specified amount', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/2019031113/debit')
      .send({
        amount: '30000.21',
      })
      .end((err, res) => {
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


describe('Error Handling (Credit/Debit Transaction Endpoint)', () => {
  it('should return an ERROR if amount to DEBIT is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/2019031113/debit')
      .send({
        // amount: '30000.21',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });

  it('should return an ERROR if amount to CREDIT is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/2019031113/credit')
      .send({
        // amount: '30000.21',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });

  it('should return an ERROR if amount to credit is INVALID', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/2019031113/credit')
      .send({
        amount: '30000.21wer',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });

  it('should return an ERROR if amount to debit is INVALID', (done) => {
    chai.request(server)
      .post('/api/v1/transactions/2019031113/debit')
      .send({
        amount: '30000.21wer',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
      });
    done();
  });
});
