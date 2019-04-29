/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import AccountController from '../controllers/accounts';
import testDB from '../db/test-connect';

let accounts;

<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
createtables.createtables;
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa

=======
// test1-1
>>>>>>> immersive
describe('Account Controller', () => {
  it('AccountController should exist', () => {
    AccountController.should.exist;
  });
});

<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa

describe('Account Creation Endpoint', () => {
=======
describe('Account Creation Endpoint', () => {
// test1-2
>>>>>>> immersive
  it('Account CREATE method should exist', () => {
    AccountController.create.should.exist;
  });

<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======
  // test1-3
>>>>>>> immersive
  it('Create(POST) should create a new account', (done) => {
    chai.request(server)
      .post('/api/v1/accounts')
      .send({
        owner: 1,
        type: 'current',
      })
      .end((err, res) => {
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
=======
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(201);
>>>>>>> immersive
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
      });
    done();
  });
});

<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa

describe('Error Handling (Account Creation Endpoint)', () => {
=======
// test1-4
describe('Error Handling (Account Creation Endpoint)', () => {
  it('should return an ERROR if owner ID is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/accounts')
      .send({
        owner: '1fr',
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

  // test1-5
>>>>>>> immersive
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

<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======
  // test1-6
>>>>>>> immersive
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======

  // test1-7
  it('should return an ERROR if account owner does not exist', (done) => {
    chai.request(server)
      .post('/api/v1/accounts')
      .send({
        owner: 111,
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
>>>>>>> immersive
});
=======
const text = 'SELECT accountnumber FROM accounts';

testDB.query(text)
  .then((result) => {
    const allAccounts = result.rows;
    accounts = allAccounts;
  })
  .catch((err) => {
    console.group(err);
  });


const should = chai.should();

chai.use(chaiHttp);
>>>>>>> feature(authorization):plus feedback implementation

let myToken;

<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
describe('Account Activate/Deactivate Endpoint', () => {
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======
// test2-1
>>>>>>> immersive
  it('Account ACTIVATE method should exist', () => {
    AccountController.activate.should.exist;
  });

<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======
  // test2-2
>>>>>>> immersive
  it('Activate(PATCH) should change account status', (done) => {
=======

describe('Testing...', () => {
  before((done) => {
>>>>>>> feature(authorization):plus feedback implementation
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
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
});


describe('Error Handling (Account Activate/Deactivate Endpoint)', () => {
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======
  // test2-3
  it('return an ERROR if STATUS is invalid', (done) => {
    chai.request(server)
      .patch('/api/v1/accounts/2019031111')
      .send({
        status: 'activerrr',
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

  // test2-4
>>>>>>> immersive
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
});


=======

  // test2-5
  it('return an ERROR if STATUS supplied is neither DORMANT nor ACTIVE', (done) => {
    chai.request(server)
      .patch('/api/v1/accounts/2019031111')
      .send({
        status: 'activedorm',
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


// test3-1
>>>>>>> immersive
describe('Account Delete Endpoint', () => {
  it('Account DELETE method should exist', () => {
    AccountController.delete.should.exist;
  });

<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
  it('Delete(DELETE) should delete account from records', (done) => {
    chai.request(server)
      .delete('/api/v1/accounts/2019031112')
=======
  // test3-2
  it('Delete(DELETE) should delete account from records', (done) => {
    chai.request(server)
      .delete('/api/v1/accounts/2019031119')
>>>>>>> immersive
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


<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
describe('Accounts List Endpoint', () => {
  it('Account LIST method should exist', () => {
    AccountController.list.should.exist;
  });

=======
describe('Error Handling (Account Delete Endpoint)', () => {
  // test3-3
  it('return an ERROR if account number is INVALID', (done) => {
    chai.request(server)
      .delete('/api/v1/accounts/20190311error')
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

  // test3-4
  it('return an ERROR if account not available', (done) => {
    chai.request(server)
      .delete('/api/v1/accounts/2019031110')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(404);
        res.body.should.have.property('error');
      });
    done();
  });
});


// test4-1
describe('Accounts List All Accounts Endpoint', () => {
  it('Account ListAllAccounts method should exist', () => {
    AccountController.listAllAccounts.should.exist;
  });

  // test4-2
>>>>>>> immersive
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
        res.body.data.should.be.a('object');
=======
        res.body.data.should.be.a('array');
>>>>>>> immersive
      });
    done();
  });
});


<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
describe('Single Account List Endpoint', () => {
  it('Account LISTONE method should exist', () => {
    AccountController.listOne.should.exist;
  });

  it('ListOne(GET) should list a specific account from records', (done) => {
    chai.request(server)
      .get('/api/v1/accounts/2019031113')
=======
describe('List Account Endpoint', () => {
  // test5-1
  it('Account ListAccount method should exist', () => {
    AccountController.listAccount.should.exist;
  });

  // test5-2
  it('ListAccount(GET) should list a specific account from records', (done) => {
    chai.request(server)
      .get('/api/v1/accounts/2019031111')
>>>>>>> immersive
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(200);
        res.body.should.have.property('data');
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
        res.body.data.should.be.a('object');
=======
        res.body.data.should.be.a('array');
      });
    done();
  });
});


describe('Error Handling (List Account Endpoint)', () => {
=======
  // test1-1
  describe('Account Controller', () => {
    it('AccountController should exist', () => {
      AccountController.should.exist;
    });
  });

  describe('Account Creation Endpoint', () => {
    // test1-2
    it('Account CREATE method should exist', () => {
      AccountController.create.should.exist;
    });

    // test1-3
    it('Create(POST) should create a new account', (done) => {
      chai.request(server)
        .post('/api/v1/accounts')
        .set('Authorization', `Bearer ${myToken}`)
        .send({
          type: 'current',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal(201);
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
        });
      done();
    });
  });

  // test1-4
  describe('Error Handling (Account Creation Endpoint)', () => {
    // it('should return an ERROR if owner ID is invalid', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/accounts')
    //     .set('Authorization', `Bearer ${myToken}`)
    //     .send({
    //       owner: '1fr',
    //       type: 'current',
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.should.be.json;
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('status');
    //       res.body.status.should.equal(400);
    //       res.body.should.have.property('error');
    //     });
    //   done();
    // });

    // // test1-5
    // it('should return an ERROR if owner ID not supplied', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/accounts')
    //     .set('Authorization', `Bearer ${myToken}`)
    //     .send({
    //     // owner: 1,
    //       type: 'current',
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.should.be.json;
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('status');
    //       res.body.status.should.equal(400);
    //       res.body.should.have.property('error');
    //     });
    //   done();
    // });

    // test1-6
    it('should return an ERROR if account TYPE is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/accounts')
        .set('Authorization', `Bearer ${myToken}`)
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

    // test1-7
    // it('should return an ERROR if account owner does not exist', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/accounts')
    //     .set('Authorization', `Bearer ${myToken}`)
    //     .send({
    //       owner: 111,
    //       type: 'current',
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.should.be.json;
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('status');
    //       res.body.status.should.equal(400);
    //       res.body.should.have.property('error');
    //     });
    //   done();
    // });
  });


  describe('Account Activate/Deactivate Endpoint', () => {
    // test2-1
    it('Account ACTIVATE method should exist', () => {
      AccountController.activate.should.exist;
    });

    // test2-2
    it('Activate(PATCH) should change account status', (done) => {
      chai.request(server)
        .patch(`/api/v1/accounts/${accounts[2].accountnumber}`)
        .set('Authorization', `Bearer ${myToken}`)
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


  describe('Error Handling (Account Activate/Deactivate Endpoint)', () => {
  // test2-3
    it('return an ERROR if STATUS is invalid', (done) => {
      chai.request(server)
        .patch('/api/v1/accounts/2019031111')
        .set('Authorization', `Bearer ${myToken}`)
        .send({
          status: 'activerrr',
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

    // test2-4
    it('return an ERROR if STATUS is not supplied', (done) => {
      chai.request(server)
        .patch('/api/v1/accounts/2019031111')
        .set('Authorization', `Bearer ${myToken}`)
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

    // test2-5
    it('return an ERROR if STATUS supplied is neither DORMANT nor ACTIVE', (done) => {
      chai.request(server)
        .patch('/api/v1/accounts/2019031111')
        .set('Authorization', `Bearer ${myToken}`)
        .send({
          status: 'activedorm',
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


  // test3-1
  describe('Account Delete Endpoint', () => {
    it('Account DELETE method should exist', () => {
      AccountController.delete.should.exist;
    });

    // test3-2
    it('Delete(DELETE) should delete account from records', (done) => {
      chai.request(server)
        .delete(`/api/v1/accounts/${accounts[0].accountnumber}`)
        .set('Authorization', `Bearer ${myToken}`)
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


  describe('Error Handling (Account Delete Endpoint)', () => {
  // test3-3
    it('return an ERROR if account number is INVALID', (done) => {
      chai.request(server)
        .delete('/api/v1/accounts/20190311error')
        .set('Authorization', `Bearer ${myToken}`)
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

    // test3-4
    it('return an ERROR if account not available', (done) => {
      chai.request(server)
        .delete('/api/v1/accounts/2019031110')
        .set('Authorization', `Bearer ${myToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal(404);
          res.body.should.have.property('error');
        });
      done();
    });
  });


  // test4-1
  describe('Accounts List All Accounts Endpoint', () => {
    it('Account ListAllAccounts method should exist', () => {
      AccountController.listAllAccounts.should.exist;
    });

    // test4-2
    it('List(GET) should list all (available) accounts from records', (done) => {
      chai.request(server)
        .get('/api/v1/accounts')
        .set('Authorization', `Bearer ${myToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
        });
      done();
    });
  });


  describe('List Account Endpoint', () => {
  // test5-1
    it('Account ListAccount method should exist', () => {
      AccountController.listAccount.should.exist;
    });

    // test5-2
    it('ListAccount(GET) should list a specific account from records', (done) => {
      chai.request(server)
        .get(`/api/v1/accounts/${accounts[1].accountnumber}`)
        .set('Authorization', `Bearer ${myToken}`)
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


  describe('Error Handling (List Account Endpoint)', () => {
>>>>>>> feature(authorization):plus feedback implementation
  // test5-3
    it('should return an ERROR if account number is INVALID', (done) => {
      chai.request(server)
        .get('/api/v1/accounts/201903111err')
        .set('Authorization', `Bearer ${myToken}`)
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

    // test5-4
    it('should return an ERROR if account number is not available', (done) => {
      chai.request(server)
        .get('/api/v1/accounts/2019031111')
        .set('Authorization', `Bearer ${myToken}`)
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


  describe('ListAccount(GET) with req.query (accounts?status="")', () => {
    // test5-5
    it('(accounts?status="active") should list active accounts', (done) => {
      chai.request(server)
        .get('/api/v1/accounts/accounts?status=active')
        .set('Authorization', `Bearer ${myToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
        });
      done();
    });


    // test5-6
    it('(accounts?status="dormant") should list dormant accounts', (done) => {
      chai.request(server)
        .get('/api/v1/accounts/accounts?status=dormant')
        .set('Authorization', `Bearer ${myToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
        });
      done();
    });
  });


  describe('Error Handling (ListAccount(GET) with req.query (accounts?status="")', () => {
  // test5-7
    it('should return an ERROR if query value is neither ACTIVE nor DORMANT', (done) => {
      chai.request(server)
        .get('/api/v1/accounts/accounts?status="dormactive"')
        .set('Authorization', `Bearer ${myToken}`)
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


  describe('GET Transactions Endpoint', () => {
  // test6-1
    it('getTransactions METHOD should exist', () => {
      AccountController.getTransactions.should.exist;
    });

    // test6-2
    it('should return a list of transactions for a specified account', (done) => {
      chai.request(server)
        .get(`/api/v1/accounts/${accounts[2].accountnumber}/transactions`)
        .set('Authorization', `Bearer ${myToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
        });
      done();
    });
  });


  describe('Error Handling (GET Transactions Endpoint)', () => {
  // test6-3
    it('return an ERROR if params is not "transactions"', (done) => {
      chai.request(server)
        .get(`/api/v1/accounts/${accounts[2].accountnumber}/transact`)
        .set('Authorization', `Bearer ${myToken}`)
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

    // test6-4
    it('return an ERROR if accountnumber does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/accounts/2019031112/transactions')
        .set('Authorization', `Bearer ${myToken}`)
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


  describe('getuserBankAccounts Endpoint', () => {
  // test7-1
    it('getUserBankAccounts method should exist', () => {
      AccountController.getUserBankAccounts.should.exist;
    });

    // test7-2
    it('GET getUSerBankAccounts should return a list of a specific user"s bank accounts', (done) => {
      chai.request(server)
        .get('/api/v1/accounts/user/admin@banka.com/accounts')
        .set('Authorization', `Bearer ${myToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.status.should.equal(200);
          res.body.should.have.property('accounts');
          res.body.accounts.should.be.a('array');
        });
      done();
    });
  });


  describe('Error Handling (getuserBankAccounts Endpoint)', () => {
  // test7-3
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
  it('should return an ERROR if "/accounts" not in params', (done) => {
    chai.request(server)
      .get('/api/v1/accounts/user/dami@gmail.com/')
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

  // test7-4
  it('should return an ERROR if email is INVALID', (done) => {
    chai.request(server)
      .get('/api/v1/accounts/user/damigmail.com/accounts')
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

  // test7-5
  it('should return an ERROR if email does not exist in records', (done) => {
    chai.request(server)
      .get('/api/v1/accounts/user/da@gmail.com/accounts')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal(400);
        res.body.should.have.property('error');
>>>>>>> immersive
      });
    done();
=======
    it('should return an ERROR if "/accounts" not in params', (done) => {
      chai.request(server)
        .get('/api/v1/accounts/user/dami@gmail.com/')
        .set('Authorization', `Bearer ${myToken}`)
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

    // test7-4
    it('should return an ERROR if email is INVALID', (done) => {
      chai.request(server)
        .get('/api/v1/accounts/user/invalid@@banka.com/accounts')
        .set('Authorization', `Bearer ${myToken}`)
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

    // test7-5
    it('should return an ERROR if email does not exist in records', (done) => {
      chai.request(server)
        .get('/api/v1/accounts/user/invalid@banka.com/accounts')
        .set('Authorization', `Bearer ${myToken}`)
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
>>>>>>> feature(authorization):plus feedback implementation
  });
});
