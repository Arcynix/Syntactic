document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Reset error message
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const identifier = usernameInput.value;
            const password = passwordInput.value;

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include', // Important for cookies (refresh token)
                    body: JSON.stringify({ identifier, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Login successful
                    // Store the token (access token)
                    localStorage.setItem('accessToken', data.token);
                    localStorage.setItem('user', JSON.stringify(data.data.user));

                    // Redirect to home page
                    window.location.href = 'home.html';
                } else {
                    // Login failed
                    throw new Error(data.message || 'Login failed');
                }
            } catch (error) {
                console.error('Login error:', error);
                errorMessage.textContent = error.message || 'An error occurred during login. Please try again.';
                errorMessage.style.display = 'block';
            }
        });
    }
});
