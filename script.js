document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quiz-form');
    const successMessage = document.getElementById('success-message');
    const btnNext = document.getElementById('btn-next');
    const questions = document.querySelectorAll('.question-block');
    
    let currentQuestion = 0;
    const totalQuestions = questions.length;

    // Показати перше питання
    showQuestion(0);

    // Кнопка "Дальше"
    btnNext.addEventListener('click', () => {
        const currentInput = questions[currentQuestion].querySelector('.answer-input');
        
        // Перевіряємо, чи щось написано
        if (currentInput.value.trim() === '') {
            currentInput.style.borderColor = '#ff4d6d';
            currentInput.placeholder = 'Напиши что-нибудь...';
            return;
        }

        // Якщо це останнє питання — відправляємо форму
        if (currentQuestion === totalQuestions - 1) {
            sendForm();
            return;
        }

        // Ховаємо поточне, показуємо наступне
        questions[currentQuestion].classList.remove('active');
        currentQuestion++;
        showQuestion(currentQuestion);

        // Якщо це останнє питання — змінюємо текст кнопки
        if (currentQuestion === totalQuestions - 1) {
            btnNext.innerText = 'Отправить';
        }
    });

    // Показати питання за індексом
    function showQuestion(index) {
        questions[index].classList.add('active');
        const input = questions[index].querySelector('.answer-input');
        setTimeout(() => input.focus(), 300);
    }

    // Відправити форму
    function sendForm() {
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                form.style.display = 'none';
                successMessage.classList.add('visible');
            } else {
                alert('Ошибка! Попробуй ещё раз.');
            }
        })
        .catch(error => {
            alert('Ошибка! Попробуй ещё раз.');
        });
    }
});