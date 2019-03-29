console.log('Login');

const signupBtn = document.querySelector('.signup-btn');

// Redirect to Login Page

const goToSignup = () => {
    location.href = './signup.html';
}

signupBtn.addEventListener('click', goToSignup);