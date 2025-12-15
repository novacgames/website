// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll for anchor links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(22, 219, 147, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Crypto Modal
const modal = document.getElementById('cryptoModal');
const cryptoBtn = document.querySelector('.crypto-btn');
const closeBtn = document.querySelector('.close');

cryptoBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Copy to clipboard functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const address = btn.getAttribute('data-address');
        navigator.clipboard.writeText(address).then(() => {
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'linear-gradient(135deg, #16db93 0%, #8b5cf6 100%)';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy address');
        });
    });
});

// Animate stats counter
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target === Infinity ? '∞' : target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
};

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach((num, index) => {
                if (num.textContent === '∞') {
                    // Skip animation for infinity
                } else {
                    const target = parseInt(num.textContent);
                    animateCounter(num, target);
                }
            });
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Add glowing cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Add custom cursor styles
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 10px;
        height: 10px;
        background: var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s;
        transform: translate(-50%, -50%);
    }
    
    .cursor-glow {
        width: 40px;
        height: 40px;
        background: var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.1;
        filter: blur(20px);
        transform: translate(-50%, -50%);
        transition: transform 0.2s;
    }
    
    @media (max-width: 768px) {
        .custom-cursor, .cursor-glow {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .game-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Random floating particles
const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 5 + 2}px;
        height: ${Math.random() * 5 + 2}px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        opacity: ${Math.random() * 0.5 + 0.2};
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 20000);
};

// Create particles periodically
setInterval(createParticle, 2000);
for (let i = 0; i < 10; i++) {
    setTimeout(createParticle, i * 200);
}

// Console Easter Egg
console.log(`
%c
 ███╗   ██╗ ██████╗ ██╗   ██╗ █████╗  ██████╗
 ████╗  ██║██╔═══██╗██║   ██║██╔══██╗██╔════╝
 ██╔██╗ ██║██║   ██║██║   ██║███████║██║     
 ██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║██║     
 ██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║╚██████╗
 ╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝ ╚═════╝
                                              
  ██████╗  █████╗ ███╗   ███╗███████╗███████╗
 ██╔════╝ ██╔══██╗████╗ ████║██╔════╝██╔════╝
 ██║  ███╗███████║██╔████╔██║█████╗  ███████╗
 ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║
 ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗███████║
  ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝
  
%c🎮 Welcome to NoVac Games! 🎮
%cCreating Fresh & Different Gaming Experiences
%c
Interested in our work? Check out:
→ Website: https://novacgames.ct.ws
→ itch.io: https://novac-games.itch.io
→ YouTube: https://www.youtube.com/@NoVacGames

Made with 💚 by Vacation & Novac
`, 
    'color: #16db93; font-weight: bold;',
    'color: #8b5cf6; font-size: 20px; font-weight: bold;',
    'color: #16db93; font-size: 14px;',
    'color: #a0a0a0; font-size: 12px;'
);

// Performance optimization - Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        console.log('%c🎉 KONAMI CODE ACTIVATED! 🎉', 'color: #16db93; font-size: 24px; font-weight: bold;');
    }
});