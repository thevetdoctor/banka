console.log('Specific Bank account displayed');

const accountDisplay = document.querySelector('.account');
const accountInput = document.querySelector('.account-number');
const viewBtn = document.querySelector('.view');

console.log(accountInput.value);

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
        number: '2019030003',
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
        number: '2019030004',
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

    let acct = bankAccounts.find(account =>  account.number === accountInput.value)
    console.log(acct);
    if (acct === undefined) {
        accountDisplay.innerHTML = `<div>Account does not exist!</div>`;
        return;
    }

        accountHtml = `<div class="user-div" id="${acct.id}"> Type: ${acct.type}
                        <p> Customer ID: ${acct.userId} </p>
                        <p> Balance: ${acct.balance} </p>
                        <p>Account No: ${acct.number}</p>
                        <p>Last Transaction: ${acct.updateType}<br>
                         - ${acct.lastUpdated}</p>
                        <p>Status : ${acct.status ? 'ACTIVE' : 'INACTIVE'}</p>
                        <button id="status-btn">View Account</button>
                        <button id="delete-btn">Delete Account</button>
                    </div>`

    accountDisplay.innerHTML = accountHtml;
};

viewBtn.addEventListener('click', viewAccount);
// accountInput.addEventListener('blur', viewAccount);