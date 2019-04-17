class Transaction {
  constructor(type, accountNumber, amount) {
    this.id = 1;
    this.createdOn = new Date().toDateString();
    this.type = type;
    this.accountNumber = accountNumber;
    this.cashier = Number();
    this.amount = Number(amount).toFixed(2);
    this.oldBalance = Number().toFixed(2);
    this.newBalance = Number().toFixed(2);
  }
}


module.exports = Transaction;
