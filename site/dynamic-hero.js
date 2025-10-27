// dynamic-hero.js

class DynamicHero {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.progressBar = document.querySelector('.progress');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoSlideInterval = null;
        this.progressInterval = null;
        
        this.init();
    }
    
    init() {
        // إضافة event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // إضافة event listeners للمؤشرات
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // بدء التبديل التلقائي
        this.startAutoSlide();
        
        // بدء شريط التقدم
        this.startProgressBar();
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // التبديل كل 5 ثواني
    }
    
    startProgressBar() {
        this.progressInterval = setInterval(() => {
            const progress = this.progressBar.style.width || '0%';
            const currentProgress = parseInt(progress);
            
            if (currentProgress >= 100) {
                this.progressBar.style.width = '0%';
                this.nextSlide();
            } else {
                this.progressBar.style.width = `${currentProgress + 0.2}%`;
            }
        }, 10);
    }
    
    resetProgressBar() {
        this.progressBar.style.width = '0%';
    }
    
    goToSlide(slideIndex) {
        // إخفاء الشريحة الحالية
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // تحديث الشريحة الحالية
        this.currentSlide = slideIndex;
        
        // إظهار الشريحة الجديدة
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        // إعادة تعيين شريط التقدم
        this.resetProgressBar();
        
        // إعادة تشغيل التبديل التلقائي
        this.restartAutoSlide();
    }
    
    nextSlide() {
        const nextSlide = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextSlide);
    }
    
    prevSlide() {
        const prevSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevSlide);
    }
    
    restartAutoSlide() {
        clearInterval(this.autoSlideInterval);
        clearInterval(this.progressInterval);
        this.startAutoSlide();
        this.startProgressBar();
    }
    
    destroy() {
        clearInterval(this.autoSlideInterval);
        clearInterval(this.progressInterval);
    }
}

// تهيئة الهيرو الديناميكي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const dynamicHero = new DynamicHero();

    // إضافة تأثيرات إضافية عند التمرير
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-section');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // إضافة تأثيرات hover للأزرار
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;

            const ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple');

            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
            }, 1000);
        });
    });

    // Mobile Menu Toggle Functionality
    const hamburger = document.getElementById('hamburger');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const navMenu = document.getElementById('nav-menu');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        mobileMenuOverlay.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu on overlay click
    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });

    // Close mobile menu on close button click
    mobileMenuClose.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });

    // Close mobile menu on link click
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenuOverlay.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            mobileMenuOverlay.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// إضافة تأثيرات CSS إضافية
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);