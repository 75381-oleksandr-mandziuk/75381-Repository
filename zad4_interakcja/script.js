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
