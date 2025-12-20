// Main JavaScript for Syntactic

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
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
});

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

    try {
        const response = await fetch(`${rootPath}data/articles.json`);
        const articles = await response.json();

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
    } catch (error) {
        console.error('Error loading search data:', error);
    }
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
