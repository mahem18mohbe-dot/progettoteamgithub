        // Theme Toggle Logic
        const themeToggleBtn = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;
        const lightIcon = document.querySelector('.light-icon');
        const darkIcon = document.querySelector('.dark-icon');

        function setTheme(theme) {
            if (theme === 'dark') {
                htmlElement.setAttribute('data-theme', 'dark');
                lightIcon.style.display = 'none';
                darkIcon.style.display = 'block';
                localStorage.setItem('theme', 'dark');
            } else {
                htmlElement.removeAttribute('data-theme');
                lightIcon.style.display = 'block';
                darkIcon.style.display = 'none';
                localStorage.setItem('theme', 'light');
            }
        }

        // Initialize Theme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setTheme('dark');
        } else {
            setTheme('light');
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });

        // Typing Effect Logic
        const textToType = "I Palermitani";
        const typeWriterElement = document.getElementById('typewriter');
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 150;
        const eraseDelay = 100;
        const newTextDelay = 2000;

        function type() {
            const currentText = textToType.substring(0, charIndex);
            typeWriterElement.textContent = currentText;

            let delay = isDeleting ? eraseDelay : typingDelay;

            if (!isDeleting && charIndex === textToType.length) {
                delay = newTextDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                delay = 500;
            }

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            setTimeout(type, delay);
        }

        // Start typing effect
        setTimeout(type, 1000);

        // Smooth Scrolling for Nav Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        // Intersection Observer for Scroll Reveals
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                    
                    // Update active nav based on scroll position
                    if (entry.target.tagName.toLowerCase() === 'section') {
                        const id = entry.target.getAttribute('id');
                        document.querySelectorAll('.nav-link').forEach(link => {
                            if (link.getAttribute('href') === `#${id}`) {
                                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                                link.classList.add('active');
                            }
                        });
                    }
                }
            });
        }, observerOptions);

        // Prepare elements for scroll reveal
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        document.querySelectorAll('.glass-card').forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(card);
        });

          document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.opacity = 0;
            bar.style.transition = 'opacity 4s ease-out';
            observer.observe(bar);
        });