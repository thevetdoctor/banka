console.log('Account Credit & Debit');

const creditBtn = document.getElementById('#credit-btn');
const debitBtn = document.getElementById('#debit-btn');
const credit = document.getElementById('#credit');
const debit = document.getElementById('#debit');

// credit.style.display = 'none';


const goToCredit = () => {
    debit.style.display = 'none';
    credit.style.display = 'block';
}

console.log(creditBtn);
console.log(debitBtn);
creditBtn.addEventListener('click', goToCredit);



const creditAccount = () => {
    console.log('Account credited');
}

const debitAccount = () => {
    console.log('Account debited');
}