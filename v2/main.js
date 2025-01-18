// Initialize Lucide icons
lucide.createIcons();

console.log(navigator.platform)
console.log(window.location.href)
console.log(navigator.userAgent)

// Theme handling
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check system preference for dark mode
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.classList.toggle('dark', savedTheme === 'dark');
} else {
    html.classList.toggle('dark', prefersDark);
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update icons based on theme
    const sunIcon = themeToggle.querySelector('[data-lucide="sun"]');
    const moonIcon = themeToggle.querySelector('[data-lucide="moon"]');
    
    if (isDark) {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
});

// Initial icon state
const isDark = html.classList.contains('dark');
const sunIcon = themeToggle.querySelector('[data-lucide="sun"]');
const moonIcon = themeToggle.querySelector('[data-lucide="moon"]');
if (isDark) {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
} else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

// FAQ data
const faqs = [
    {
        question: "How does PaywallFree work?",
        answer: "PaywallFree uses advanced bypass techniques to access content behind paywalls, allowing you to read premium articles freely. Each mode employs a different method, ensuring maximum compatibility across various news websites."
    },
    {
        question: "What are the different bypass modes?",
        answer: "We offer 5 different modes, each optimized for specific types of paywalls. If one mode doesn't work, you can try another as effectiveness varies by website. Our multiple-mode approach ensures the highest success rate for accessing premium content."
    },
    {
        question: "Which news websites are supported?",
        answer: "PaywallFree works with most major news and content websites including The New York Times, Wall Street Journal, Washington Post, Bloomberg, Financial Times, and many other premium publishers. Our tool is regularly updated to maintain compatibility."
    },
    {
        question: "Is PaywallFree free to use?",
        answer: "Yes, PaywallFree is completely free to use. We believe in making information accessible to everyone. There are no hidden fees or subscription requirements to use our paywall removal tool."
    },
    {
        question: "Why isn't it working for some articles?",
        answer: "News websites frequently update their paywall systems. If one mode doesn't work, try another mode as different techniques work better for different sites. We continuously update our methods to maintain effectiveness and bypass new paywall systems."
    }
];

// Populate FAQ section
const faqContainer = document.getElementById('faqContainer');
faqs.forEach(faq => {
    const article = document.createElement('article');
    article.className = 'bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg transition-all hover:shadow-xl';
    article.innerHTML = `
        <h3 class="text-xl font-bold mb-3">${faq.question}</h3>
        <p class="text-gray-700 dark:text-gray-300">${faq.answer}</p>
    `;
    faqContainer.appendChild(article);
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();