/* ==========================================
   SPACE TERMINAL JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the terminal system
    initializeTerminal();
});

/* ==========================================
   TERMINAL INITIALIZATION
   ========================================== */

function initializeTerminal() {
    // Initialize navigation system
    initNavigation();
    
    // Start system uptime counter
    startUptime();
    
    // Initialize command buttons
    initCommandButtons();
    
    // Initialize typing effects
    initTypingEffects();
    
    // Initialize terminal interactions
    initTerminalInteractions();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Add terminal sounds (optional)
    initSoundEffects();
    
    // Show boot sequence
    showBootSequence();
}

/* ==========================================
   NAVIGATION SYSTEM
   ========================================== */

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link and corresponding section
            this.classList.add('active');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                
                // Add terminal command simulation
                simulateCommand(targetSection);
                
                // Smooth scroll to top of content
                document.querySelector('.terminal-content').scrollTop = 0;
            }
        });
    });
}

/* ==========================================
   COMMAND SIMULATION
   ========================================== */

function simulateCommand(section) {
    const commands = {
        'home': 'cd ~/ && whoami',
        'about': 'cat about.md',
        'skills': 'ls -la /skills/',
        'projects': 'ls -la /projects/',
        'contact': 'cat /etc/contact.conf'
    };
    
    const sectionElement = document.getElementById(section);
    const outputLine = sectionElement.querySelector('.output-line');
    
    if (outputLine) {
        const commandElement = outputLine.querySelector('.command');
        if (commandElement) {
            // Clear current command
            commandElement.textContent = '';
            
            // Type new command
            const command = commands[section] || section;
            typeText(commandElement, command, 50);
        }
    }
}

/* ==========================================
   UPTIME COUNTER
   ========================================== */

function startUptime() {
    const uptimeElement = document.getElementById('uptime');
    if (!uptimeElement) return;
    
    const startTime = Date.now();
    
    function updateUptime() {
        const now = Date.now();
        const diff = now - startTime;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const timeString = 
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
        
        uptimeElement.textContent = timeString;
    }
    
    // Update immediately and then every second
    updateUptime();
    setInterval(updateUptime, 1000);
}

/* ==========================================
   COMMAND BUTTONS
   ========================================== */

function initCommandButtons() {
    const buttons = document.querySelectorAll('.terminal-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const command = this.getAttribute('data-command');
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 100);
            
            // Execute command
            executeCommand(command);
        });
    });
}

function executeCommand(command) {
    switch(command) {
        case 'view-projects':
            // Switch to projects section
            const projectsLink = document.querySelector('[data-section="projects"]');
            if (projectsLink) projectsLink.click();
            break;
            
        case 'download-resume':
            // Open resume in new tab
            window.open('https://vaishnav.world/Resume/VaishnavSabariGirish_Resume.pdf', '_blank');
            showTerminalMessage('Resume download initiated...');
            break;
            
        case 'contact-me':
            // Switch to contact section
            const contactLink = document.querySelector('[data-section="contact"]');
            if (contactLink) contactLink.click();
            break;
            
        default:
            showTerminalMessage(`Command '${command}' executed.`);
    }
}

/* ==========================================
   TYPING EFFECTS
   ========================================== */

function initTypingEffects() {
    // Initialize any typing animations that need to be restarted
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        // Add typing animation class after a delay
        setTimeout(() => {
            element.classList.add('typing-active');
        }, 1000);
    });
}

function typeText(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, speed);
}

/* ==========================================
   TERMINAL INTERACTIONS
   ========================================== */

function initTerminalInteractions() {
    // Add click effects to terminal buttons
    const terminalButtons = document.querySelectorAll('.btn');
    
    terminalButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simulate terminal window actions
            if (this.classList.contains('close')) {
                showTerminalMessage('Connection terminated by user.');
                setTimeout(() => {
                    showTerminalMessage('Attempting to reconnect...');
                    setTimeout(() => {
                        showTerminalMessage('Connection restored.');
                    }, 1000);
                }, 500);
            } else if (this.classList.contains('minimize')) {
                showTerminalMessage('Terminal minimized to background.');
            } else if (this.classList.contains('maximize')) {
                toggleFullscreen();
            }
        });
    });
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.2)';
        });
    });
    
    // Add interactive effects to contact links
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 200);
            }
        });
    });
}

/* ==========================================
   SCROLL EFFECTS
   ========================================== */

function initScrollEffects() {
    // Add scroll-based animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                } else if (entry.target.classList.contains('skill-category')) {
                    animateSkillCategory(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animations
    document.querySelectorAll('.project-card, .skill-category, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

/* ==========================================
   ANIMATION FUNCTIONS
   ========================================== */

function animateProjectCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

function animateSkillCategory(category) {
    const items = category.querySelectorAll('.skill-item');
    
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50);
        }, index * 100);
    });
}

/* ==========================================
   TERMINAL MESSAGES
   ========================================== */

function showTerminalMessage(message) {
    // Create a temporary message element
    const messageElement = document.createElement('div');
    messageElement.className = 'terminal-message';
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        border: 1px solid var(--text-primary);
        color: var(--text-primary);
        padding: 12px 16px;
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 14px;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
    `;
    
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
    
    // Animate in
    setTimeout(() => {
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 300);
    }, 3000);
}

/* ==========================================
   FULLSCREEN TOGGLE
   ========================================== */

function toggleFullscreen() {
    const container = document.querySelector('.terminal-container');
    
    if (!document.fullscreenElement) {
        container.requestFullscreen().then(() => {
            showTerminalMessage('Entered fullscreen mode.');
        }).catch(err => {
            showTerminalMessage('Fullscreen not supported.');
        });
    } else {
        document.exitFullscreen().then(() => {
            showTerminalMessage('Exited fullscreen mode.');
        });
    }
}

/* ==========================================
   BOOT SEQUENCE
   ========================================== */

function showBootSequence() {
    const bootMessages = [
        'INITIALIZING SPACE TERMINAL...',
        'LOADING SYSTEM MODULES...',
        'CONNECTING TO ORBITAL NETWORK...',
        'AUTHENTICATION SUCCESSFUL',
        'WELCOME TO SPACE TERMINAL v2.1.0',
        'ALL SYSTEMS OPERATIONAL'
    ];
    
    // Only show boot sequence on first load
    if (sessionStorage.getItem('bootShown')) {
        return;
    }
    
    const bootOverlay = document.createElement('div');
    bootOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-terminal);
        color: var(--text-primary);
        font-family: var(--font-mono);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    const bootText = document.createElement('div');
    bootText.style.cssText = `
        font-size: 18px;
        text-align: center;
        line-height: 1.5;
    `;
    
    bootOverlay.appendChild(bootText);
    document.body.appendChild(bootOverlay);
    
    let messageIndex = 0;
    
    function showNextMessage() {
        if (messageIndex < bootMessages.length) {
            bootText.textContent = bootMessages[messageIndex];
            messageIndex++;
            setTimeout(showNextMessage, 800);
        } else {
            // Boot sequence complete
            setTimeout(() => {
                bootOverlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(bootOverlay);
                }, 500);
            }, 1000);
            
            sessionStorage.setItem('bootShown', 'true');
        }
    }
    
    showNextMessage();
}

/* ==========================================
   SOUND EFFECTS (OPTIONAL)
   ========================================== */

function initSoundEffects() {
    // Create audio context for terminal sounds (optional)
    let audioContext;
    
    function createBeep(frequency = 800, duration = 100) {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }
    
    // Add sound to interactions (enable with user permission)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link') || 
            e.target.classList.contains('terminal-btn')) {
            // createBeep(600, 50); // Uncomment to enable sounds
        }
    });
}

/* ==========================================
   KEYBOARD SHORTCUTS
   ========================================== */

document.addEventListener('keydown', function(e) {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.querySelector('[data-section="home"]').click();
                break;
            case '2':
                e.preventDefault();
                document.querySelector('[data-section="about"]').click();
                break;
            case '3':
                e.preventDefault();
                document.querySelector('[data-section="skills"]').click();
                break;
            case '4':
                e.preventDefault();
                document.querySelector('[data-section="projects"]').click();
                break;
            case '5':
                e.preventDefault();
                document.querySelector('[data-section="contact"]').click();
                break;
        }
    }
    
    // ESC key to go home
    if (e.key === 'Escape') {
        document.querySelector('[data-section="home"]').click();
    }
});

/* ==========================================
   PERFORMANCE OPTIMIZATION
   ========================================== */

// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize animations for performance
if ('requestIdleCallback' in window) {
    requestIdleCallback(function() {
        // Initialize non-critical animations when browser is idle
        initSecondaryAnimations();
    });
} else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(initSecondaryAnimations, 1000);
}

function initSecondaryAnimations() {
    // Add any secondary animations that don't need immediate initialization
    const elements = document.querySelectorAll('.project-card, .skill-category');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

/* ==========================================
   ERROR HANDLING
   ========================================== */

window.addEventListener('error', function(e) {
    console.error('Terminal Error:', e.error);
    showTerminalMessage('System error detected. Self-diagnostics running...');
});

// Service worker registration (optional, for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

/* ==========================================
   EXPORT FOR TESTING
   ========================================== */

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        typeText,
        showTerminalMessage,
        executeCommand
    };
}
