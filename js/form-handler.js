document.addEventListener('DOMContentLoaded', function() {
    // Находим форму и другие элементы
    const form = document.getElementById('inquiry-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');
    
    // Функция для показа статуса отправки
    function showStatus(type, message) {
        formStatus.className = 'status-message ' + type;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Функция для переключения состояния кнопки
    function toggleButtonState(isLoading) {
        if (isLoading) {
            buttonText.style.opacity = '0';
            buttonLoader.style.display = 'block';
            submitButton.disabled = true;
        } else {
            buttonText.style.opacity = '1';
            buttonLoader.style.display = 'none';
            submitButton.disabled = false;
        }
    }
    
    // Валидация email
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Валидация телефона
    function isValidPhone(phone) {
        // Базовая валидация - минимум 10 цифр
        return phone.replace(/\D/g, '').length >= 10;
    }
    
    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем значения полей
        const name = document.getElementById('name').value.trim();
        const company = document.getElementById('company').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Валидация полей
        if (!name) {
            showStatus('error', 'Пожалуйста, введите ваше имя.');
            return;
        }
        
        if (!isValidEmail(email)) {
            showStatus('error', 'Пожалуйста, введите корректный email адрес.');
            return;
        }
        
        if (!isValidPhone(phone)) {
            showStatus('error', 'Пожалуйста, введите корректный номер телефона.');
            return;
        }
        
        if (!service) {
            showStatus('error', 'Пожалуйста, выберите интересующую вас услугу.');
            return;
        }
        
        if (!message) {
            showStatus('error', 'Пожалуйста, введите ваше сообщение.');
            return;
        }
        
        // Показываем состояние загрузки
        showStatus('loading', 'Отправка заявки...');
        toggleButtonState(true);
        
        // Создаем объект FormData для отправки
        const formData = new FormData();
        formData.append('user_name', name);
        formData.append('user_company', company);
        formData.append('user_email', email);
        formData.append('user_phone', phone);
        formData.append('user_service', service);
        formData.append('user_message', message);
        
        // Отправляем запрос
        fetch('send-form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                showStatus('success', data.message);
                form.reset(); // Очищаем форму при успешной отправке
            } else {
                showStatus('error', data.message || 'Произошла ошибка при отправке заявки.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            showStatus('error', 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами другим способом.');
        })
        .finally(() => {
            // Возвращаем кнопку в исходное состояние
            toggleButtonState(false);
        });
    });
    
    // Добавляем маску для телефона для удобства пользователей
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '+' + x[1] + ' (' + x[2] + ') ' + (x[3] ? x[3] + '-' : '') + x[4];
        });
    }
});