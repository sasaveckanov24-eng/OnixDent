/**
 * Оникс Dent — Клиентские скрипты взаимодействия
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Мобильное меню навигации
  const burgerBtn = document.getElementById('burger-toggle');
  const mainNav = document.getElementById('main-nav');

  const closeMenu = () => {
    if (burgerBtn && mainNav) {
      burgerBtn.setAttribute('aria-expanded', 'false');
      burgerBtn.classList.remove('is-active');
      mainNav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  const openMenu = () => {
    if (burgerBtn && mainNav) {
      burgerBtn.setAttribute('aria-expanded', 'true');
      burgerBtn.classList.add('is-active');
      mainNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  };

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', () => {
      const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Закрытие при клике по любому пункту меню или кнопке внутри
    mainNav.querySelectorAll('.nav__link, .nav__mobile-cta').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !burgerBtn.contains(e.target) && mainNav.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  // 2. Маска ввода для телефона (+7)
  const phoneInput = document.getElementById('client-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.startsWith('8')) value = '7' + value.slice(1);
      if (!value.startsWith('7')) value = '7' + value;

      let formatted = '+7';
      if (value.length > 1) {
        formatted += ' (' + value.substring(1, 4);
      }
      if (value.length >= 5) {
        formatted += ') ' + value.substring(4, 7);
      }
      if (value.length >= 8) {
        formatted += '-' + value.substring(7, 9);
      }
      if (value.length >= 10) {
        formatted += '-' + value.substring(9, 11);
      }
      e.target.value = formatted;
    });
  }

  // 3. Валидация и отправка формы консультации
  const consultationForm = document.getElementById('consultation-form');
  const nameInput = document.getElementById('client-name');
  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  const successMsg = document.getElementById('form-success-msg');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Валидация имени
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameError.style.display = 'block';
        nameInput.setAttribute('aria-invalid', 'true');
        isValid = false;
      } else {
        nameError.style.display = 'none';
        nameInput.removeAttribute('aria-invalid');
      }

      // Валидация телефона (минимум 11 цифр)
      const rawDigits = phoneInput.value.replace(/\D/g, '');
      if (rawDigits.length < 11) {
        phoneError.style.display = 'block';
        phoneInput.setAttribute('aria-invalid', 'true');
        isValid = false;
      } else {
        phoneError.style.display = 'none';
        phoneInput.removeAttribute('aria-invalid');
      }

      if (!isValid) return;

      // Имитация отправки (в тестовом режиме не сохраняет данные)
      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Обработка заявки...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        consultationForm.reset();
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 700);
    });
  }
});
