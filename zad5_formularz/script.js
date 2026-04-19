const themeBtn = document.getElementById('theme-btn');
const themeStyle = document.getElementById('theme-style');

themeBtn.addEventListener('click', function() {
    if (themeStyle.getAttribute('href') === 'red.css') {
        themeStyle.setAttribute('href', 'green.css');
        themeBtn.textContent = 'Zmień motyw (Czerwony)';
    } else {
        themeStyle.setAttribute('href', 'red.css');
        themeBtn.textContent = 'Zmień motyw (Zielony)';
    }
});


const toggleSectionBtn = document.getElementById('toggle-section-btn');
const omnieSekcja = document.getElementById('omnie-sekcja');

toggleSectionBtn.addEventListener('click', function() {
    if (omnieSekcja.style.display !== 'none') {
        omnieSekcja.style.display = 'none'; 
        toggleSectionBtn.textContent = 'Pokaż O mnie'; 
    } else {
        omnieSekcja.style.display = 'block'; 
        toggleSectionBtn.textContent = 'Ukryj O mnie';
    }
});

const kontaktForm = document.getElementById('kontakt-form');

kontaktForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    let isValid = true;

    document.getElementById('imie-error').textContent = '';
    document.getElementById('nazwisko-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('wiadomosc-error').textContent = '';

    const imie = document.getElementById('imie').value.trim();
    const nazwisko = document.getElementById('nazwisko').value.trim();
    const email = document.getElementById('email').value.trim();
    const wiadomosc = document.getElementById('wiadomosc').value.trim();

    const hasNumber = /\d/; 
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (!imie) {
        document.getElementById('imie-error').textContent = 'Pole Imię jest wymagane.';
        isValid = false;
    } else if (hasNumber.test(imie)) {
        document.getElementById('imie-error').textContent = 'Imię nie może zawierać cyfr.';
        isValid = false;
    }

    if (!nazwisko) {
        document.getElementById('nazwisko-error').textContent = 'Pole Nazwisko jest wymagane.';
        isValid = false;
    } else if (hasNumber.test(nazwisko)) {
        document.getElementById('nazwisko-error').textContent = 'Nazwisko nie może zawierać cyfr.';
        isValid = false;
    }

    if (!email) {
        document.getElementById('email-error').textContent = 'Pole E-mail jest wymagane.';
        isValid = false;
    } else if (!validEmail.test(email)) {
        document.getElementById('email-error').textContent = 'Podaj poprawny adres e-mail.';
        isValid = false;
    }

    if (!wiadomosc) {
        document.getElementById('wiadomosc-error').textContent = 'Pole Wiadomość jest wymagane.';
        isValid = false;
    }

    if (isValid) {
        alert('Formularz uzupełniony poprawnie! (Dane nie wysłano - brak backendu).');
        kontaktForm.reset(); 
    }
});
