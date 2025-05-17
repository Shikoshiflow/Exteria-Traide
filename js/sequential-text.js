// JavaScript для последовательной анимации текста
document.addEventListener('DOMContentLoaded', function() {
    // Функция для запуска анимации последовательного текста
    function startSequentialAnimation() {
        // Сначала скрываем оба элемента (на случай, если анимация запускается повторно)
        document.getElementById('line1').classList.remove('display-text');
        document.getElementById('line2').classList.remove('display-text');
        
        // Показываем первую строку через небольшую задержку
        setTimeout(() => {
            document.getElementById('line1').classList.add('display-text');
            
            // Показываем вторую строку через 2 секунды после первой
            setTimeout(() => {
                document.getElementById('line2').classList.add('display-text');
            }, 2000);
        }, 500);
    }

    // Функция для проверки, находится ли элемент в видимой области экрана
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Функция, которая запускает анимацию, когда элемент появляется в видимой области
    function handleScroll() {
        const container = document.querySelector('.sequential-text-container');
        if (container && isElementInViewport(container)) {
            startSequentialAnimation();
            // Удаляем обработчик события после первого запуска анимации
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // Запускаем анимацию при загрузке страницы, если элемент видим
    const container = document.querySelector('.sequential-text-container');
    if (container) {
        if (isElementInViewport(container)) {
            startSequentialAnimation();
        } else {
            // Если элемент не виден, добавляем обработчик события прокрутки
            window.addEventListener('scroll', handleScroll);
        }
    }
});