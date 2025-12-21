// Main JavaScript for Syntactic

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Auto-generate Table of Contents
    generateTableOfContents();

    // Code Copy Buttons
    initializeCopyButtons();

    // Highlight active TOC item on scroll
    highlightTOCOnScroll();

    // Initialize Rich Navigation
    initializeNavigation();
});

// Dynamic Navigation Injection
function initializeNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    // Determine project root relative to current page
    const currentPath = window.location.pathname;
    const isTopicPage = currentPath.includes('/topics/');
    const isArticlePage = currentPath.includes('/articles/');
    const isRootHome = currentPath.endsWith('home.html') || currentPath.endsWith('/');
    const rootPath = (isTopicPage || isArticlePage) ? '../' : '';

    const menuContent = `
        <!-- Desktop/Common Navigation -->
        <div class="nav-item has-dropdown">
            <a href="${rootPath}articles.html" class="nav-link">Articles</a>
            <div class="mega-dropdown">
                <div class="dropdown-content">
                    <div class="dropdown-column">
                        <h4>Popular Articles</h4>
                        <a href="${rootPath}articles/python.html">Python</a>
                        <a href="${rootPath}articles/javascript.html">JavaScript</a>
                        <a href="${rootPath}articles/react.html">React</a>
                        <a href="${rootPath}articles/sql.html">SQL</a>
                    </div>
                    <div class="dropdown-column">
                        <h4>Core Concepts</h4>
                        <a href="${rootPath}articles/data-structures.html">Data Structures</a>
                        <a href="${rootPath}articles/design-patterns.html">Design Patterns</a>
                        <a href="${rootPath}articles/clean-code.html">Clean Code</a>
                        <a href="${rootPath}articles/rest-api.html">APIs</a>
                    </div>
                    <div class="dropdown-column">
                        <h4>Operations</h4>
                        <a href="${rootPath}articles/git.html">Git</a>
                        <a href="${rootPath}articles/docker.html">Docker</a>
                        <a href="${rootPath}articles/kubernetes.html">K8s</a>
                        <a href="${rootPath}articles/unit-testing.html">Testing</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="nav-item has-dropdown">
            <a href="${rootPath}topics.html" class="nav-link">Topics</a>
            <div class="mega-dropdown">
                <div class="dropdown-content">
                    <div class="dropdown-column">
                        <h4>Development</h4>
                        <a href="${rootPath}topics/web-development.html">Web Development</a>
                        <a href="${rootPath}topics/frontend.html">Frontend</a>
                        <a href="${rootPath}topics/backend.html">Backend</a>
                        <a href="${rootPath}topics/mobile.html">Mobile App Dev</a>
                    </div>
                    <div class="dropdown-column">
                        <h4>Infrastructure</h4>
                        <a href="${rootPath}topics/cloud.html">Cloud Computing</a>
                        <a href="${rootPath}topics/devops.html">DevOps</a>
                        <a href="${rootPath}topics/databases.html">Databases</a>
                        <a href="${rootPath}topics/security.html">Security</a>
                    </div>
                    <div class="dropdown-column">
                        <h4>Cutting Edge</h4>
                        <a href="${rootPath}topics/ai-ml.html">AI & ML</a>
                        <a href="${rootPath}topics/data-science.html">Data Science</a>
                        <a href="${rootPath}topics/blockchain.html">Blockchain</a>
                        <a href="${rootPath}topics/game-development.html">Game Dev</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="nav-item">
            <a href="${rootPath}community.html" class="nav-link">Community</a>
        </div>

        <!-- Mobile-Only Sidebar Sections (Hidden on Desktop via CSS) -->
        <div class="mobile-only-overlay">
            <div class="menu-section main-links">
                <a href="${rootPath}home.html">Home</a>
                <a href="${rootPath}articles.html">Articles</a>
                <a href="${rootPath}topics.html">Topics</a>
                <a href="${rootPath}community.html">Community</a>
            </div>

            <div class="menu-section">
                <h4 class="menu-section-title">Explore Topics</h4>
                <div class="menu-grid">
                    <a href="${rootPath}topics/web-development.html">Web Dev</a>
                    <a href="${rootPath}topics/backend.html">Backend</a>
                    <a href="${rootPath}topics/frontend.html">Frontend</a>
                    <a href="${rootPath}topics/ai-ml.html">AI & ML</a>
                    <a href="${rootPath}topics/cloud.html">Cloud</a>
                    <a href="${rootPath}topics/security.html">Security</a>
                    <a href="${rootPath}topics/databases.html">Databases</a>
                    <a href="${rootPath}topics/devops.html">DevOps</a>
                    <a href="${rootPath}topics/data-science.html">Data Science</a>
                    <a href="${rootPath}topics/blockchain.html">Blockchain</a>
                    <a href="${rootPath}topics/game-development.html">Game Dev</a>
                    <a href="${rootPath}topics/mobile.html">Mobile</a>
                </div>
            </div>

            <div class="menu-section">
                <h4 class="menu-section-title">Popular Guides</h4>
                <div class="menu-grid">
                    <a href="${rootPath}articles/python.html">Python</a>
                    <a href="${rootPath}articles/javascript.html">JavaScript</a>
                    <a href="${rootPath}articles/react.html">React</a>
                    <a href="${rootPath}articles/sql.html">SQL</a>
                    <a href="${rootPath}articles/git.html">Git</a>
                    <a href="${rootPath}articles/docker.html">Docker</a>
                    <a href="${rootPath}articles/kubernetes.html">K8s</a>
                    <a href="${rootPath}articles/rust.html">Rust</a>
                </div>
            </div>
        </div>

        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    navMenu.innerHTML = menuContent;

    // Re-attach hamburger listener since we just replaced the element
    const hamburger = navMenu.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Generate Table of Contents from h2 and h3 headings
function generateTableOfContents() {
    const tocList = document.querySelector('.toc-list');
    const articleContent = document.querySelector('.article-content');

    if (!tocList || !articleContent) return;

    const headings = articleContent.querySelectorAll('h2, h3');
    tocList.innerHTML = '';

    headings.forEach((heading, index) => {
        // Add ID to heading if it doesn't have one
        if (!heading.id) {
            heading.id = `section-${index}`;
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;

        if (heading.tagName === 'H3') {
            li.style.paddingLeft = '15px';
            a.style.fontSize = '0.85rem';
        }

        li.appendChild(a);
        tocList.appendChild(li);
    });
}

// Initialize copy buttons for code blocks
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const codeBlock = this.closest('.code-block');
            const code = codeBlock.querySelector('code');

            navigator.clipboard.writeText(code.textContent).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
}

// Highlight active TOC item based on scroll position
function highlightTOCOnScroll() {
    const tocLinks = document.querySelectorAll('.toc-list a');
    if (tocLinks.length === 0) return;

    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.article-content h2, .article-content h3');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const scrollPos = window.pageYOffset + 100;

            if (scrollPos >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Simple Search Functionality
async function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-box input');
    if (searchInputs.length === 0) return;

    // Determine project root relative to current page
    const currentPath = window.location.pathname;
    const isTopicPage = currentPath.includes('/topics/');
    const isArticlePage = currentPath.includes('/articles/');
    const rootPath = (isTopicPage || isArticlePage) ? '../' : '';

    let articles = [];

    try {
        // Try fetching JSON first
        const response = await fetch(`${rootPath}data/articles.json`);
        articles = await response.json();
    } catch (error) {
        console.warn('Fetch failed, attempting to load articles.js fallback:', error);
        // Fallback for local file access (CORS)
        try {
            articles = await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = `${rootPath}data/articles.js`;
                script.onload = () => resolve(window.articleData);
                script.onerror = () => reject(new Error('Failed to load fallback script'));
                document.head.appendChild(script);
            });
        } catch (fallbackError) {
            console.error('All search data loading methods failed:', fallbackError);
            return;
        }
    }

    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                hideSearchResults();
                return;
            }
            const results = articles.filter(article =>
                article.title.toLowerCase().includes(query) ||
                article.description.toLowerCase().includes(query) ||
                article.tags.some(tag => tag.toLowerCase().includes(query))
            );
            showSearchResults(results, input, rootPath);
        });

        // Hide results when clicking outside
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !document.querySelector('.search-results-dropdown')?.contains(e.target)) {
                hideSearchResults();
            }
        });
    });
}

function showSearchResults(results, input, rootPath) {
    let resultsContainer = document.querySelector('.search-results-dropdown');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-dropdown';
        input.parentElement.appendChild(resultsContainer);
    }

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="search-no-results">No articles found</div>';
    } else {
        resultsContainer.innerHTML = results.map(result => `
            <a href="${rootPath}${result.url}" class="search-result-item">
                <div class="result-title">${result.title}</div>
                <div class="result-desc">${result.description}</div>
            </a>
        `).join('');
    }
    resultsContainer.style.display = 'block';
}

function hideSearchResults() {
    const resultsContainer = document.querySelector('.search-results-dropdown');
    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
}

// Call initializeSearch on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeSearch);
