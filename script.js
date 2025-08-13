// Performance monitoring
let startTime = performance.now();
console.log('Script initialization started');

// Looping text effect for header - optimized with requestAnimationFrame
const loopingWords = ["Coder", "Developer", "Programmer", "Designer"];
let loopIndex = 0;
let loopTimer;

// Use requestIdleCallback for non-critical initializations
const initLoopingText = () => {
  const loopingTextElem = document.getElementById("looping-text");
  if (!loopingTextElem) return;
  
  // Function to update the text
  function showLoopingWord() {
    loopingTextElem.textContent = loopingWords[loopIndex];
    loopIndex = (loopIndex + 1) % loopingWords.length;
    loopTimer = setTimeout(() => requestAnimationFrame(showLoopingWord), 1500);
  }
  
  // Initial call
  requestAnimationFrame(showLoopingWord);
};

// Use passive event listeners for better scrolling performance
document.addEventListener('DOMContentLoaded', function() {
    console.log(`DOM Content Loaded (${(performance.now() - startTime).toFixed(1)}ms)`);
    
    // Schedule non-critical tasks using requestIdleCallback
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => initLoopingText(), { timeout: 1000 });
    } else {
      setTimeout(initLoopingText, 100);
    }
    
    // Performance optimized loading screen
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingText = document.getElementById('loadingText');
    
    let progress = 0;
    const loadingMessages = [
        'Initializing portfolio...',
        'Loading resources...',
        'Almost ready...'
    ];
    
    // Faster loading with optimized animation frame
    let lastFrameTime = 0;
    const targetFrameRate = 30; // Lower frame rate for better performance
    const frameInterval = 1000 / targetFrameRate;
    
    const updateLoadingProgress = (timestamp) => {
        // Throttle updates for better performance
        if (!lastFrameTime || timestamp - lastFrameTime >= frameInterval) {
            lastFrameTime = timestamp;
            
            progress += Math.random() * 25; // Faster progress
            if (progress > 100) progress = 100;
            
            if (loadingProgress) {
                loadingProgress.style.width = progress + '%';
            }
            
            if (loadingText) {
                const messageIndex = Math.min(
                    Math.floor((progress / 100) * loadingMessages.length),
                    loadingMessages.length - 1
                );
                loadingText.textContent = loadingMessages[messageIndex];
            }
            
            if (progress >= 100) {
                // Complete loading
                if (loadingOverlay) {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                        initializePortfolio();
                        console.log(`Full load completed (${(performance.now() - startTime).toFixed(1)}ms)`);
                    }, 500);
                }
                return; // Stop the animation
            }
        }
        
        // Continue animation
        requestAnimationFrame(updateLoadingProgress);
    };
    
    // Start loading animation
    requestAnimationFrame(updateLoadingProgress);
    
    // Performance-optimized mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Use passive event listener for better performance
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle with direct style manipulation for better performance
            const isCurrentlyHidden = mobileMenu.style.display === 'none' || mobileMenu.style.display === '';
            
            if (isCurrentlyHidden) {
                // Optimize layout calculations by batching changes
                requestAnimationFrame(() => {
                    mobileMenu.style.display = 'block';
                    // Force a reflow before adding transition class
                    void mobileMenu.offsetWidth;
                    mobileMenu.classList.add('show');
                });
            } else {
                mobileMenu.classList.remove('show');
                // Wait for transition to complete
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                }, 300); // Match transition duration
            }
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // Smooth navigation with active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Enhanced contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<svg class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>Sending...';
            submitBtn.disabled = true;
            
            // The form will be submitted to Formspree automatically
            // We don't prevent default here to allow normal form submission
        });
    }

    // Initialize timeline projects first
    initializeTimelineProjects();
});

function initializePortfolio() {
    console.log('Initializing Portfolio Features');
    
    // Initialize 3D background only after loading is complete
    init3DBackground();
    initCustomCursor();
    
    // Add scroll reveal classes to elements
    const elementsToReveal = document.querySelectorAll('section, .project-card, .skill-tag');
    elementsToReveal.forEach(el => {
        el.classList.add('scroll-reveal');
    });
    
    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Parallax scroll effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Enhanced footer interactions
    initFooterEffects();
}

function initFooterEffects() {
    // Enhanced footer interactions with performance optimization
    const footer = document.querySelector('.footer-enhanced');
    if (footer) {
        let ticking = false;
        
        function updateFooterParallax() {
            const scrolled = window.pageYOffset;
            const footerTop = footer.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrolled + windowHeight > footerTop) {
                const parallaxValue = (scrolled - footerTop + windowHeight) * 0.05;
                
                // Animate floating elements with reduced intensity
                const floatingElements = document.querySelectorAll('.floating-element');
                floatingElements.forEach((element, index) => {
                    const speed = 0.3 + (index * 0.1);
                    element.style.transform = `translateY(${parallaxValue * speed}px)`;
                });
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateFooterParallax);
                ticking = true;
            }
        });
        
        // Interactive contact items
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('.contact-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.05)';
                    icon.style.boxShadow = '0 4px 12px rgba(57, 255, 20, 0.2)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('.contact-icon');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                    icon.style.boxShadow = 'none';
                }
            });
        });
        
        // Tech stack hover effects
        const techIcons = document.querySelectorAll('.tech-icon');
        techIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'translateY(-2px) scale(1.05)';
                icon.style.borderColor = '#6366f1';
                icon.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.15)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translateY(0) scale(1)';
                icon.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                icon.style.boxShadow = 'none';
            });
        });
        
        // Code line typing effect
        const codeLine = document.querySelector('.code-line');
        if (codeLine) {
            const originalText = codeLine.innerHTML;
            let isVisible = false;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !isVisible) {
                        isVisible = true;
                        typeCodeEffect(codeLine, originalText);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(codeLine);
        }
    }
}

function typeCodeEffect(element, text) {
    element.innerHTML = '';
    let index = 0;
    
    function typeChar() {
        if (index < text.length) {
            if (text.charAt(index) === '<') {
                // Handle HTML tags
                const tagEnd = text.indexOf('>', index);
                if (tagEnd !== -1) {
                    element.innerHTML += text.substring(index, tagEnd + 1);
                    index = tagEnd + 1;
                } else {
                    element.innerHTML += text.charAt(index);
                    index++;
                }
            } else {
                element.innerHTML += text.charAt(index);
                index++;
            }
            setTimeout(typeChar, 50);
        }
    }
    
    typeChar();
}

function initializeTimelineProjects() {
    // --- Project Data ---
    const projects = [
        {
            title: "Skin Cancer Detection Model",
            description: "Developing a skin cancer detection model using an Attention Mechanism to apply AI in healthcare.",
            tech: ["Python", "TensorFlow", "Keras", "AI/ML"],
            link: "#"
        },
        {
            title: "Flappy Bird Clone",
            description: "A recreation of the classic Flappy Bird game, built with vanilla JavaScript.",
            tech: ["HTML", "CSS", "JavaScript", "Canvas"],
            link: "#"
        },
        {
            title: "Red Store",
            description: "A complete e-commerce website with product catalog, shopping cart, and responsive design.",
            tech: ["HTML", "CSS", "JavaScript"],
            link: "#"
        }
    ];

    const timelineContainer = document.getElementById('timeline-container');
    projects.forEach((project, index) => {
        const isEven = index % 2 === 0;
        const card = document.createElement('div');
        card.className = `project-card mb-12 flex justify-between items-center w-full scroll-reveal ${isEven ? 'flex-row-reverse' : ''}`;
        card.innerHTML = `
            <div class="w-5/12"></div>
            <div class="z-10 flex items-center justify-center w-12 h-12 bg-[#0d1117] rounded-full border-2 border-[#6366f1] shadow-lg">
                <svg class="w-6 h-6 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            </div>
            <div class="w-5/12">
                <div class="glass-effect p-6 rounded-md shadow-xl">
                    <h3 class="text-xl font-bold text-white">${project.title}</h3>
                    <div class="flex flex-wrap gap-2 my-3">
                        ${project.tech.map(t => `<span class="text-xs bg-[#161b22] text-[#6366f1] py-1 px-3 rounded-sm">${t}</span>`).join('')}
                    </div>
                    <p class="text-slate-400 mb-4">${project.description}</p>
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#6366f1] hover:underline">
                        View Project &gt;_
                    </a>
                </div>
            </div>
        `;
        timelineContainer.appendChild(card);
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Progress Bar & Timeline Line Animation ---
    const progressBar = document.getElementById('progressBar');
    const timelinePath = document.getElementById('timeline-path');
    const projectCards = document.querySelectorAll('.project-card');

    function updateAnimations() {
        // Progress bar
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (window.scrollY / scrollTotal) * 100;
        progressBar.style.width = scrollProgress + '%';

        // Timeline path
        if (projectCards.length > 0 && timelinePath) {
            const containerRect = timelineContainer.getBoundingClientRect();
            let pathData = '';
            let points = [];

            projectCards.forEach((card) => {
                const dot = card.querySelector('.z-10');
                const dotRect = dot.getBoundingClientRect();
                
                const x = dotRect.left - containerRect.left + dotRect.width / 2;
                const y = dotRect.top - containerRect.top + dotRect.height / 2;
                
                points.push({x, y});
            });

            if (points.length > 0) {
                pathData = `M ${points[0].x} ${points[0].y}`;
                for (let i = 0; i < points.length - 1; i++) {
                    const p1 = points[i];
                    const p2 = points[i+1];
                    const midX = (p1.x + p2.x) / 2;
                    pathData += ` Q ${midX} ${p1.y}, ${midX} ${(p1.y + p2.y) / 2}`;
                    pathData += ` T ${p2.x} ${p2.y}`;
                }
            }

            timelinePath.setAttribute('d', pathData);
            const pathLength = timelinePath.getTotalLength();
            timelinePath.style.strokeDasharray = pathLength;

            // Simplified timeline progress calculation
            const projectsSection = document.getElementById('projects');
            const projectsRect = projectsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate progress based on section position relative to viewport
            let scrollPercent = 0;
            
            // When section top is at bottom of viewport, progress = 0
            // When section bottom is at top of viewport, progress = 1
            const sectionStart = projectsRect.top - windowHeight;
            const sectionEnd = projectsRect.bottom;
            const totalScrollDistance = sectionEnd - sectionStart;
            
            if (totalScrollDistance > 0) {
                const currentPosition = -sectionStart; // How far we've scrolled into the section
                scrollPercent = currentPosition / totalScrollDistance;
            }
            
            // Clamp between 0 and 1
            scrollPercent = Math.max(0, Math.min(1, scrollPercent));
            
            timelinePath.style.strokeDashoffset = pathLength * (1 - scrollPercent);
        }
    }
    
    window.addEventListener('scroll', updateAnimations);
    window.addEventListener('resize', updateAnimations);
    updateAnimations();

    // --- 3D Solar System Background ---
    
    // Initialize 3D solar system background
    function init3DBackground() {
        console.log('init3DBackground called');
        const container = document.getElementById('three-bg');
        if (!container) {
            console.error('three-bg container not found!');
            return;
        }
        console.log('three-bg container found, setting up 3D scene...');

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Create starfield
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 500; // Reduced from 2000
        const starPositions = new Float32Array(starCount * 3);
        
        for (let i = 0; i < starCount * 3; i++) {
            starPositions[i] = (Math.random() - 0.5) * 200;
        }
        
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: Math.random() * 1 + 0.2, // Smaller stars
            transparent: true,
            opacity: 0.4 // More visible stars
        });
        
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Create sun (central glowing sphere)
        const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Smaller sun
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: 0xff6b00,
            transparent: true,
            opacity: 0.5 // More visible sun
        });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        sun.position.set(0, 0, -10);
        scene.add(sun);

        // Add sun glow effect
        const sunGlowGeometry = new THREE.SphereGeometry(0.7, 32, 32); // Smaller glow
        const sunGlowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffa500,
            transparent: true,
            opacity: 0.2 // More visible glow
        });
        const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
        sunGlow.position.set(0, 0, -10);
        scene.add(sunGlow);

        // Create planets with orbits
        const planets = [];
        const planetData = [
            { size: 0.08, color: 0x8c7853, distance: 3, speed: 0.02, name: 'mercury' }, // Smaller sizes
            { size: 0.1, color: 0x6366f1, distance: 4, speed: 0.015, name: 'venus' }, // Updated colors
            { size: 0.12, color: 0x8b5cf6, distance: 5.5, speed: 0.01, name: 'earth' },
            { size: 0.09, color: 0xff4444, distance: 7, speed: 0.008, name: 'mars' },
            { size: 0.3, color: 0xd2691e, distance: 10, speed: 0.005, name: 'jupiter' },
            { size: 0.25, color: 0xfad5a5, distance: 13, speed: 0.003, name: 'saturn' },
            { size: 0.18, color: 0x4fd0e7, distance: 16, speed: 0.002, name: 'uranus' },
            { size: 0.16, color: 0x4169e1, distance: 19, speed: 0.001, name: 'neptune' }
        ];

        planetData.forEach((data, index) => {
            // Create planet
            const planetGeometry = new THREE.SphereGeometry(data.size, 16, 16);
            const planetMaterial = new THREE.MeshBasicMaterial({
                color: data.color,
                transparent: true,
                opacity: 0.4 // More visible planets
            });
            const planet = new THREE.Mesh(planetGeometry, planetMaterial);
            
            // Create orbit path - much more subtle
            const orbitGeometry = new THREE.RingGeometry(data.distance - 0.01, data.distance + 0.01, 64);
            const orbitMaterial = new THREE.MeshBasicMaterial({
                color: 0x6366f1,
                transparent: true,
                opacity: 0.08, // Slightly more visible orbits
                side: THREE.DoubleSide
            });
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.rotation.x = Math.PI / 2;
            orbit.position.z = -10;
            scene.add(orbit);

            // Add planet glow - much more subtle
            if (data.name === 'earth') {
                const glowGeometry = new THREE.SphereGeometry(data.size + 0.02, 16, 16);
                const glowMaterial = new THREE.MeshBasicMaterial({
                    color: 0x6366f1,
                    transparent: true,
                    opacity: 0.2 // More visible Earth glow
                });
                const glow = new THREE.Mesh(glowGeometry, glowMaterial);
                planet.add(glow);
            }

            planets.push({
                mesh: planet,
                distance: data.distance,
                speed: data.speed,
                angle: Math.random() * Math.PI * 2,
                originalY: (Math.random() - 0.5) * 2
            });
            
            scene.add(planet);
        });

        // Create asteroid belt - reduced count and visibility
        const asteroidCount = 30; // Reduced from 100
        const asteroids = [];
        for (let i = 0; i < asteroidCount; i++) {
            const asteroidGeometry = new THREE.SphereGeometry(0.01 + Math.random() * 0.015, 6, 6); // Smaller asteroids
            const asteroidMaterial = new THREE.MeshBasicMaterial({
                color: 0x8c7853,
                transparent: true,
                opacity: 0.25 // More visible asteroids
            });
            const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 8 + Math.random() * 1.5;
            asteroid.position.x = Math.cos(angle) * distance;
            asteroid.position.y = (Math.random() - 0.5) * 0.5;
            asteroid.position.z = -10 + Math.sin(angle) * distance;
            
            asteroids.push({
                mesh: asteroid,
                angle: angle,
                distance: distance,
                speed: 0.006 + Math.random() * 0.002
            });
            
            scene.add(asteroid);
        }

        // Create nebula particles - much more subtle
        const nebulaCount = 50; // Reduced from 300
        const nebula = new THREE.Group();
        for (let i = 0; i < nebulaCount; i++) {
            const nebulaGeometry = new THREE.SphereGeometry(0.05 + Math.random() * 0.1, 8, 8); // Smaller particles
            const nebulaColors = [0x6366f1, 0x8b5cf6, 0x06b6d4]; // Updated to match theme
            const nebulaMaterial = new THREE.MeshBasicMaterial({
                color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
                transparent: true,
                opacity: 0.05 + Math.random() * 0.08 // More visible nebula particles
            });
            const nebulaParticle = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
            
            nebulaParticle.position.x = (Math.random() - 0.5) * 50;
            nebulaParticle.position.y = (Math.random() - 0.5) * 50;
            nebulaParticle.position.z = -30 + (Math.random() - 0.5) * 20;
            
            nebula.add(nebulaParticle);
        }
        scene.add(nebula);

        camera.position.z = 5;

        // Animation loop
        function animate3D() {
            requestAnimationFrame(animate3D);
            
            const time = Date.now() * 0.001;
            
            // Animate sun - slower and more subtle
            sun.rotation.y += 0.002; // Reduced from 0.005
            sunGlow.rotation.y -= 0.001; // Reduced from 0.003
            sunGlow.rotation.x += 0.0005; // Reduced from 0.001

            // Animate planets in orbit - slower movements
            planets.forEach((planetObj) => {
                planetObj.angle += planetObj.speed * 0.5; // Slower orbital speed
                planetObj.mesh.position.x = Math.cos(planetObj.angle) * planetObj.distance;
                planetObj.mesh.position.z = -10 + Math.sin(planetObj.angle) * planetObj.distance;
                planetObj.mesh.position.y = planetObj.originalY + Math.sin(time + planetObj.angle) * 0.1; // Less vertical movement
                
                // Rotate planets - slower
                planetObj.mesh.rotation.y += 0.005; // Reduced from 0.01
                planetObj.mesh.rotation.x += 0.002; // Reduced from 0.005
            });

            // Animate asteroids - slower
            asteroids.forEach((asteroidObj) => {
                asteroidObj.angle += asteroidObj.speed * 0.5; // Slower movement
                asteroidObj.mesh.position.x = Math.cos(asteroidObj.angle) * asteroidObj.distance;
                asteroidObj.mesh.position.z = -10 + Math.sin(asteroidObj.angle) * asteroidObj.distance;
                asteroidObj.mesh.rotation.x += 0.01; // Reduced from 0.02
                asteroidObj.mesh.rotation.y += 0.008; // Reduced from 0.015
            });

            // Animate nebula - much slower
            nebula.rotation.y += 0.00005; // Reduced from 0.0002
            nebula.rotation.z += 0.00002; // Reduced from 0.0001
            nebula.children.forEach((particle, index) => {
                particle.rotation.x += 0.0002; // Reduced from 0.001
                particle.rotation.y += 0.0005; // Reduced from 0.002
                particle.position.y += Math.sin(time + index) * 0.0005; // Reduced from 0.002
            });

            // Animate stars (twinkling effect) - slower
            stars.rotation.y += 0.00002; // Reduced from 0.0001
            stars.rotation.x += 0.00001; // Reduced from 0.00005

            // Camera movement based on mouse position (more subtle)
            if (window.mouseX !== undefined && window.mouseY !== undefined) {
                camera.position.x += ((window.mouseX / window.innerWidth - 0.5) * 0.2 - camera.position.x) * 0.02; // More subtle
                camera.position.y += (-(window.mouseY / window.innerHeight - 0.5) * 0.2 - camera.position.y) * 0.02; // More subtle
                camera.lookAt(scene.position);
            }
            
            renderer.render(scene, camera);
        }
        
        animate3D();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Mouse tracking for interactive camera
        document.addEventListener('mousemove', (event) => {
            window.mouseX = event.clientX;
            window.mouseY = event.clientY;
        });
    }

    // Initialize floating 3D space objects in header
    // Floating objects functionality removed

    // Initialize 3D elements when page loads
    console.log('Initializing 3D elements...');
    if (typeof THREE !== 'undefined') {
        console.log('THREE.js is available, initializing 3D background...');
        init3DBackground();
        // Floating objects removed
    } else {
        console.error('THREE.js is not available!');
    }

    // --- Custom Cursor Effects ---
    
    // Create custom cursor elements
    function initCustomCursor() {
        console.log('initCustomCursor called');
        // Create main cursor
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        console.log('Custom cursor element created and added to body');

        // Create cursor trail elements
        const trailElements = [];
        for (let i = 0; i < 8; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.opacity = (8 - i) / 10;
            trail.style.transform = `translate(-50%, -50%) scale(${(8 - i) / 10})`;
            document.body.appendChild(trail);
            trailElements.push(trail);
        }

        // Mouse position tracking
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // Update mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor animation
        function animateCursor() {
            // Smooth cursor movement
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            // Update trail elements with delay
            trailElements.forEach((trail, index) => {
                const delay = (index + 1) * 0.05;
                const trailX = cursorX - (mouseX - cursorX) * delay;
                const trailY = cursorY - (mouseY - cursorY) * delay;
                
                trail.style.left = trailX + 'px';
                trail.style.top = trailY + 'px';
            });

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Enhanced hover effects
        const hoverElements = document.querySelectorAll('a, button, .skill-tag, .glass-effect, .ai-button, .download-btn');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.background = 'linear-gradient(45deg, #6366f1, #8b5cf6, #06b6d4)';
                cursor.style.boxShadow = `
                    0 0 15px #6366f1,
                    0 0 30px #6366f1,
                    0 0 45px #6366f1
                `;
                
                // Add pulse effect
                cursor.style.animation = 'cursorPulse 1s ease-in-out infinite';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.background = 'linear-gradient(45deg, #6366f1, #8b5cf6)';
                cursor.style.boxShadow = `
                    0 0 10px #6366f1,
                    0 0 20px #6366f1,
                    0 0 30px #6366f1
                `;
                cursor.style.animation = 'none';
            });
        });

        // Special effects for different sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.addEventListener('mouseenter', () => {
                const colors = [
                    ['#6366f1', '#8b5cf6'], // Default
                    ['#ff3939', '#ff6b6b'], // About - Red theme
                    ['#3939ff', '#6b6bff'], // Skills - Blue theme
                    ['#ff39ff', '#ff6bff'], // Projects - Purple theme
                    ['#39ffff', '#6bffff'], // Education - Cyan theme
                    ['#ffff39', '#ffff6b'], // Certifications - Yellow theme
                    ['#ff9739', '#ff976b'], // AI Generator - Orange theme
                    ['#6366f1', '#8b5cf6']  // Contact - Back to blue-purple
                ];
                
                const sectionColors = colors[index % colors.length];
                trailElements.forEach(trail => {
                    trail.style.background = sectionColors[0];
                });
            });
        });

        // Click effect
        document.addEventListener('click', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.boxShadow = `
                0 0 20px #6366f1,
                0 0 40px #6366f1,
                0 0 60px #6366f1,
                0 0 80px #6366f1
            `;
            
            setTimeout(() => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.boxShadow = `
                    0 0 10px #6366f1,
                    0 0 20px #6366f1,
                    0 0 30px #6366f1
                `;
            }, 150);
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            trailElements.forEach(trail => {
                trail.style.opacity = '0';
            });
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            trailElements.forEach((trail, index) => {
                trail.style.opacity = (8 - index) / 10;
            });
        });
    }

    // Initialize custom cursor
    console.log('Initializing custom cursor...');
    initCustomCursor();
}

/* Add cursor pulse animation to CSS */
const style = document.createElement('style');
style.textContent = `
    @keyframes cursorPulse {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
        }
    }
    
    /* Hide default cursor on mobile */
    @media (max-width: 768px) {
        .custom-cursor,
        .cursor-trail {
            display: none;
        }
        
        * {
            cursor: auto !important;
        }
    }
`;
document.head.appendChild(style);
