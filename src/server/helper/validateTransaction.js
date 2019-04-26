const numberRegex = /[^0-9]/;


class validateTransaction {
  static validateCreditAndDebit(req, res, next) {
    const { amount } = req.body;
    const { accountNumber } = req.params;
    const { type } = req.params;

    // Validate amount to credit
    if (amount === undefined || amount === '') {
      res.status(400).json({
        status: 400,
        error: 'Amount not supplied',
      });
      return;
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(amount)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Amount',
      });
      return;
    }

    if (numberRegex.test(accountNumber)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Amount Number',
      });
      return;
    }

    // Run this block if type of transaction is neither credit nor debit
    if (type !== 'credit' && type !== 'debit') {
      res.status(400).json({
        status: 400,
        error: 'Invalid Transaction type',
      });

      next();
    }
  }

  static getTransaction(req, res, next) {
    const { transactionId } = req.params;

    if (numberRegex.test(transactionId)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid transaction ID',
      });
      return;
    }
    next();
  }
}


export default validateTransaction;
