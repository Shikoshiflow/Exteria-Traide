// JavaScript для слайдера изображений
document.addEventListener('DOMContentLoaded', function() {
    initImageSlider();
});

function initImageSlider() {
    const slider = document.querySelector('.hero-image-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slider-img');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const currentSlideEl = document.getElementById('current-slide');
    const totalSlidesEl = document.getElementById('total-slides');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayInterval;
    
    // Устанавливаем общее количество слайдов в счетчике
    if (totalSlidesEl) {
        totalSlidesEl.textContent = totalSlides;
    }
    
    // Функция для переключения на следующий слайд
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }
    
    // Функция для переключения на предыдущий слайд
    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    // Обновление состояния слайдера
    function updateSlider() {
        // Обновление активного класса для слайдов
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Обновление счетчика слайдов
        if (currentSlideEl) {
            currentSlideEl.textContent = currentIndex + 1;
        }
        
        // Перезапуск автопрокрутки
        resetAutoplay();
    }
    
    // Запуск автопрокрутки
    function startAutoplay() {
        autoplayInterval = setInterval(goToNextSlide, 10000); // Меняем слайд каждые 5 секунд
    }
    
    // Остановка и перезапуск автопрокрутки
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Обработчики событий для кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            goToPrevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            goToNextSlide();
        });
    }
    
    // Добавляем свайп-функционал для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Минимальное расстояние для свайпа
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Свайп влево - следующий слайд
            goToNextSlide();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Свайп вправо - предыдущий слайд
            goToPrevSlide();
        }
    }
    
    // Инициализация слайдера
    updateSlider();
    startAutoplay();
    
    // Остановка автопрокрутки при наведении мыши
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoplayInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        startAutoplay();
    });
}