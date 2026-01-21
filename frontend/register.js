document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Reset messages
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';
            successMessage.style.display = 'none';

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Basic Validation
            if (password !== confirmPassword) {
                errorMessage.textContent = 'Passwords do not match.';
                errorMessage.style.display = 'block';
                return;
            }

            if (password.length < 8) {
                errorMessage.textContent = 'Password must be at least 8 characters long.';
                errorMessage.style.display = 'block';
                return;
            }

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Registration successful - OTP sent
                    successMessage.textContent = 'Account created! Sending verification code...';
                    successMessage.style.display = 'block';

                    // Redirect after a short delay
                    setTimeout(() => {
                        window.location.href = `verify-otp.html?email=${encodeURIComponent(email)}`;
                    }, 1500);
                } else {
                    // Registration failed
                    throw new Error(data.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Registration error:', error);
                errorMessage.textContent = error.message || 'An error occurred during registration. Please try again.';
                errorMessage.style.display = 'block';
            }
        });
    }
});
