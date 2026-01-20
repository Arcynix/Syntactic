document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resetPasswordForm');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        errorMessage.textContent = 'Invalid or missing reset token.';
        errorMessage.style.display = 'block';
        if (form) form.style.display = 'none';
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            errorMessage.style.display = 'none';
            successMessage.style.display = 'none';

            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                errorMessage.textContent = 'Passwords do not match.';
                errorMessage.style.display = 'block';
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/auth/reset-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, newPassword: password })
                });

                const data = await response.json();

                if (response.ok) {
                    successMessage.textContent = 'Password reset successful! Redirecting to login...';
                    successMessage.style.display = 'block';
                    form.reset();
                    setTimeout(() => window.location.href = 'index.html', 3000);
                } else {
                    throw new Error(data.message || 'Reset failed');
                }
            } catch (error) {
                errorMessage.textContent = error.message;
                errorMessage.style.display = 'block';
            }
        });
    }
});
