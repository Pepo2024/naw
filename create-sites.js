const fs = require('fs');
const path = require('path');

// قائمة بأسماء الأشخاص (يمكنك تعديلها)
const names = [
    'أحمد', 'محمد', 'علي', 'فاطمة', 'خديجة', 'عائشة', 'عمر', 'عثمان', 'عبدالله',
    'عبدالرحمن', 'يوسف', 'إبراهيم', 'إسماعيل', 'إسحاق', 'يعقوب', 'داود', 'سليمان',
    'موسى', 'عيسى', 'نوح', 'إدريس', 'هود', 'صالح', 'لوط', 'شعيب', 'إبراهيم',
    'إسماعيل', 'إسحاق', 'يعقوب', 'يوسف', 'أيوب', 'يونس', 'إلياس', 'اليسع',
    'ذو الكفل', 'زكريا', 'يحيى', 'عيسى', 'محمد', 'أبو بكر', 'عمر', 'عثمان',
    'علي', 'الحسن', 'الحسين', 'عبدالله', 'عبدالرحمن', 'عبدالعزيز', 'عبدالملك',
    'عبدالوهاب', 'عبدالسلام', 'عبدالغفار', 'عبدالرزاق', 'عبدالفتاح', 'عبدالمنعم'
];

// دالة لإنشاء موقع واحد
function createSite(personName, siteNumber, originalPath) {
    const siteDir = `site-${siteNumber}-${personName}`;
    
    // إنشاء المجلد
    if (!fs.existsSync(siteDir)) {
        fs.mkdirSync(siteDir);
    }
    
    // محتوى ملف HTML
    const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>كتاب ${personName}</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Scheherazade+New:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="book-container">
        <div class="book">
            <!-- غلاف الكتاب -->
            <div class="page cover-page" id="cover">
                <div class="cover-content">
                    <div class="cover-title">
                        <h1>الرب يرعاني</h1>
                        <h2>فلا يعوزني شئ</h2>
                    </div>
                    <div class="cover-decoration">
                        <div class="ornament"></div>
                    </div>
                    <div class="cover-subtitle">
                        <p>كتاب ${personName} الإلكتروني</p>
                    </div>
                </div>
            </div>

            <!-- الصفحة الأولى - فارغة -->
            <div class="page page-1" id="page1">
                <div class="page-content">
                    <div class="page-number">1</div>
                </div>
            </div>

            <!-- الصفحة الثانية - فارغة -->
            <div class="page page-2" id="page2">
                <div class="page-content">
                    <div class="page-number">2</div>
                </div>
            </div>

            <!-- الصفحة الثالثة - فارغة -->
            <div class="page page-3" id="page3">
                <div class="page-content">
                    <div class="page-number">3</div>
                </div>
            </div>

            <!-- الصفحة الرابعة - صورة ونص -->
            <div class="page page-4" id="page4">
                <div class="page-content">
                    <div class="content-layout">
                        <div class="image-section">
                            <div class="image-container">
                                <div class="image-placeholder">
                                    <span class="image-text">صورة</span>
                                </div>
                            </div>
                        </div>
                        <div class="text-section">
                            <div class="text-content">
                                <h3>عنوان النص</h3>
                                <p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى.</p>
                                <p>يمكنك إضافة المزيد من النصوص هنا حسب الحاجة.</p>
                            </div>
                        </div>
                    </div>
                    <div class="page-number">4</div>
                </div>
            </div>

            <!-- الصفحة الخامسة - فارغة -->
            <div class="page page-5" id="page5">
                <div class="page-content">
                    <div class="page-number">5</div>
                </div>
            </div>

            <!-- الصفحة السادسة - فارغة -->
            <div class="page page-6" id="page6">
                <div class="page-content">
                    <div class="page-number">6</div>
                </div>
            </div>

            <!-- الصفحة السابعة - فارغة -->
            <div class="page page-7" id="page7">
                <div class="page-content">
                    <div class="page-number">7</div>
                </div>
            </div>
        </div>

        <!-- أزرار التنقل -->
        <div class="navigation">
            <button class="nav-btn prev-btn" onclick="previousPage()">
                <span>السابق</span>
            </button>
            <span class="page-indicator" id="pageIndicator">الغلاف</span>
            <button class="nav-btn next-btn" onclick="nextPage()">
                <span>التالي</span>
            </button>
        </div>
    </div>

    <!-- صوت تقليب الصفحات -->
    <audio id="pageFlipSound" preload="auto">
        <source src="yuVX-I7hj5c_[cut_1sec].mp3" type="audio/mpeg">
    </audio>

    <script src="script.js"></script>
</body>
</html>`;

    // محتوى ملف CSS
    const cssContent = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Scheherazade New', 'Amiri', serif;
    background: linear-gradient(135deg, #2c1810, #4a2c1a);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    direction: rtl;
    overflow-x: hidden;
}

.book-container {
    width: 100%;
    max-width: 450px;
    margin: 20px auto;
    perspective: 2000px;
}

.book {
    position: relative;
    width: 100%;
    height: 650px;
    transform-style: preserve-3d;
    box-shadow: 
        0 30px 60px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    border-radius: 15px;
    background: linear-gradient(145deg, #8B4513, #A0522D);
    transform: rotateY(-5deg);
    transition: transform 0.3s ease;
}

.book:hover {
    transform: rotateY(-2deg);
}

.page {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #FEFEFE;
    border-radius: 10px;
    padding: 25px;
    display: none;
    box-shadow: 
        inset 0 0 30px rgba(0, 0, 0, 0.05),
        0 0 0 1px rgba(0, 0, 0, 0.1);
    border: 1px solid #E8E8E8;
    transform-origin: left center;
    backface-visibility: hidden;
}

.page.active {
    display: block;
    animation: pageFlipIn 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.page.flipping-out {
    animation: pageFlipOut 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* انيميشن دخول الصفحة - تقليب من اليمين لليسار */
@keyframes pageFlipIn {
    0% {
        transform: rotateY(-180deg) translateX(100%);
        opacity: 0;
        box-shadow: 
            -20px 0 40px rgba(0, 0, 0, 0.3),
            inset 0 0 30px rgba(0, 0, 0, 0.05);
    }
    25% {
        transform: rotateY(-90deg) translateX(50%);
        opacity: 0.3;
        box-shadow: 
            -10px 0 20px rgba(0, 0, 0, 0.2),
            inset 0 0 30px rgba(0, 0, 0, 0.05);
    }
    50% {
        transform: rotateY(-45deg) translateX(25%);
        opacity: 0.6;
        box-shadow: 
            -5px 0 10px rgba(0, 0, 0, 0.1),
            inset 0 0 30px rgba(0, 0, 0, 0.05);
    }
    75% {
        transform: rotateY(-10deg) translateX(5%);
        opacity: 0.9;
        box-shadow: 
            -2px 0 5px rgba(0, 0, 0, 0.05),
            inset 0 0 30px rgba(0, 0, 0, 0.05);
    }
    100% {
        transform: rotateY(0deg) translateX(0%);
        opacity: 1;
        box-shadow: 
            inset 0 0 30px rgba(0, 0, 0, 0.05),
            0 0 0 1px rgba(0, 0, 0, 0.1);
    }
}

/* انيميشن خروج الصفحة - تقليب من اليسار لليمين */
@keyframes pageFlipOut {
    0% {
        transform: rotateY(0deg) translateX(0%);
        opacity: 1;
        box-shadow: 
            inset 0 0 30px rgba(0, 0, 0, 0.05),
            0 0 0 1px rgba(0, 0, 0, 0.1);
    }
    25% {
        transform: rotateY(10deg) translateX(-5%);
        opacity: 0.9;
        box-shadow: 
            2px 0 5px rgba(0, 0, 0, 0.05),
            inset 0 0 30px rgba(0, 0, 0, 0.05);
    }
    50% {
        transform: rotateY(45deg) translateX(-25%);
        opacity: 0.6;
        box-shadow: 
            5px 0 10px rgba(0, 0, 0, 0.1),
            inset 0 0 30px rgba(0, 0, 0, 0.05);
    }
    75% {
        transform: rotateY(90deg) translateX(-50%);
        opacity: 0.3;
        box-shadow: 
            10px 0 20px rgba(0, 0, 0, 0.2),
            inset 0 0 30px rgba(0, 0, 0, 0.05);
    }
    100% {
        transform: rotateY(180deg) translateX(-100%);
        opacity: 0;
        box-shadow: 
            20px 0 40px rgba(0, 0, 0, 0.3),
            inset 0 0 30px rgba(0, 0, 0, 0.05);
    }
}

/* تأثير الظل المتحرك أثناء التقليب */
.page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, 
        rgba(0, 0, 0, 0.1) 0%, 
        rgba(0, 0, 0, 0.05) 20%, 
        transparent 50%, 
        rgba(0, 0, 0, 0.05) 80%, 
        rgba(0, 0, 0, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    border-radius: 10px;
}

.page.flipping-out::before {
    opacity: 1;
}

/* غلاف الكتاب */
.cover-page {
    background: linear-gradient(145deg, #8B4513, #A0522D);
    border: 3px solid #654321;
    box-shadow: 
        inset 0 0 50px rgba(0, 0, 0, 0.3),
        0 10px 30px rgba(0, 0, 0, 0.4);
    position: relative;
    overflow: hidden;
}

.cover-page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.1) 0%, transparent 50%);
    pointer-events: none;
}

.cover-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #F5DEB3;
    position: relative;
    z-index: 2;
}

.cover-title h1 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    color: #FFD700;
    letter-spacing: 2px;
}

.cover-title h2 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 30px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    color: #F5DEB3;
}

.cover-decoration {
    margin: 30px 0;
}

.ornament {
    width: 80px;
    height: 80px;
    border: 3px solid #FFD700;
    border-radius: 50%;
    position: relative;
    margin: 0 auto;
}

.ornament::before,
.ornament::after {
    content: '';
    position: absolute;
    background: #FFD700;
}

.ornament::before {
    width: 60px;
    height: 3px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.ornament::after {
    width: 3px;
    height: 60px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.cover-subtitle p {
    font-size: 18px;
    color: #D2B48C;
    font-style: italic;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.page-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}

.page-number {
    position: absolute;
    bottom: 15px;
    left: 15px;
    font-size: 14px;
    color: #666;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.8);
    padding: 5px 10px;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* تخطيط الصفحة الرابعة */
.content-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 20px;
}

.image-section {
    flex: 0 0 200px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.image-container {
    width: 180px;
    height: 180px;
    border: 3px solid #DAA520;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #F0E68C, #F5DEB3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg, #F0E68C, #F5DEB3);
}

.image-text {
    font-size: 18px;
    color: #8B4513;
    font-weight: bold;
}

.text-section {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}

.text-content {
    max-width: 250px;
    text-align: right;
}

.text-content h3 {
    font-size: 22px;
    color: #8B4513;
    margin-bottom: 15px;
    font-weight: bold;
    border-bottom: 2px solid #DAA520;
    padding-bottom: 5px;
}

.text-content p {
    font-size: 16px;
    color: #654321;
    line-height: 1.6;
    margin-bottom: 10px;
    text-align: justify;
}

/* أزرار التنقل */
.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
    padding: 0 15px;
}

.nav-btn {
    background: linear-gradient(135deg, #8B4513, #A0522D);
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    font-family: 'Scheherazade New', serif;
    position: relative;
    overflow: hidden;
}

.nav-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.nav-btn:hover::before {
    left: 100%;
}

.nav-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #A0522D, #CD853F);
}

.nav-btn:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.page-indicator {
    font-size: 16px;
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    background: rgba(139, 69, 19, 0.9);
    padding: 10px 20px;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
}

/* تحسينات للموبايل */
@media (max-width: 480px) {
    .book-container {
        max-width: 380px;
        margin: 15px auto;
    }
    
    .book {
        height: 550px;
    }
    
    .cover-title h1 {
        font-size: 28px;
    }
    
    .cover-title h2 {
        font-size: 22px;
    }
    
    .ornament {
        width: 60px;
        height: 60px;
    }
    
    .ornament::before {
        width: 45px;
    }
    
    .ornament::after {
        height: 45px;
    }
    
    .image-container {
        width: 140px;
        height: 140px;
    }
    
    .text-content h3 {
        font-size: 20px;
    }
    
    .text-content p {
        font-size: 14px;
    }
    
    .nav-btn {
        padding: 12px 20px;
        font-size: 14px;
    }
    
    .page-indicator {
        font-size: 14px;
        padding: 8px 16px;
    }
}

/* تأثيرات إضافية للكتاب */
.book::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%);
    pointer-events: none;
    border-radius: 15px;
}

.book::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    pointer-events: none;
}

/* تأثير الظل للصفحات */
.page::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 100%;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.1), transparent);
    border-radius: 0 10px 10px 0;
}

/* تأثير الكتابة على الغلاف */
.cover-page::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 8px;
    pointer-events: none;
}`;

    // محتوى ملف JavaScript
    const jsContent = `let currentPage = 0; // 0 للغلاف، 1-7 للصفحات
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
        targetPage = document.getElementById(\`page\${pageNumber}\`);
    }
    
    if (targetPage) {
        // إضافة انيميشن الدخول
        targetPage.classList.add('active');
        
        // تشغيل الصوت
        playPageFlipSound();
        
        // إزالة حالة الانيميشن بعد انتهاء الانيميشن
        setTimeout(() => {
            isAnimating = false;
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
        indicator.textContent = \`الصفحة \${pageNumber} من \${totalPages}\`;
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
        return document.getElementById(\`page\${currentPage}\`);
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
        
        this.style.transform = \`rotateY(\${rotateY}deg) rotateX(\${rotateX}deg)\`;
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
});`;

    // كتابة الملفات
    fs.writeFileSync(path.join(siteDir, 'index.html'), htmlContent);
    fs.writeFileSync(path.join(siteDir, 'style.css'), cssContent);
    fs.writeFileSync(path.join(siteDir, 'script.js'), jsContent);
    
    // نسخ ملف الصوت إذا كان موجوداً
    const audioFile = 'yuVX-I7hj5c_[cut_1sec].mp3';
    const audioPath = path.join(originalPath, audioFile);
    if (fs.existsSync(audioPath)) {
        fs.copyFileSync(audioPath, path.join(siteDir, audioFile));
        console.log(`✅ تم نسخ ملف الصوت لموقع ${personName}`);
    } else {
        console.log(`⚠️ ملف الصوت غير موجود لموقع ${personName}`);
    }
    
    // إنشاء ملف README خاص بالموقع
    const readmeContent = `# كتاب ${personName}

هذا الكتاب مخصص لـ ${personName}

## المميزات الجديدة ✨
- ✅ غلاف احترافي مع تصميم ذهبي
- ✅ انيميشن تقليب الصفحات المحسن
- ✅ صوت تقليب الورق الواقعي
- ✅ تأثيرات بصرية متقدمة
- ✅ دعم كامل للموبايل واللمس

## كيفية الاستخدام
1. افتح ملف index.html في المتصفح
2. انقر على الغلاف للانتقال للصفحة الأولى
3. استخدم أزرار التنقل للتصفح
4. يمكنك استخدام الأسهم في لوحة المفاتيح
5. على الموبايل، اسحب للتنقل

## المحتوى
- الغلاف: تصميم احترافي مع النص الذهبي
- الصفحات 1-3: فارغة للتخصيص
- الصفحة 4: صورة على اليسار ونص على اليمين
- باقي الصفحات: فارغة للتخصيص

تم إنشاؤه في ${new Date().toLocaleDateString('ar-EG')}
`;
    
    fs.writeFileSync(path.join(siteDir, 'README.md'), readmeContent);
    
    console.log(`✅ تم إنشاء موقع ${personName} في مجلد ${siteDir}`);
}

// دالة رئيسية لإنشاء جميع المواقع
function createAllSites() {
    console.log('🚀 بدء إنشاء 60 موقع بالتصميم الجديد...\n');
    
    // حفظ المسار الأصلي
    const originalPath = process.cwd();
    
    // إنشاء مجلد رئيسي للمواقع
    const mainDir = 'all-sites';
    if (!fs.existsSync(mainDir)) {
        fs.mkdirSync(mainDir);
    }
    
    // تغيير المجلد الحالي
    process.chdir(mainDir);
    
    // إنشاء 60 موقع
    for (let i = 0; i < 60; i++) {
        const personName = names[i % names.length];
        createSite(personName, i + 1, originalPath);
    }
    
    // إنشاء ملف قائمة بالمواقع
    const sitesList = names.slice(0, 60).map((name, index) => {
        return `${index + 1}. ${name} - site-${index + 1}-${name}`;
    }).join('\n');
    
    const listContent = `# قائمة المواقع المنشأة - التصميم الجديد

تم إنشاء ${60} موقع بنجاح مع التصميم الجديد:

${sitesList}

## المميزات الجديدة
- غلاف احترافي مع تصميم ذهبي
- انيميشن تقليب الصفحات المحسن
- صوت تقليب الورق الواقعي
- تأثيرات بصرية متقدمة
- دعم كامل للموبايل واللمس

## كيفية الوصول للمواقع
1. انتقل إلى مجلد الموقع المطلوب
2. افتح ملف index.html في المتصفح
3. استمتع بالتصفح!

تم الإنشاء في ${new Date().toLocaleDateString('ar-EG')}
`;
    
    fs.writeFileSync('قائمة-المواقع.md', listContent);
    
    console.log('\n🎉 تم إنشاء جميع المواقع بنجاح!');
    console.log(`📁 تم حفظ المواقع في مجلد: ${mainDir}`);
    console.log('📋 يمكنك مراجعة قائمة المواقع في ملف: قائمة-المواقع.md');
    console.log('\n✨ المميزات الجديدة:');
    console.log('   - انيميشن تقليب الصفحات المحسن');
    console.log('   - صوت تقليب الورق الواقعي');
    console.log('   - تأثيرات بصرية متقدمة');
    console.log('   - منع التقليب المتعدد أثناء الانيميشن');
}

// تشغيل البرنامج
if (require.main === module) {
    createAllSites();
}

module.exports = { createSite, createAllSites }; 