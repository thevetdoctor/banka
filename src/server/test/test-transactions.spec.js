/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import TransactionController from '../controllers/transactions';
import testDB from '../db/test-connect';


let accounts;

const text = 'SELECT accountnumber FROM accounts';

testDB.query(text)
  .then((result) => {
    const allAccounts = result.rows;
    accounts = allAccounts;
  })
  .catch((err) => {
    console.group(err);
  });

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
  it('Credit/Debit(POST) should credit/debit an account with the specified amount', (done) => {
    chai.request(server)
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
      .post('/api/v1/transactions/2019031113/debit')
      .send({
        amount: '30000.21',
=======
      .post('/api/v1/transactions/2019031114/debit')
      .send({
        amount: '00.21',
>>>>>>> immersive
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
=======
let myToken;
let cashierToken;
>>>>>>> feature(authorization):plus feedback implementation


describe('Testing...', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'admin@banka.com',
        password: 'password1',
      })
      .end((err, res) => {
        const { token } = res.body.data;
        myToken = token;
        done(err);
      });
  });

  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'c@banka.com',
        password: 'password3',
      })
      .end((err, res) => {
        const { token } = res.body.data;
        cashierToken = token;
        done(err);
      });
  });

  describe('Transaction Controller', () => {
    it('TransactionController should exist', () => {
      TransactionController.should.exist;
    });
  });

<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======
=======
>>>>>>> feature(authorization):plus feedback implementation

  describe('Credit/Debit Transaction Endpoint', () => {
    it('CreditAndDebit transaction method should exist', () => {
      TransactionController.creditAndDebit.should.exist;
    });

    it('Credit/Debit(POST) should credit/debit an account with the specified amount', (done) => {
      chai.request(server)
        .post(`/api/v1/transactions/${accounts[2].accountnumber}/debit`)
        .set('Authorization', `Bearer ${cashierToken}`)
        .send({
          amount: '00.00',
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

    it('CreditAndDebit transaction method should exist', () => {
      TransactionController.creditAndDebit.should.exist;
    });

    it('Credit/Debit(POST) should credit/debit an account with the specified amount', (done) => {
      chai.request(server)
        .post(`/api/v1/transactions/${accounts[2].accountnumber}/credit`)
        .set('Authorization', `Bearer ${cashierToken}`)
        .send({
          amount: '1200.00',
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
        .post(`/api/v1/transactions/${accounts[2].accountnumber}/debit`)
        .set('Authorization', `Bearer ${cashierToken}`)
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
        .post(`/api/v1/transactions/${accounts[2].accountnumber}/credit`)
        .set('Authorization', `Bearer ${cashierToken}`)
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
        .post(`/api/v1/transactions/${accounts[2].accountnumber}/credit`)
        .set('Authorization', `Bearer ${cashierToken}`)
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
        .post(`/api/v1/transactions/${accounts[2].accountnumber}/debit`)
        .set('Authorization', `Bearer ${cashierToken}`)
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


    it('should return an ERROR if "type" of transaction is neither CREDIT not DEBIT', (done) => {
      chai.request(server)
        .post(`/api/v1/transactions/${accounts[2].accountnumber}/debitcredit`)
        .set('Authorization', `Bearer ${cashierToken}`)
        .send({
          amount: '30000.21',
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


    it('should return an ERROR if account supplied does not exist', (done) => {
      chai.request(server)
        .post('/api/v1/transactions/2019031112/credit')
        .set('Authorization', `Bearer ${cashierToken}`)
        .send({
          amount: '30000.21',
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


    it('should return an ERROR if account supplied does not exist', (done) => {
      chai.request(server)
        .post('/api/v1/transactions/2019031112/debit')
        .set('Authorization', `Bearer ${cashierToken}`)
        .send({
          amount: '30.21',
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


    it('should return an ERROR if there"s insufficient balance for debit transaction', (done) => {
      chai.request(server)
        .post('/api/v1/transactions/2019031111/debit')
        .set('Authorization', `Bearer ${cashierToken}`)
        .send({
          amount: '30000000000.21',
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
>>>>>>> immersive
});
