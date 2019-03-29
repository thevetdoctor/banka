console.log('Signup');

const loginBtn = document.querySelector('.login-btn');

// Redirect to Login Page

const goToLogin = () => {
    location.href = './login.html';
}

loginBtn.addEventListener('click', goToLogin);