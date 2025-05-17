// Самостоятельный скрипт для создания фона с точками и линиями
document.addEventListener('DOMContentLoaded', function() {
    createAnimatedBackground();
});

// Функция создания анимированного фона
function createAnimatedBackground() {
    // Удаляем старый canvas, если он существует
    const oldCanvas = document.getElementById('background-canvas');
    if (oldCanvas) {
        oldCanvas.remove();
    }
    
    // Создаем новый canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'background-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    
    // Вставляем canvas в начало body
    document.body.insertBefore(canvas, document.body.firstChild);
    
    // Получаем контекст для рисования
    const ctx = canvas.getContext('2d');
    
    // Устанавливаем размеры canvas
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    
    // Массив для хранения точек
    const points = [];
    const pointsCount = 80;
    const connectionDistance = 150;
    
    // Создаем точки
    function createPoints() {
        points.length = 0; // Очищаем массив
        
        for (let i = 0; i < pointsCount; i++) {
            points.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                color: Math.random() > 0.5 
                    ? [0, 102, 255] // Синий
                    : [0, 238, 255] // Голубой
            });
        }
    }
    createPoints();
    
    // Функция анимации
    function animate() {
        // Очистка canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Полупрозрачный фон
        ctx.fillStyle = 'rgba(5, 13, 26, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Рисуем связи между точками
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    
                    // Создаем градиент для линии
                    const gradient = ctx.createLinearGradient(
                        points[i].x, points[i].y,
                        points[j].x, points[j].y
                    );
                    gradient.addColorStop(0, `rgba(${points[i].color[0]}, ${points[i].color[1]}, ${points[i].color[2]}, ${opacity * 0.15})`);
                    gradient.addColorStop(1, `rgba(${points[j].color[0]}, ${points[j].color[1]}, ${points[j].color[2]}, ${opacity * 0.15})`);
                    
                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Рисуем и обновляем точки
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            
            // Рисуем точку
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, 0.6)`;
            ctx.fill();
            
            // Рисуем свечение вокруг точки
            ctx.beginPath();
            ctx.arc(point.x, point.y, point.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, 0.1)`;
            ctx.fill();
            
            // Обновляем позицию точки
            point.x += point.vx;
            point.y += point.vy;
            
            // Проверяем границы экрана
            if (point.x < 0 || point.x > canvas.width) {
                point.vx *= -1;
            }
            if (point.y < 0 || point.y > canvas.height) {
                point.vy *= -1;
            }
        }
        
        // Продолжаем анимацию
        requestAnimationFrame(animate);
    }
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        setCanvasSize();
        createPoints();
    });
    
    // Запускаем анимацию
    animate();
}

// Запускаем создание фона сразу, если DOM уже загружен
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    createAnimatedBackground();
}

// Дополнительный вызов через таймаут для надежности
setTimeout(createAnimatedBackground, 1000);