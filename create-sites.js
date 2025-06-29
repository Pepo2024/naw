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
function createSite(personName, siteNumber) {
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
    <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="book-container">
        <div class="book">
            <!-- الصفحة الأولى - فارغة -->
            <div class="page page-1" id="page1">
                <div class="page-content">
                    <div class="page-number">1</div>
                </div>
            </div>

            <!-- الصفحة الثانية - المواعيد -->
            <div class="page page-2" id="page2">
                <div class="page-content">
                    <h2 class="page-title">المواعيد</h2>
                    <div class="appointments">
                        <div class="appointment-item">
                            <span class="time">08:00 ص</span>
                            <span class="description">موعد الصباح</span>
                        </div>
                        <div class="appointment-item">
                            <span class="time">12:00 م</span>
                            <span class="description">موعد الظهر</span>
                        </div>
                        <div class="appointment-item">
                            <span class="time">04:00 م</span>
                            <span class="description">موعد العصر</span>
                        </div>
                        <div class="appointment-item">
                            <span class="time">08:00 م</span>
                            <span class="description">موعد المساء</span>
                        </div>
                    </div>
                    <div class="page-number">2</div>
                </div>
            </div>

            <!-- الصفحة الثالثة - النص المركزي -->
            <div class="page page-3" id="page3">
                <div class="page-content">
                    <div class="central-text">
                        <h1>الرب يرعاني فلا يعوزني شئ - ${personName}</h1>
                        <p class="verse-text">مزمور 23:1</p>
                    </div>
                    <div class="page-number">3</div>
                </div>
            </div>

            <!-- الصفحة الرابعة - الصور -->
            <div class="page page-4" id="page4">
                <div class="page-content">
                    <div class="images-section">
                        <div class="image-placeholder">
                            <div class="image-frame">
                                <span class="image-text">صورة 1</span>
                            </div>
                        </div>
                        <div class="image-placeholder">
                            <div class="image-frame">
                                <span class="image-text">صورة 2</span>
                            </div>
                        </div>
                        <div class="image-placeholder">
                            <div class="image-frame">
                                <span class="image-text">صورة 3</span>
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
            <span class="page-indicator" id="pageIndicator">الصفحة 1 من 7</span>
            <button class="nav-btn next-btn" onclick="nextPage()">
                <span>التالي</span>
            </button>
        </div>
    </div>

    <!-- صوت تقليب الصفحات -->
    <audio id="pageFlipSound" preload="auto">
        <source src="page-flip.mp3" type="audio/mpeg">
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
    font-family: 'Amiri', serif;
    background: linear-gradient(135deg, #8B4513, #A0522D);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    direction: rtl;
}

.book-container {
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
    perspective: 1000px;
}

.book {
    position: relative;
    width: 100%;
    height: 600px;
    transform-style: preserve-3d;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background: #8B4513;
}

.page {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #F5F5DC;
    border-radius: 5px;
    padding: 20px;
    display: none;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
    border: 1px solid #D2B48C;
}

.page.active {
    display: block;
    animation: pageFlip 0.6s ease-in-out;
}

@keyframes pageFlip {
    0% {
        transform: rotateY(0deg);
        opacity: 0.8;
    }
    50% {
        transform: rotateY(90deg);
        opacity: 0.5;
    }
    100% {
        transform: rotateY(0deg);
        opacity: 1;
    }
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
    bottom: 10px;
    left: 10px;
    font-size: 14px;
    color: #666;
    font-weight: bold;
}

/* الصفحة الثانية - المواعيد */
.page-title {
    text-align: center;
    color: #8B4513;
    font-size: 24px;
    margin-bottom: 30px;
    font-weight: bold;
}

.appointments {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0;
}

.appointment-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: linear-gradient(135deg, #F0E68C, #F5DEB3);
    border-radius: 10px;
    border: 2px solid #DAA520;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.time {
    font-size: 18px;
    font-weight: bold;
    color: #8B4513;
}

.description {
    font-size: 16px;
    color: #654321;
}

/* الصفحة الثالثة - النص المركزي */
.central-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px 20px;
}

.central-text h1 {
    font-size: 28px;
    color: #8B4513;
    margin-bottom: 20px;
    line-height: 1.4;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.verse-text {
    font-size: 18px;
    color: #654321;
    font-style: italic;
}

/* الصفحة الرابعة - الصور */
.images-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0;
}

.image-placeholder {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-frame {
    width: 100%;
    height: 120px;
    background: linear-gradient(135deg, #F0E68C, #F5DEB3);
    border: 3px solid #DAA520;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-text {
    font-size: 16px;
    color: #8B4513;
    font-weight: bold;
}

/* أزرار التنقل */
.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 0 10px;
}

.nav-btn {
    background: linear-gradient(135deg, #8B4513, #A0522D);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    font-family: 'Amiri', serif;
}

.nav-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #A0522D, #CD853F);
}

.nav-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
    background: rgba(139, 69, 19, 0.8);
    padding: 8px 16px;
    border-radius: 20px;
}

/* تحسينات للموبايل */
@media (max-width: 480px) {
    .book-container {
        max-width: 350px;
        margin: 10px auto;
    }
    
    .book {
        height: 500px;
    }
    
    .central-text h1 {
        font-size: 24px;
    }
    
    .page-title {
        font-size: 20px;
    }
    
    .nav-btn {
        padding: 10px 16px;
        font-size: 14px;
    }
    
    .page-indicator {
        font-size: 14px;
        padding: 6px 12px;
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
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    pointer-events: none;
    border-radius: 10px;
}

/* تأثير الظل للصفحات */
.page::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.1), transparent);
    border-radius: 0 5px 5px 0;
}`;

    // محتوى ملف JavaScript
    const jsContent = `let currentPage = 1;
const totalPages = 7;

// تهيئة الصفحة الأولى
document.addEventListener('DOMContentLoaded', function() {
    showPage(currentPage);
    updateNavigation();
});

// دالة عرض الصفحة
function showPage(pageNumber) {
    // إخفاء جميع الصفحات
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById(\`page\${i}\`);
        if (page) {
            page.classList.remove('active');
        }
    }
    
    // عرض الصفحة المطلوبة
    const currentPageElement = document.getElementById(\`page\${pageNumber}\`);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
    }
    
    // تحديث مؤشر الصفحة
    document.getElementById('pageIndicator').textContent = \`الصفحة \${pageNumber} من \${totalPages}\`;
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
    if (currentPage > 1) {
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
        prevBtn.disabled = currentPage === 1;
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
        });
    }
}

// إضافة دعم لوحة المفاتيح
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            event.preventDefault();
            nextPage();
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            event.preventDefault();
            previousPage();
            break;
    }
});

// إضافة دعم اللمس للموبايل
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
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
        page.style.animationDelay = \`\${index * 0.1}s\`;
        
        // إضافة تأثير عند التحميل
        page.addEventListener('animationend', function() {
            this.style.animationDelay = '0s';
        });
    });
}

// تشغيل التأثيرات البصرية عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    addVisualEffects();
});

// دالة لإنشاء صوت تقليب الصفحات (بديل إذا لم يكن هناك ملف صوت)
function createPageFlipSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// استخدام الصوت البديل إذا لم يكن هناك ملف صوت
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('pageFlipSound');
    if (audio && audio.error) {
        // إذا فشل تحميل ملف الصوت، استخدم الصوت البديل
        window.playPageFlipSound = createPageFlipSound;
    }
});`;

    // كتابة الملفات
    fs.writeFileSync(path.join(siteDir, 'index.html'), htmlContent);
    fs.writeFileSync(path.join(siteDir, 'style.css'), cssContent);
    fs.writeFileSync(path.join(siteDir, 'script.js'), jsContent);
    
    // إنشاء ملف README خاص بالموقع
    const readmeContent = `# كتاب ${personName}

هذا الكتاب مخصص لـ ${personName}

## كيفية الاستخدام
1. افتح ملف index.html في المتصفح
2. استخدم أزرار التنقل للتصفح
3. يمكنك استخدام الأسهم في لوحة المفاتيح
4. على الموبايل، اسحب للتنقل

## المحتوى
- الصفحة الأولى: فارغة
- الصفحة الثانية: المواعيد
- الصفحة الثالثة: النص المركزي
- الصفحة الرابعة: الصور
- باقي الصفحات: فارغة للتخصيص

تم إنشاؤه في ${new Date().toLocaleDateString('ar-EG')}
`;
    
    fs.writeFileSync(path.join(siteDir, 'README.md'), readmeContent);
    
    console.log(`✅ تم إنشاء موقع ${personName} في مجلد ${siteDir}`);
}

// دالة رئيسية لإنشاء جميع المواقع
function createAllSites() {
    console.log('🚀 بدء إنشاء 60 موقع...\n');
    
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
        createSite(personName, i + 1);
    }
    
    // إنشاء ملف قائمة بالمواقع
    const sitesList = names.slice(0, 60).map((name, index) => {
        return `${index + 1}. ${name} - site-${index + 1}-${name}`;
    }).join('\n');
    
    const listContent = `# قائمة المواقع المنشأة

تم إنشاء ${60} موقع بنجاح:

${sitesList}

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
}

// تشغيل البرنامج
if (require.main === module) {
    createAllSites();
}

module.exports = { createSite, createAllSites }; 