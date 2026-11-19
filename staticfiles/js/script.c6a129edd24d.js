
document.addEventListener("DOMContentLoaded", function () {
    // Footer year
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Mobile navigation
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }

    // Reveal elements while scrolling
    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(function (item) {
            observer.observe(item);
        });
    }

    // Contact form opens email application
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            const subject = encodeURIComponent("Portfolio Contact - " + name);
            const body = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\n\nMessage:\n" + message
            );

            window.location.href =
                "mailto:saranyap994@gmail.com?subject=" + subject + "&body=" + body;
        });
    }

    // Project Image Carousel
    document.querySelectorAll(".project-carousel").forEach(function (carousel) {

        const images = carousel.querySelectorAll(".carousel-image");
        const dotsContainer = carousel.querySelector(".carousel-dots");
        const prevButton = carousel.querySelector(".carousel-arrow.prev");
        const nextButton = carousel.querySelector(".carousel-arrow.next");

        if (images.length === 0 || !dotsContainer) return;

        let currentIndex = 0;
        let autoSlide;

        // Create carousel dots
        images.forEach(function (image, index) {

            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "carousel-dot";

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", function () {
                showSlide(index);
                restartAutoSlide();
            });

            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll(".carousel-dot");

        // Display selected image
        function showSlide(index) {

            images[currentIndex].classList.remove("active");
            dots[currentIndex].classList.remove("active");

            currentIndex = (index + images.length) % images.length;

            images[currentIndex].classList.add("active");
            dots[currentIndex].classList.add("active");
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlide = setInterval(nextSlide, 3000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlide);
        }

        function restartAutoSlide() {
            startAutoSlide();
        }

        if (nextButton) {
            nextButton.addEventListener("click", function () {
                nextSlide();
                restartAutoSlide();
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", function () {
                prevSlide();
                restartAutoSlide();
            });
        }

        carousel.addEventListener("mouseenter", stopAutoSlide);
        carousel.addEventListener("mouseleave", startAutoSlide);

        startAutoSlide();
    });


// 1. TYPING ANIMATION
const typingElement = document.getElementById("typingText");

if (typingElement) {
    const words = [
        "Python Developer",
        "Django Developer",
        "Full Stack Developer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const word = words[wordIndex];

        typingElement.textContent = word.substring(0, charIndex);

        if (!deleting) {
            charIndex++;

            if (charIndex > word.length) {
                deleting = true;
                setTimeout(typeEffect, 1200);
                return;
            }
        } else {
            charIndex--;

            if (charIndex < 0) {
                deleting = false;
                charIndex = 0;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 50 : 100);
    }

    typeEffect();
}


// 2. CURSOR GLOW

/* HIGH VISIBILITY CURSOR FOLLOW */
const cursorGlow = document.getElementById("cursor-glow");

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = "1";
    });

    document.addEventListener("mouseleave", function () {
        cursorGlow.style.opacity = "0";
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.18;
        glowY += (mouseY - glowY) * 0.18;

        cursorGlow.style.left = glowX + "px";
        cursorGlow.style.top = glowY + "px";

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}



// 3. PROJECT DETAILS POPUP
const projectButtons = document.querySelectorAll(".project-details-btn");

if (projectButtons.length) {
    const modal = document.createElement("div");

    modal.id = "projectModal";
    modal.innerHTML = `
        <div class="project-modal-content">
            <button class="modal-close" aria-label="Close">&times;</button>
            <h2 id="modalTitle"></h2>
            <p id="modalDescription"></p>
            <h4>Technologies Used</h4>
            <p id="modalTech"></p>
            <a id="modalGithub" target="_blank" rel="noopener">
                View GitHub Repository
            </a>
        </div>
    `;

    document.body.appendChild(modal);

    projectButtons.forEach(button => {
        button.addEventListener("click", function () {
            document.getElementById("modalTitle").textContent =
                this.dataset.title || "Project";

            document.getElementById("modalDescription").textContent =
                this.dataset.description || "";

            document.getElementById("modalTech").textContent =
                this.dataset.tech || "";

            const github = document.getElementById("modalGithub");
            const url = this.dataset.github || "";

            github.href = url;
            github.style.display = url ? "inline-block" : "none";

            modal.classList.add("active");
        });
    });

    modal.querySelector(".modal-close").addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", e => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
}


// 4. BACK TO TOP
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 350);
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// 5. QUICK STATISTICS COUNTER
const statNumbers = document.querySelectorAll(".stat-number");

if (statNumbers.length) {
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = Number(element.dataset.target);
                const decimal = element.dataset.decimal === "true";
                const duration = 1500;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const progress = Math.min(
                        (currentTime - startTime) / duration,
                        1
                    );

                    const value = target * progress;

                    element.textContent = decimal
                        ? value.toFixed(2)
                        : Math.floor(value);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
                statsObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => statsObserver.observe(number));
}

});
