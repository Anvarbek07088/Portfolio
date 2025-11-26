// DOM yuklanganda ishlaydigan funksiya
document.addEventListener("DOMContentLoaded", function () {
  // Loading screen
  const loadingScreen = document.getElementById("loadingScreen");

  // Sahifa yuklanganidan so'ng loading screenni yashirish
  window.addEventListener("load", function () {
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 1000);
  });

  // Hamburger menyusi
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Navbar linklarini bosganda menyuni yopish
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Scroll paytida navbar stilini o'zgartirish
  const header = document.getElementById("header");
  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", function () {
    // Header stilini o'zgartirish
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Scroll to top tugmasini ko'rsatish
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }

    // Sectionlarni animatsiya qilish
    animateOnScroll();
  });

  // Scroll to top funksiyasi
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Theme toggle funksiyasi
  const themeSwitch = document.getElementById("themeSwitch");
  const currentTheme = localStorage.getItem("theme") || "light";

  // Saqlangan temani o'rnatish
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeSwitch.checked = true;
  }

  themeSwitch.addEventListener("change", function () {
    if (this.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  });

  // Portfolio filtrlari
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Faol tugmani o'zgartirish
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filtr qiymatini olish
      const filterValue = this.getAttribute("data-filter");

      // Portfolio elementlarini filtrlash
      portfolioItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
          setTimeout(() => {
            item.classList.add("visible");
          }, 100);
        } else {
          item.classList.remove("visible");
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Statistikani hisoblash
  const statNumbers = document.querySelectorAll(".stat-number");

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      const duration = 2000; // 2 soniya
      const step = target / (duration / 16); // 16ms - bir frame
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current);
      }, 16);
    });
  }

  // Mahorat barlarini animatsiya qilish
  const skillBars = document.querySelectorAll(".skill-progress");

  function animateSkills() {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      bar.style.width = "0%";
      setTimeout(() => {
        bar.style.width = width + "%";
      }, 300);
    });
  }

  // Scroll animatsiyalari
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".portfolio-item, .about-content, .contact-content, .hero-stats, .skills-chart"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible");

        // Agar element stat numbers bo'lsa
        if (element.classList.contains("hero-stats")) {
          animateStats();
        }

        // Agar element skills chart bo'lsa
        if (element.classList.contains("skills-chart")) {
          animateSkills();
        }
      }
    });
  }

  // Dastlabki animatsiyalarni ishga tushirish
  animateOnScroll();

  // Aloqa formasi
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form ma'lumotlarini olish
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Formani tekshirish
      if (!name || !email || !subject || !message) {
        showNotification("Iltimos, barcha maydonlarni to'ldiring!", "error");
        return;
      }

      // Email formatini tekshirish
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification("Iltimos, to'g'ri email manzilini kiriting!", "error");
        return;
      }

      // Formani yuborish simulyatsiyasi
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Muvaffaqiyatli yuborilgan xabar
        showNotification(
          "Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.",
          "success"
        );

        // Formani tozalash
        contactForm.reset();

        // Tugmani qayta tiklash
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Notification funksiyasi
  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${
                  type === "success" ? "check-circle" : "exclamation-circle"
                }"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;

    // Notification uslublari
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === "success" ? "#4CAF50" : "#f44336"};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;

    document.body.appendChild(notification);

    // Yopish tugmasi
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    });

    // Avtomatik yopish
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }

  // Notification uchun CSS qo'shish
  const notificationStyles = document.createElement("style");
  notificationStyles.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    `;
  document.head.appendChild(notificationStyles);

  // CV yuklab olish
  const downloadCV = document.getElementById("downloadCV");
  if (downloadCV) {
    downloadCV.addEventListener("click", function (e) {
      e.preventDefault();
      showNotification("CV yuklab olinmoqda...", "success");

      // CV yuklab olish simulyatsiyasi
      setTimeout(() => {
        showNotification("CV muvaffaqiyatli yuklab olindi!", "success");
      }, 1500);
    });
  }

  // Portfolio modal
  const portfolioLinks = document.querySelectorAll(
    ".portfolio-link .fa-expand"
  );
  const portfolioModal = document.getElementById("portfolioModal");
  const closeModal = document.querySelector(".close-modal");

  portfolioLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const portfolioItem = this.closest(".portfolio-item");
      const title = portfolioItem.querySelector("h3").textContent;
      const description = portfolioItem.querySelector("p").textContent;
      const link = portfolioItem.querySelector(".portfolio-btn").href;

      // Modal ma'lumotlarini to'ldirish
      document.getElementById("modalTitle").textContent = title;
      document.getElementById("modalDescription").textContent = description;
      document.getElementById("modalLink").href = link;

      // Modalni ochish
      portfolioModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Modalni yopish
  closeModal.addEventListener("click", function () {
    portfolioModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Modal tashqarisini bosganda yopish
  portfolioModal.addEventListener("click", function (e) {
    if (e.target === this) {
      portfolioModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      if (email) {
        showNotification(
          "Obuna muvaffaqiyatli amalga oshirildi! Rahmat.",
          "success"
        );
        this.reset();
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
