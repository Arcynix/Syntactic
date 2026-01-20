// Client-side Authentication Guard
(function () {
    console.log('Running Auth Check...');
    const token = localStorage.getItem('accessToken');

    // Simple check: exists
    if (!token) {
        console.warn('No access token found. Redirecting to login.');
        // Determine path to root (handles nested pages)
        const path = window.location.pathname;
        let rootPath = '';

        if (path.includes('/topics/') || path.includes('/articles/')) {
            rootPath = '../';
        }

        window.location.href = rootPath + 'index.html';
    } else {
        console.log('Authenticated.');
    }
})();

// Logout function (to be called by logout button)
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // Determine path to root
    const path = window.location.pathname;
    let rootPath = '';
    if (path.includes('/topics/') || path.includes('/articles/')) {
        rootPath = '../';
    }
    window.location.href = rootPath + 'index.html';
}
