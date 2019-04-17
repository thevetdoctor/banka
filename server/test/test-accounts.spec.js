/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

// eslint-disable-next-line no-unused-vars
const should = chai.should();
const { AccountController } = require('../controllers/accounts');

chai.use(chaiHttp);


describe('Account Controller', () => {
  it('AccountController should exist', () => {
    AccountController.should.exist;
  });
});


describe('Account Creation Endpoint', () => {
  it('Account CREATE method should exist', () => {
    AccountController.create.should.exist;
  });

  it('Create(POST) should create a new account', (done) => {
    chai.request(server)
      .post('/api/v1/accounts')
      .send({
        owner: 1,
        type: 'current',
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


describe('Error Handling (Account Creation Endpoint)', () => {
  it('should return an ERROR if owner ID not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/accounts')
      .send({
        // owner: 1,
        type: 'current',
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

  it('should return an ERROR if account TYPE is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/accounts')
      .send({
        owner: 1,
        // type: 'current',
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


describe('Account Activate/Deactivate Endpoint', () => {
  it('Account ACTIVATE method should exist', () => {
    AccountController.activate.should.exist;
  });

  it('Activate(PATCH) should change account status', (done) => {
    chai.request(server)
      .patch('/api/v1/accounts/2019031111')
      .send({
        status: 'active',
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


describe('Error HAndling (Account Activate/Deactivate Endpoint)', () => {
  it('return an ERROR if STATUS is not supplied', (done) => {
    chai.request(server)
      .patch('/api/v1/accounts/2019031111')
      .send({
        // status: 'active',
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


describe('Account Delete Endpoint', () => {
  it('Account DELETE method should exist', () => {
    AccountController.delete.should.exist;
  });

  it('Delete(DELETE) should delete account from records', (done) => {
    chai.request(server)
      .delete('/api/v1/accounts/2019031112')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('message');
      });
    done();
  });
});


describe('Accounts List Endpoint', () => {
  it('Account LIST method should exist', () => {
    AccountController.list.should.exist;
  });

  it('List(GET) should list all (available) accounts from records', (done) => {
    chai.request(server)
      .get('/api/v1/accounts')
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


describe('Single Account List Endpoint', () => {
  it('Account LISTONE method should exist', () => {
    AccountController.listOne.should.exist;
  });

  it('ListOne(GET) should list a specific account from records', (done) => {
    chai.request(server)
      .get('/api/v1/accounts/2019031113')
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
