document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgotPasswordForm');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            errorMessage.style.display = 'none';
            successMessage.style.display = 'none';

            const email = document.getElementById('email').value;

            try {
                const response = await fetch('http://localhost:3000/api/auth/request-reset', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (response.ok) {
                    successMessage.textContent = data.message || 'If an account exists, a reset link has been sent.';
                    successMessage.style.display = 'block';
                    form.reset();
                } else {
                    throw new Error(data.message || 'Something went wrong');
                }
            } catch (error) {
                errorMessage.textContent = error.message;
                errorMessage.style.display = 'block';
            }
        });
    }
});
