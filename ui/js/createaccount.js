/* eslint-disable no-console */
console.log('Creating Bank Account');

const accountType = document.querySelector('.account-type');
const getAccountBtn = document.querySelector('.get-account');


const response = () => {
  // eslint-disable-next-line no-alert
  alert(`Click OK to confirm creating a new ${accountType.value} account`);
  console.log(accountType.value);
};

getAccountBtn.addEventListener('click', response);
