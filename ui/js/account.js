console.log('Specific Bank account displayed');

const accountDisplay = document.querySelector('.account');
const account = document.querySelector('.account-number');
const view = document.querySelector('.view');

console.log(account.value);

const bankAccounts = [
    {
        id: 1,
        type: 'Savings',
        number: '2019030002',
        userId: 2,
        dateOpened: new Date(),
        balance: 2000,
        lastUpdated: new Date(),
        updateType: 'credit',
        status: 'active',
    },
    {
        id: 2,
        type: 'Corporate',
        number: '2019030001',
        userId: 1,
        dateOpened: new Date(),
        balance: 30000,
        lastUpdated: new Date(),
        updateType: 'debit',
        status: 'active',
    },
    {
        id: 3,
        type: 'Savings',
        number: '2019030001',
        userId: 4,
        dateOpened: new Date(),
        balance: 12000,
        lastUpdated: new Date(),
        updateType: 'credit',
        status: 'active',
    },
    {
        id: 4,
        type: 'Corporate',
        number: '2019030001',
        userId: 3,
        dateOpened: new Date(),
        balance: 2000,
        lastUpdated: new Date(),
        updateType: 'credit',
        status: 'active',
    }
];


const viewAccount = () => {
    let accountList = '';

    let acct = bankAccounts.map(account => {
        if (account.number === account.number) {
            return account;
        }
    })
    console.log(acct);

        accountList = `<div class="user-div" id="${acct.id}"> Type: ${acct.type}
                        <p> Customer ID: ${acct.userId} </p>
                        <p> Balance: ${acct.balance} </p>
                        <p>Account No: ${acct.number}</p>
                        <p>Last Transaction: ${acct.updateType}<br>
                         - ${acct.lastUpdated}</p>
                        <p>Status : ${acct.status ? 'ACTIVE' : 'INACTIVE'}</p>
                        <button id="status-btn">View Account</button>
                    </div>`

    accountDisplay.innerHTML = accountList;
};

view.addEventListener('click', viewAccount);