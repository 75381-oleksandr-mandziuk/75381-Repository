
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


fetch('data.json')
    .then(response => {
        if (!response.ok) throw new Error('Błąd ładowania danych JSON');
        return response.json();
    })
    .then(data => {

        document.getElementById('cv-imie-nazwisko').textContent = data.naglowek.imieNazwisko;
        document.getElementById('cv-indeks').textContent = data.naglowek.indeks;


        const emailEl = document.getElementById('cv-email');
        emailEl.textContent = data.kontakt.email;
        emailEl.href = `mailto:${data.kontakt.email}`;

        const telEl = document.getElementById('cv-telefon');
        telEl.textContent = data.kontakt.telefon;

        telEl.href = `tel:${data.kontakt.telefon.replace(/\s/g, '')}`;

        document.getElementById('cv-miasto').textContent = `Miasto: ${data.kontakt.miasto}`;
        document.getElementById('cv-github').href = data.kontakt.github;
        document.getElementById('cv-linkedin').href = data.kontakt.linkedin;

        const imgEl = document.getElementById('cv-zdjecie');
        imgEl.src = data.oMnie.zdjecie;
        imgEl.alt = data.oMnie.alt;
        document.getElementById('cv-omnie-tekst').textContent = data.oMnie.tekst;

        const listaUmiejetnosci = document.getElementById('lista-umiejetnosci');
        data.umiejetnosci.forEach(umiejetnosc => {
            const li = document.createElement('li');
            li.textContent = umiejetnosc;
            listaUmiejetnosci.appendChild(li);
        });

        const doswiadczenieKontener = document.getElementById('doswiadczenie-kontener');
        data.doswiadczenie.forEach(d => {
            const article = document.createElement('article');
            article.innerHTML = `<h3>${d.stanowisko}</h3><p>${d.opis}</p>`;
            doswiadczenieKontener.appendChild(article);
        });

        const edu = data.edukacja;
        document.getElementById('edukacja-kontener').innerHTML = 
            `<strong>${edu.uczelnia}</strong><br>Kierunek: ${edu.kierunek}<br>Numer albumu: ${edu.indeks}<br>Rok studiów: ${edu.rok}`;

        const listaProjektow = document.getElementById('lista-projektow');
        data.projekty.forEach(projekt => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${projekt.nazwa}:</strong> ${projekt.opis}`;
            listaProjektow.appendChild(li);
        });

        document.getElementById('cv-stopka').textContent = data.stopka;
    })
    .catch(error => {
        console.error('Wystąpił błąd podczas pobierania JSON:', error);
    });
