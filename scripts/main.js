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
function searchArticles(query) {
    // This would be expanded with actual search implementation
    console.log('Searching for:', query);
    // Future: implement client-side search or API call
}
