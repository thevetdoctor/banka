/* eslint-disable no-console */
const validateEmail = (email) => {
  const validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(email) && email.trim() !== '';
  return validEmail;
};

const regExp = /[^0-9]/;


class validateAccount {
  static creation(req, res, next) {
    const { owner } = req.body;
    let { type } = req.body;
    type = type.trim();


    if (regExp.test(owner)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid account owner supplied',
      });
      return;
    }


    if (owner === undefined || owner === '') {
      res.status(400).json({
        status: 400,
        error: 'Account owner not supplied',
      });
      return;
    }


    if (type === undefined || type === '') {
      res.status(400).json({
        status: 400,
        error: 'Account type not supplied',
      });
      return;
    }

    // if (type !== 'current' || type !== 'savings') {
    //   console.log(type.trim());
    //   res.status(400).json({
    //     status: 400,
    //     error: 'Account type must be CURRENT or SAVINGS',
    //   });
    //   return;
    // }

    next();
  }


  static activation(req, res, next) {
    const accountStatus = req.body.status;

    // console.log(accountStatus);
    if (typeof accountStatus !== 'string') {
      res.status(400).json({
        status: 400,
        error: 'Invalid status supplied',
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
    next();
  }


  static listing(req, res, next) {
    const { accountNumber } = req.params;


    // if no 'status' indicated as a req.query, proceed with get single account
    if (regExp.test(accountNumber)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid account number',
      });
      return;
    }
    next();
  }


  static getTransactions(req, res, next) {
    const { transactions } = req.params;
    console.log(req.params);

    if (transactions !== 'transactions') {
      res.status(400).json({
        status: 400,
        error: 'Params can only be transactions',
      });
      return;
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
