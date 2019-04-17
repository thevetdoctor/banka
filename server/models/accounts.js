class Account {
  constructor(owner, type, status = 'draft') {
    this.id = Number();
    this.accountNumber = Number();
    this.createdOn = new Date().toDateString();
    this.owner = owner;
    this.type = type;
    this.status = status;
    this.balance = Number().toFixed(2);
  }
}


module.exports = Account;
