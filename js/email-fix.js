// JavaScript для обработки формы с помощью EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация EmailJS с вашим ID пользователя
    emailjs.init("3PunwnG65M1Q2yKCq"); // Замените на ваш реальный ключ
    
    const form = document.getElementById('inquiry-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');
    
    // Функция валидации email
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Функция валидации телефона (базовая)
    function isValidPhone(phone) {
        return phone.replace(/\D/g, '').length >= 10;
    }
    
    // Функция для отображения статуса
    function showStatus(type, message) {
        formStatus.className = 'status-message ' + type;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        formStatus.classList.add('fade-in-up');
        
        // Удаляем класс анимации после завершения
        setTimeout(() => {
            formStatus.classList.remove('fade-in-up');
        }, 500);
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
    
    // Обработка отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Валидация полей формы
        const name = form.querySelector('#name').value.trim();
        const company = form.querySelector('#company').value.trim();
        const email = form.querySelector('#email').value.trim();
        const phone = form.querySelector('#phone').value.trim();
        const service = form.querySelector('#service').value;
        const message = form.querySelector('#message').value.trim();
        
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
        
        // Создаем объект с параметрами для EmailJS
    const templateParams = {
    to_name: 'Exteria',
    to_email: 'Mansur.malsagov@exteriatrade.com',
    user_name: name, // Поменяли from_name на user_name
    user_email: email, // Поменяли from_email на user_email
    user_company: company, // Поменяли company на user_company
    user_phone: phone, // Поменяли phone на user_phone
    user_service: service, // Поменяли service на user_service
    user_message: message, // Поменяли message на user_message
    reply_to: email
};
        
        // Отправляем форму через EmailJS
        emailjs.send(
            'service_raa52sw',  // ID сервиса из EmailJS
            'template_cy8c54u', // ID шаблона из EmailJS
            templateParams
        )
        .then(function(response) {
            console.log('Успешно отправлено!', response);
            showStatus('success', 'Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.');
            form.reset();
            
            // Прокрутка к сообщению об успехе
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(function(error) {
            console.error('Ошибка!', error);
            showStatus('error', 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами другим способом.');
        })
        .finally(() => {
            // Возвращаем кнопку в исходное состояние через 2 секунды
            setTimeout(() => {
                toggleButtonState(false);
            }, 2000);
        });
    });
    
    // Добавляем маску для телефона
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '+' + x[1] + ' (' + x[2] + ') ' + (x[3] ? x[3] + '-' : '') + x[4];
    });
});