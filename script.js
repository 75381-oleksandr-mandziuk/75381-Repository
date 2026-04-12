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
const projektySekcja = document.getElementById('projekty-sekcja');

toggleSectionBtn.addEventListener('click', function() {
    if (projektySekcja.style.display !== 'none') {
        projektySekcja.style.display = 'none';
        toggleSectionBtn.textContent = 'Pokaż Projekty';
    } else {
        projektySekcja.style.display = 'block';
        toggleSectionBtn.textContent = 'Ukryj Projekty';
    }
});
