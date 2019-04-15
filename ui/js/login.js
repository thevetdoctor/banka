// eslint-disable-next-line no-console
console.log('Login');

const signupBtn = document.querySelector('.signup-btn');

// Redirect to Login Page

const goToSignup = () => {
  window.location.href = './signup.html';
};

signupBtn.addEventListener('click', goToSignup);
