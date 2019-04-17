console.log('User activation');

const userDisplay = document.querySelector('.users');


const userAccounts = JSON.parse(localStorage.getItem('accounts')) || [
    {
        userId: 1,
        username: 'Akinwumi Ambode',
        email: 'aambode@lagos.gov.ng',
        sex: 'M',
        mobile: '08001234567',
        accountNo: '201903001',
        dateOpened: new Date().toDateString(),
        active: true,
    },
    {
        userId: 2,
        username: 'Seyi Makinde',
        email: 'smakinde@oyo.gov.ng',
        sex: 'M',
        mobile: '08011234567',
        accountNo: '201903002',
        dateOpened: new Date().toDateString(),
        active: true,
    },
    {
        userId: 3,
        username: 'Ifeanyi Okowa',
        email: 'iokowa@delta.gov.ng',
        sex: 'M',
        mobile: '08021234567',
        accountNo: '201903003',
        dateOpened: new Date().toDateString(),
        active: true,
    },
    {
        userId: 4,
        username: 'Ibikunle Amosun',
        email: 'iamosun@ogun.gov.ng',
        sex: 'M',
        mobile: '08031234567',
        accountNo: '201903004',
        dateOpened: new Date().toDateString(),
        active: true,
    },
    {
        userId: 5,
        username: 'Kayode Fayemi',
        email: 'kfayemi@ekiti.gov.ng',
        sex: 'M',
        mobile: '08041234567',
        accountNo: '201903005',
        dateOpened: new Date().toDateString(),
        active: true,
    }
];

// let userList = '';

const displayUsers = () => {
    let userList = '';

userAccounts.forEach(user => {
        userList += `<div class="user-div" id="${user.userId}"> Name: ${user.username}
                        <p> Email: ${user.email} </p>
                        <p> Mobile: ${user.mobile} </p>
                        <p>Account No: ${user.accountNo}</p>
                        <p>Status : ${user.active ? 'ACTIVE' : 'INACTIVE'}</p>
                        <button id="status-btn">Change Status</button>
                    </div>`;
})
    userDisplay.innerHTML = userList;
};

displayUsers();


const getId = (e) => {
    if (!e) {
        e = window.event;
    }
};

const changeStatus = (e) => {
    getId(e);
    e = e.target;
    let id = e.parentNode.getAttribute('id');
    if (e.getAttribute('id') !== 'status-btn') {
        return;
    } else {
        // console.log(id);
        userAccounts.forEach(user => {
            if (user.userId === parseInt(id, 10)) {
                user.active = !user.active;
            }
            return user;
        });
        localStorage.setItem('accounts', JSON.stringify(userAccounts));
        // console.log(userAccounts);
        // console.log('Status changed');
        displayUsers();
    }

}


userDisplay.addEventListener('click', changeStatus);
// userDisplay.addEventListener('change', changeStatus);
