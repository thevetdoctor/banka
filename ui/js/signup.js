// eslint-disable-next-line no-console
console.log('Signup');

const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
// Redirect to Login Page

const goToLogin = () => {
  window.location.href = './login.html';
};


const signUp = () => {
  window.location.href = './dashboard.html';
};


loginBtn.addEventListener('click', goToLogin);

signupBtn.addEventListener('click', signUp);
