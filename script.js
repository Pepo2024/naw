let currentPage = 0; // 0 للغلاف، 1-7 للصفحات
const totalPages = 7;
let isAnimating = false; // لمنع التقليب المتعدد أثناء الانيميشن

// تهيئة الغلاف
document.addEventListener('DOMContentLoaded', function() {
    showPage(currentPage);
    updateNavigation();
    addVisualEffects();
    preloadAudio();
});

// تحميل الصوت مسبقاً
function preloadAudio() {
    const audio = document.getElementById('pageFlipSound');
    if (audio) {
        audio.load();
        // تعيين مستوى الصوت
        audio.volume = 0.6;
    }
}

// دالة عرض الصفحة مع انيميشن محسن
function showPage(pageNumber) {
    if (isAnimating) return; // منع التقليب المتعدد
    
    isAnimating = true;
    
    // إخفاء جميع الصفحات
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active', 'flipping-out');
    });
    
    // عرض الصفحة المطلوبة
    let targetPage;
    if (pageNumber === 0) {
        targetPage = document.getElementById('cover');
    } else {
        targetPage = document.getElementById(`page${pageNumber}`);
    }
    
    if (targetPage) {
        // إضافة انيميشن الدخول
        targetPage.classList.add('active');
        
        // تشغيل الصوت
        playPageFlipSound();
        
        // إزالة حالة الانيميشن بعد انتهاء الانيميشن
        setTimeout(() => {
            isAnimating = false;
            updateNavigation();
        }, 1200); // مدة الانيميشن
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

// دالة الصفحة التالية مع انيميشن محسن
function nextPage() {
    if (currentPage < totalPages && !isAnimating) {
        // إضافة انيميشن الخروج للصفحة الحالية
        const currentPageElement = getCurrentPageElement();
        if (currentPageElement) {
            currentPageElement.classList.add('flipping-out');
        }
        
        // تأخير قصير قبل عرض الصفحة الجديدة
        setTimeout(() => {
            currentPage++;
            showPage(currentPage);
            updateNavigation();
        }, 100);
    }
}

// دالة الصفحة السابقة مع انيميشن محسن
function previousPage() {
    if (currentPage > 0 && !isAnimating) {
        // إضافة انيميشن الخروج للصفحة الحالية
        const currentPageElement = getCurrentPageElement();
        if (currentPageElement) {
            currentPageElement.classList.add('flipping-out');
        }
        
        // تأخير قصير قبل عرض الصفحة الجديدة
        setTimeout(() => {
            currentPage--;
            showPage(currentPage);
            updateNavigation();
        }, 100);
    }
}

// الحصول على عنصر الصفحة الحالية
function getCurrentPageElement() {
    if (currentPage === 0) {
        return document.getElementById('cover');
    } else {
        return document.getElementById(`page${currentPage}`);
    }
}

// تحديث حالة أزرار التنقل
function updateNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 0 || isAnimating;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages || isAnimating;
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

// دالة لإنشاء صوت تقليب الصفحات (بديل)
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
    if (isAnimating) return; // منع التقليب أثناء الانيميشن
    
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
            if (currentPage !== 0) {
                currentPage = 0;
                showPage(currentPage);
                updateNavigation();
            }
            break;
        case 'End':
            event.preventDefault();
            if (currentPage !== totalPages) {
                currentPage = totalPages;
                showPage(currentPage);
                updateNavigation();
            }
            break;
    }
});

// إضافة دعم اللمس للموبايل
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(event) {
    if (isAnimating) return; // منع التقليب أثناء الانيميشن
    
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(event) {
    if (isAnimating) return; // منع التقليب أثناء الانيميشن
    
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
        // إضافة تأثير عند التحميل
        page.addEventListener('animationend', function() {
            this.classList.remove('flipping-out');
        });
    });
    
    // إضافة تأثير للغلاف
    const cover = document.querySelector('.cover-page');
    if (cover) {
        cover.addEventListener('click', function() {
            if (currentPage === 0 && !isAnimating) {
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
        if (isAnimating) return; // منع التأثير أثناء الانيميشن
        
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
    if (pageNumber >= 0 && pageNumber <= totalPages && !isAnimating) {
        currentPage = pageNumber;
        showPage(currentPage);
        updateNavigation();
    }
}

// إضافة دعم النقر على أرقام الصفحات
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('page-number') && !isAnimating) {
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

// إضافة مؤشر تحميل للصوت
function showAudioLoadingIndicator() {
    const audio = document.getElementById('pageFlipSound');
    if (audio) {
        audio.addEventListener('loadstart', function() {
            console.log('جاري تحميل الصوت...');
        });
        
        audio.addEventListener('canplaythrough', function() {
            console.log('تم تحميل الصوت بنجاح');
        });
        
        audio.addEventListener('error', function() {
            console.log('خطأ في تحميل الصوت، سيتم استخدام الصوت البديل');
        });
    }
}

// تشغيل مؤشر تحميل الصوت
document.addEventListener('DOMContentLoaded', function() {
    showAudioLoadingIndicator();
}); 