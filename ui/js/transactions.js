/* eslint-disable no-console */
console.log('Transactions');

// const accountNum = document.querySelector('.account-number');
// const getAccountBtn = document.querySelector('.get-account');
const tranxDisplay = document.querySelector('.transaction-display');


const transactionRecord = [
  {
    id: 1,
    createdOn: new Date().toDateString(),
    type: 'credit',
    accountNumber: 2019031111,
    cashier: 2,
    amount: 2000.00,
    oldBalance: 15000.05,
    newBalance: 17000.05,
  },
  {
    id: 2,
    createdOn: new Date().toDateString(),
    type: 'credit',
    accountNumber: 2019031112,
    cashier: 2,
    amount: 2000.00,
    oldBalance: 17000.05,
    newBalance: 19000.05,
  },
  {
    id: 3,
    createdOn: new Date().toDateString(),
    type: 'credit',
    accountNumber: 2019031113,
    cashier: 1,
    amount: 2500.00,
    oldBalance: 19000.05,
    newBalance: 21500.05,
  },
  {
    id: 1,
    createdOn: new Date().toDateString(),
    type: 'credit',
    accountNumber: 2019031111,
    cashier: 2,
    amount: 2000.00,
    oldBalance: 15000.05,
    newBalance: 17000.05,
  },
  {
    id: 2,
    createdOn: new Date().toDateString(),
    type: 'credit',
    accountNumber: 2019031112,
    cashier: 2,
    amount: 2000.00,
    oldBalance: 17000.05,
    newBalance: 19000.05,
  },
  {
    id: 3,
    createdOn: new Date().toDateString(),
    type: 'credit',
    accountNumber: 2019031113,
    cashier: 1,
    amount: 2500.00,
    oldBalance: 19000.05,
    newBalance: 21500.05,
  },
];


// const cashierRecord = [
//   {
//     id: 1,
//     firstName: 'AnalyserNode',
//     lastName: 'TreeWalker',
//   },
//   {
//     id: 2,
//     firstName: 'Analyser',
//     lastName: 'Tree',
//   },
//   {
//     id: 3,
//     firstName: 'Node',
//     lastName: 'Walker',
//   },
// ];


const displayTranx = () => {
  // const num = accountNum.value;
  //   let tranxList = '';

  // console.log(num);
  let tranxList = '';
  // const findTranx = tx => tx.accountNumber === num;
  // const tranxArray = transactionRecord.filter(findTranx);
  // console.log(tranxArray);

  transactionRecord.forEach((tranx) => {
    tranxList += `<div class="tranx-div" id="${tranx.id}">
                           Transaction Type: ${tranx.type}
                        <p>Amount: ${tranx.amount} </p>
                        <p>Old Balance: N${tranx.oldBalance} </p>
                        <p>New balance: N${tranx.newBalance}</p>
                        <p>Date Updated: N${tranx.createdOn}</p>
                        <button id="status-btn" class="staff-btn">View Account</button>
                    </div>`;
  });
  tranxDisplay.innerHTML = tranxList;
};

displayTranx();
// getAccountBtn.addEventListener('click', displayTranx);
