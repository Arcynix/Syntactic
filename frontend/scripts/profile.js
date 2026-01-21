document.addEventListener('DOMContentLoaded', async () => {
    const nameEl = document.getElementById('profileName');
    const emailEl = document.getElementById('profileEmail');
    const joinedEl = document.getElementById('profileJoined');
    const avatarEl = document.getElementById('profileAvatar');

    const token = localStorage.getItem('accessToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        // Fetch User Data
        const response = await fetch('/api/users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Token expired
                localStorage.removeItem('accessToken');
                window.location.href = 'index.html';
            }
            throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        const user = data.data.profile;
        // Note: Structure depends on controller response. 
        // Usually it wraps in data: { user: ... } or data: { profile: ... }

        // Update UI
        // If profile exists (from user_profiles table join), use that. 
        // Fallback to basic user info.

        // Assuming the endpoint returns the combined object or simple user object if profile missing

        nameEl.textContent = (user.full_name || user.username || 'User');
        emailEl.textContent = user.email;
        avatarEl.textContent = (user.username || 'U').charAt(0).toUpperCase();

        if (user.created_at) {
            const date = new Date(user.created_at);
            joinedEl.textContent = 'Joined: ' + date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }

    } catch (error) {
        console.error('Profile load error:', error);
        nameEl.textContent = 'Error loading profile';
    }
});
