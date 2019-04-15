// eslint-disable-next-line no-console
console.log('All Bank accounts displayed');

const accountDisplay = document.querySelector('.bank-accounts');


const bankAccounts = [
  {
    id: 1,
    type: 'Savings',
    number: '2019030002',
    userId: 2,
    dateOpened: new Date().toDateString(),
    balance: 2000,
    lastUpdated: new Date().toDateString(),
    updateType: 'credit',
    status: 'active',
  },
  {
    id: 2,
    type: 'Corporate',
    number: '2019030001',
    userId: 1,
    dateOpened: new Date().toDateString(),
    balance: 30000,
    lastUpdated: new Date().toDateString(),
    updateType: 'debit',
    status: 'active',
  },
  {
    id: 3,
    type: 'Savings',
    number: '2019030001',
    userId: 4,
    dateOpened: new Date().toDateString(),
    balance: 12000,
    lastUpdated: new Date().toDateString(),
    updateType: 'credit',
    status: 'active',
  },
  {
    id: 4,
    type: 'Corporate',
    number: '2019030001',
    userId: 3,
    dateOpened: new Date().toDateString(),
    balance: 2000,
    lastUpdated: new Date().toDateString(),
    updateType: 'credit',
    status: 'active',
  },
];


const displayAccounts = () => {
  let accountList = '';

  bankAccounts.forEach((account) => {
    accountList += `<div class="user-div" id="${account.id}"> Account Type: ${account.type}
                        <span> Customer ID: ${account.userId} </span>
                        <span> Account Balance: ${account.balance} </span>
                        <span>Account No: ${account.number}</span>
                        <span>Last Transaction: ${account.updateType}<br>
                         - ${account.lastUpdated}</span>
                        <span>Account Status : ${account.status ? 'ACTIVE' : 'INACTIVE'}</span>
                        <button id="status-btn">View Account</button>
                    </div>`;
  });
  accountDisplay.innerHTML = accountList;
};

displayAccounts();
