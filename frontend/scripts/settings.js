document.addEventListener('DOMContentLoaded', async () => {
    // Auth check
    const token = localStorage.getItem('accessToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    // Populate Fields
    try {
        const res = await fetch('http://localhost:3000/api/users/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        // Check if user object exists
        const user = data.data?.user;
        if (user) {
            document.getElementById('fullName').value = user.full_name || '';
            document.getElementById('bio').value = user.bio || '';
        }
    } catch (e) {
        console.error('Failed to load profile settings', e);
    }

    // Update Handler
    const form = document.getElementById('updateProfileForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const full_name = document.getElementById('fullName').value;
            const bio = document.getElementById('bio').value;
            const msg = document.getElementById('profileMsg');

            try {
                const res = await fetch('http://localhost:3000/api/users/profile', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ full_name, bio })
                });

                if (res.ok) {
                    msg.textContent = 'Profile updated successfully!';
                    msg.style.color = '#4a7c59';

                    // Update local storage user cache if name changed
                    // (Optional, triggers menu update on reload)
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (user) {
                        user.full_name = full_name; // Note: main.js uses user.username usually, but good practice
                        localStorage.setItem('user', JSON.stringify(user));
                    }
                } else {
                    throw new Error('Update failed');
                }
            } catch (e) {
                msg.textContent = 'Failed to update details. Try again.';
                msg.style.color = '#ff6b6b';
            }
        });
    }
});
