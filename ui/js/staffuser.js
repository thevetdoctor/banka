console.log('Staff User Account Creation');

const userForm = document.querySelector('form');
const firstName = document.querySelector('.firstname');
const lastName = document.querySelector('.lastname');
const Email = document.querySelector('.email');
const mobileNo = document.querySelector('.mobile');
const sex = document.querySelector('input[name = sex]:checked').value;
const createBtn = document.querySelector('.create-btn');
const staffUsers = document.querySelector('.staff-users');
const staffDisplay = document.querySelector('.staff-list');
const staffBtn = document.querySelector('.staff-btn');
const status = document.querySelector('.account-status');
const staffAccounts = JSON.parse(localStorage.getItem('staffList')) || [];

console.log(sex.value);

const displayStaff = () => {
    let staffUsers = '';

    staffAccounts.forEach(staff => {
        staffUsers += `<div class="user-div" id="${staff.id}"> Name: ${staff.firstname} ${staff.lastname}
                        <p> Email: ${staff.email} </p>
                        <p> Sex: ${staff.sex} </p>
                        <p> Mobile: ${staff.mobileNo} </p>
                        <p>Status : STAFF </p>
                        <button id="status-btn">Delete Staff Account</button>
                    </div>`;
    })
    staffDisplay.innerHTML = staffUsers;
};

displayStaff();


const createAccount = () => {
    let idArray = staffAccounts.map(staff => staff.id);
    let lastId = Math.max(idArray);
    let user = {
        id: lastId + 1,
        firstname: firstName.value,
        lastname: lastName.value,
        email: Email.value,
        mobileNo: mobileNo.value,
        sex: sex,
    }

    if (Object.values(user).includes('')) {
        console.log('incomplete');
        status.innerText = 'Incomplete details'
        setTimeout(() => {
            status.innerText = '';
        }, 2000);
        return;
    }
    createBtn.value = 'Account Created';

    staffAccounts.push(user);
    localStorage.setItem('staffList', JSON.stringify(staffAccounts));
    setTimeout(() => {
        createBtn.value = 'Create Account';
    }, 2000);

    console.log(staffAccounts);

}


createBtn.addEventListener('click', createAccount);

staffBtn.addEventListener('click', displayStaff);