// DOM yuklanganda ishlaydigan funksiya
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menyusi
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Navbar linklarini bosganda menyuni yopish
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Scroll paytida navbar stilini o'zgartirish
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Portfolio itemlariga hover effekti
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Aloqa formasi
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form ma'lumotlarini olish
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Formani tekshirish
            if (!name || !email || !message) {
                alert('Iltimos, barcha maydonlarni to\'ldiring!');
                return;
            }
            
            // Email formatini tekshirish
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Iltimos, to\'g\'ri email manzilini kiriting!');
                return;
            }
            
            // Muvaffaqiyatli yuborilgan xabar
            alert('Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
            
            // Formani tozalash
            contactForm.reset();
        });
    }
    
    // Scroll animatsiyalari
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animatsiya qo'shish uchun elementlar
    const animateElements = document.querySelectorAll('.portfolio-item, .about-content, .contact-content');
    animateElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});