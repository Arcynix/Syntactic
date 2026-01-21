document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('otpForm');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    // Get email from URL
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    if (!email) {
        errorMessage.textContent = 'Invalid logic flow. Email missing.';
        errorMessage.style.display = 'block';
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            errorMessage.style.display = 'none';
            successMessage.style.display = 'none';

            const otp = document.getElementById('otp').value;

            try {
                const response = await fetch('/api/auth/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, otp })
                });

                const data = await response.json();

                if (response.ok) {
                    successMessage.textContent = 'Verification successful! Logging in...';
                    successMessage.style.display = 'block';

                    // Store Token (Auto Login)
                    localStorage.setItem('accessToken', data.token);
                    localStorage.setItem('user', JSON.stringify(data.data.user));

                    setTimeout(() => window.location.href = 'home.html', 1500);
                } else {
                    throw new Error(data.message || 'Verification failed');
                }
            } catch (error) {
                errorMessage.textContent = error.message;
                errorMessage.style.display = 'block';
            }
        });
    }

    const resendBtn = document.getElementById('resendBtn');
    if (resendBtn) {
        resendBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            errorMessage.style.display = 'none';
            successMessage.style.display = 'none';

            try {
                const response = await fetch('http://localhost:3000/api/auth/resend-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (response.ok) {
                    successMessage.textContent = 'Code resent! Check your email.';
                    successMessage.style.display = 'block';
                } else {
                    throw new Error(data.message || 'Failed to resend');
                }
            } catch (err) {
                errorMessage.textContent = err.message;
                errorMessage.style.display = 'block';
            }
        });
    }
});
