let currentPage = 0; // 0 للغلاف، 1-7 للصفحات
const totalPages = 7;

// تهيئة الغلاف
document.addEventListener('DOMContentLoaded', function() {
    showPage(currentPage);
    updateNavigation();
    addVisualEffects();
});

// دالة عرض الصفحة
function showPage(pageNumber) {
    // إخفاء جميع الصفحات
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // عرض الصفحة المطلوبة
    let targetPage;
    if (pageNumber === 0) {
        targetPage = document.getElementById('cover');
    } else {
        targetPage = document.getElementById(`page${pageNumber}`);
    }
    
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // تحديث مؤشر الصفحة
    updatePageIndicator(pageNumber);
}

// تحديث مؤشر الصفحة
function updatePageIndicator(pageNumber) {
    const indicator = document.getElementById('pageIndicator');
    if (pageNumber === 0) {
        indicator.textContent = 'الغلاف';
    } else {
        indicator.textContent = `الصفحة ${pageNumber} من ${totalPages}`;
    }
}

// دالة الصفحة التالية
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updateNavigation();
        playPageFlipSound();
    }
}

// دالة الصفحة السابقة
function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
        updateNavigation();
        playPageFlipSound();
    }
}

// تحديث حالة أزرار التنقل
function updateNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

// تشغيل صوت تقليب الصفحات
function playPageFlipSound() {
    const audio = document.getElementById('pageFlipSound');
    if (audio) {
        // إعادة تعيين الصوت للبداية
        audio.currentTime = 0;
        
        // محاولة تشغيل الصوت
        audio.play().catch(function(error) {
            console.log('لا يمكن تشغيل الصوت:', error);
            // استخدام الصوت البديل
            createPageFlipSound();
        });
    } else {
        // استخدام الصوت البديل
        createPageFlipSound();
    }
}

// دالة لإنشاء صوت تقليب الصفحات
function createPageFlipSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // صوت أكثر واقعية لتقليب الورق
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.15);
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
        console.log('لا يمكن إنشاء الصوت:', error);
    }
}

// إضافة دعم لوحة المفاتيح
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
            event.preventDefault();
            nextPage();
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            event.preventDefault();
            previousPage();
            break;
        case 'Home':
            event.preventDefault();
            currentPage = 0;
            showPage(currentPage);
            updateNavigation();
            break;
        case 'End':
            event.preventDefault();
            currentPage = totalPages;
            showPage(currentPage);
            updateNavigation();
            break;
    }
});

// إضافة دعم اللمس للموبايل
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // التأكد من أن الحركة أفقية أكثر من رأسية
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
            // سحب لليسار - الصفحة التالية
            nextPage();
        } else {
            // سحب لليمين - الصفحة السابقة
            previousPage();
        }
    }
}

// إضافة تأثيرات بصرية إضافية
function addVisualEffects() {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach((page, index) => {
        // إضافة تأخير للرسوم المتحركة
        page.style.animationDelay = `${index * 0.1}s`;
        
        // إضافة تأثير عند التحميل
        page.addEventListener('animationend', function() {
            this.style.animationDelay = '0s';
        });
    });
    
    // إضافة تأثير للغلاف
    const cover = document.querySelector('.cover-page');
    if (cover) {
        cover.addEventListener('click', function() {
            if (currentPage === 0) {
                nextPage();
            }
        });
    }
}

// إضافة تأثيرات إضافية للكتاب
function addBookEffects() {
    const book = document.querySelector('.book');
    
    // تأثير عند تحريك الماوس
    book.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
    
    // إعادة تعيين عند مغادرة الماوس
    book.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateY(-5deg)';
    });
}

// تشغيل التأثيرات الإضافية
document.addEventListener('DOMContentLoaded', function() {
    addBookEffects();
});

// دالة للانتقال إلى صفحة معينة
function goToPage(pageNumber) {
    if (pageNumber >= 0 && pageNumber <= totalPages) {
        currentPage = pageNumber;
        showPage(currentPage);
        updateNavigation();
        playPageFlipSound();
    }
}

// إضافة دعم النقر على أرقام الصفحات
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('page-number')) {
        const pageNumber = parseInt(e.target.textContent);
        goToPage(pageNumber);
    }
});

// تحسين الأداء
let animationFrameId;
function smoothPageTransition() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    animationFrameId = requestAnimationFrame(() => {
        // تنفيذ الانتقال
    });
}

// تنظيف عند إغلاق الصفحة
window.addEventListener('beforeunload', function() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
}); 