/* ═══════════════════════════════════════════
   VSG Portfolio — script.js
   ═══════════════════════════════════════════ */

/* ── Typewriter ── */
const roles = [
    'Embedded Systems Engineer',
    'Rust Developer',
    'IoT Architect',
    'Linux Hacker',
    'Firmware Engineer',
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
    const current = roles[roleIndex];
    if (!typeEl) return;

    if (!deleting) {
        typeEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            setTimeout(() => { deleting = true; }, 2200);
            setTimeout(type, 2400);
            return;
        }
    } else {
        typeEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(type, deleting ? 50 : 85);
}

/* ── Hero name reveal (character by character) ── */
const heroNameEl = document.getElementById('heroName');
const fullName = 'Vaishnav Sabari Girish';
let nameIndex = 0;

function revealName() {
    if (!heroNameEl) return;
    if (nameIndex <= fullName.length) {
        heroNameEl.textContent = fullName.slice(0, nameIndex);
        nameIndex++;
        setTimeout(revealName, 55);
    } else {
        // start typewriter after name is revealed
        setTimeout(type, 300);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(revealName, 400);
});

/* ── Navbar ── */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
    menuToggle.classList.toggle('active');
});

// Close on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('open');
        menuToggle?.classList.remove('active');
    });
});

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(sec => {
        const top = sec.offsetTop - 80;
        const bottom = top + sec.offsetHeight;
        const id = sec.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (scrollY >= top && scrollY < bottom) {
            navLinks.forEach(l => l.classList.remove('active'));
            link?.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-child');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.classList.contains('reveal-child')
                ? Array.from(el.parentElement?.children || []).indexOf(el) * 80
                : 0;
            setTimeout(() => el.classList.add('visible'), delay);
            revealObserver.unobserve(el);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Counter animation ── */
function animateCount(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1200;
    const start = performance.now();
    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    }
    requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
statNums.forEach(el => counterObserver.observe(el));

/* ── Copy button ── */
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-copy');
        navigator.clipboard?.writeText(text).then(() => {
            const orig = btn.innerHTML;
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            btn.style.color = 'var(--green)';
            setTimeout(() => {
                btn.innerHTML = orig;
                btn.style.color = '';
            }, 1500);
        });
    });
});

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* ── Navbar scroll style ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
}, { passive: true });

/* ── CRT random flicker (subtle) ── */
const crtFlicker = document.querySelector('.crt-flicker');
setInterval(() => {
    if (Math.random() < 0.03 && crtFlicker) {
        crtFlicker.style.opacity = '0.06';
        setTimeout(() => { crtFlicker.style.opacity = ''; }, 60);
    }
}, 200);

/* ── Status text cycle ── */
const statusMessages = ['ONLINE', 'READY', 'AVAILABLE', 'SYS:OK'];
let statusIdx = 0;
const statusEl = document.getElementById('statusText');
setInterval(() => {
    if (!statusEl) return;
    statusIdx = (statusIdx + 1) % statusMessages.length;
    statusEl.style.opacity = '0';
    setTimeout(() => {
        statusEl.textContent = statusMessages[statusIdx];
        statusEl.style.opacity = '1';
    }, 200);
}, 4000);

/* ── Skill tag hover stagger ── */
document.querySelectorAll('.skills-category').forEach(cat => {
    const tags = cat.querySelectorAll('.stag');
    tags.forEach((tag, i) => {
        tag.style.transitionDelay = `${i * 30}ms`;
    });
});
