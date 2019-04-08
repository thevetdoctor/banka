/* eslint-disable no-undef */
const chai = require('chai');

// eslint-disable-next-line no-unused-vars
const should = chai.should();
const myFunc = require('../../server/controllers/accounts');

describe('First Test', () => {
  it('myFunc should exist', () => {
    // eslint-disable-next-line no-unused-expressions
    myFunc.should.exist;
  });
});
