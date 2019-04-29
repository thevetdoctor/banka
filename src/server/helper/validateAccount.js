/* eslint-disable no-console */
const validateEmail = (email) => {
  const validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(email) && email.trim() !== '';
  return validEmail;
};

const regExp = /[^0-9]/g;
const specialCharacters = /[.*&%£$"!@"^><!¬+=-_`|?/;:')()]/;


class validateAccount {
  static creation(req, res, next) {
    const { type } = req.body;

    if (type === undefined || type === '') {
      res.status(400).json({
        status: 400,
        error: 'Account type not supplied',
      });
      return;
    }

    next();
  }


  static activation(req, res, next) {
    const accountStatus = req.body.status;
    let { accountNumber } = req.params;
    // accountNumber = parseInt(accountNumber, 10);
    accountNumber = accountNumber.replace(/[^\w\s\][^,]/gi, '');

    if (req.params === '') {
      res.status(400).json({
        status: 400,
        error: 'No parameter supplied',
      });
      return;
    }

    if (accountStatus === undefined || accountStatus.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Status not supplied',
      });
      return;
    }

    if (typeof accountStatus !== 'string') {
      res.status(400).json({
        status: 400,
        error: 'Invalid status supplied',
      });
      return;
    }

    if (regExp.test(accountNumber)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid account number supplied',
      });
      return;
    }

    if (specialCharacters.test(accountNumber)) {
      res.status(400).json({
        status: 400,
        error: 'Special characters not allowed',
      });
      return;
    }

    next();
  }


  static deletion(req, res, next) {
    const { accountNumber } = req.params;

    if (regExp.test(accountNumber)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid account number supplied',
      });
    }

    if (specialCharacters.test(accountNumber)) {
      res.status(400).json({
        status: 400,
        error: 'Special characters not allowed',
      });
      return;
    }

    next();
  }

  static getTransactions(req, res, next) {
    const { transactions } = req.params;
    const { accountNumber } = req.params;
    // console.log(req.params);

    if (transactions !== 'transactions') {
      res.status(400).json({
        status: 400,
        error: 'Params can only be transactions',
      });
      return;
    }

    if (regExp.test(accountNumber)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid account number supplied',
      });
    }

    if (specialCharacters.test(accountNumber)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid account supplied',
      });
      return;
    }

    next();
  }


  static listing(req, res, next) {
    const { accountNumber } = req.params;
    const { status } = req.query;


    // if no 'status' indicated as a req.query, proceed with get single account

    if (status === undefined) {
      if (regExp.test(accountNumber)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid account number',
        });
        return;
      }

      if (specialCharacters.test(accountNumber)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid account supplied',
        });
        return;
      }
    }

    next();
  }


  static getUserBankAccounts(req, res, next) {
    const { userEmailAddress } = req.params;
    const { accounts } = req.params;

    console.log(req.params);
    console.log(userEmailAddress, accounts);
    if (accounts !== 'accounts') {
      res.status(400).json({
        status: 400,
        error: 'Params must be user-email-address/accounts',
      });
      return;
    }

    if (!validateEmail(userEmailAddress)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Email',
      });
      return;
    }
    next();
  }
}


export default validateAccount;
