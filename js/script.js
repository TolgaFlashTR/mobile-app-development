// Fix dark mode functionality
document.addEventListener('DOMContentLoaded', function() {
    // Force initial theme setting on the html element
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Enhanced Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      // Update toggle position based on current theme
      const toggleBall = document.querySelector('.toggle-ball');
      if (savedTheme === 'dark' && toggleBall) {
        toggleBall.style.transform = 'translateX(40px)';
      } else if (toggleBall) {
        toggleBall.style.transform = 'translateX(0)';
      }
      
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update HTML attribute
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update toggle ball position
        if (toggleBall) {
          if (newTheme === 'dark') {
            toggleBall.style.transform = 'translateX(40px)';
          } else {
            toggleBall.style.transform = 'translateX(0)';
          }
        }
        
        console.log('Theme changed to:', newTheme); // Debug log
      });
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    if(menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
      });
    }
    
    // Initialize Particles.js
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
      if (typeof particlesJS === 'function') {
        particlesJS('particles-js', {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#00f7ff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#00f7ff',
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: true,
              out_mode: 'out'
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: true, mode: 'grab' },
              onclick: { enable: true, mode: 'push' },
              resize: true
            },
            modes: {
              grab: { distance: 140, line_linked: { opacity: 1 } },
              push: { particles_nb: 4 }
            }
          },
          retina_detect: true
        });
      } else {
        console.error('particlesJS is not a function. Make sure particles.js library is loaded.');
      }
    }
    
    // Initialize Code Highlighting - updated to use modern method and handle security concerns
    if (typeof hljs !== 'undefined') {
      document.querySelectorAll('pre code').forEach((el) => {
        // Sanitize code content before highlighting
        el.textContent = el.textContent;
        if (hljs.highlightElement) {
          hljs.highlightElement(el);
        } else {
          console.warn('Using deprecated highlightBlock method. Update highlight.js to version 11+');
          hljs.highlightBlock(el);
        }
      });
    } else {
      console.warn('highlight.js library is not loaded. Code highlighting will not be available.');
    }
    
    // Initialize clipboard functionality
    if (typeof ClipboardJS !== 'undefined') {
        const clipboard = new ClipboardJS('.copy-btn');
        
        clipboard.on('success', function(e) {
            const button = e.trigger;
            button.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(function() {
                button.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
            
            e.clearSelection();
        });
        
        clipboard.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });
    } else {
        console.error('ClipboardJS is not loaded properly');
    }
    
    // Enhanced Clipboard.js initialization with feedback
    const clipboard = new ClipboardJS('.copy-btn');
    
    clipboard.on('success', function(e) {
      const originalText = e.trigger.innerHTML;
      const commandCard = e.trigger.closest('.command-card');
      
      // Visual feedback for copy
      e.trigger.innerHTML = '<i class="fas fa-check"></i>';
      commandCard.classList.add('highlight-card');
      
      // Reset after animation
      setTimeout(() => {
        e.trigger.innerHTML = originalText;
        commandCard.classList.remove('highlight-card');
      }, 2000);
      
      e.clearSelection();
    });
    
    clipboard.on('error', function(e) {
      const commandCard = e.trigger.closest('.command-card');
      commandCard.classList.add('error');
      
      setTimeout(() => {
        commandCard.classList.remove('error');
      }, 2000);
    });
    
    // Card flipping effect
    document.querySelectorAll('.flip-card').forEach(card => {
      card.addEventListener('click', function() {
        this.classList.toggle('flipped');
      });
    });
  });


  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const categoryToggle = document.querySelector('.category-toggle');
    const notesToc = document.querySelector('.notes-toc');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Add toggle functionality for categories
    if (categoryToggle && notesToc) {
        // On mobile, start with collapsed categories
        if (window.innerWidth <= 992) {
            notesToc.classList.remove('active');
        } else {
            notesToc.classList.add('active');
        }
        
        categoryToggle.addEventListener('click', function() {
            notesToc.classList.toggle('active');
            
            // Change icon based on state
            const icon = categoryToggle.querySelector('i');
            if (notesToc.classList.contains('active')) {
                icon.className = 'fas fa-chevron-up';
            } else {
                icon.className = 'fas fa-list';
            }
        });
    }
    
    // Initialize clipboard.js
    const clipboard = new ClipboardJS('.copy-btn');
    
    clipboard.on('success', function(e) {
        // Visual feedback on copy
        const originalHTML = e.trigger.innerHTML;
        e.trigger.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(function() {
            e.trigger.innerHTML = originalHTML;
        }, 1500);
        
        e.clearSelection();
    });
    
    // Handle screen resize
    window.addEventListener('resize', function() {
        if (notesToc) {
            if (window.innerWidth <= 992 && !categoryToggle.hasAttribute('data-clicked')) {
                notesToc.classList.remove('active');
            } else if (window.innerWidth > 992) {
                notesToc.classList.add('active');
            }
        }
    });
});