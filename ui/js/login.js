// eslint-disable-next-line no-console
console.log('Login');

// const signupBtn = document.querySelector('.signup-btn');
const loginBtn = document.querySelector('.login-btn');

// Redirect to Login Page

// const goToSignup = () => {
//   window.location.href = './signup.html';
// };

// localStorage.setItem('user', 'admin');

const LoggedIn = () => {
  const userStatus = localStorage.getItem('user');
  if (userStatus === 'admin') {
    localStorage.setItem('user', 'cashier');
    window.location.href = './staffuser.html';
  } else if (userStatus === 'cashier') {
    localStorage.setItem('user', 'client');
    window.location.href = './accounthistory.html';
  } else {
    localStorage.setItem('user', 'admin');
    window.location.href = './dashboard.html';
  }
};

// signupBtn.addEventListener('click', goToSignup);
loginBtn.addEventListener('click', LoggedIn);
