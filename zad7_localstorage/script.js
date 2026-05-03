// --- THEME ---
const themeBtn = document.getElementById('theme-btn');
const themeStyle = document.getElementById('theme-style');

if (themeBtn && themeStyle) {
    themeBtn.addEventListener('click', () => {
        const currentTheme = themeStyle.getAttribute('href');

        if (currentTheme === 'red.css') {
            themeStyle.setAttribute('href', 'green.css');
            themeBtn.textContent = 'Zmień motyw (Czerwony)';
        } else {
            themeStyle.setAttribute('href', 'red.css');
            themeBtn.textContent = 'Zmień motyw (Zielony)';
        }
    });
}

// --- TOGGLE SECTION ---
const toggleSectionBtn = document.getElementById('toggle-section-btn');
const omnieSekcja = document.getElementById('omnie-sekcja');

if (toggleSectionBtn && omnieSekcja) {
    toggleSectionBtn.addEventListener('click', () => {
        if (omnieSekcja.style.display === 'none') {
            omnieSekcja.style.display = 'block';
            toggleSectionBtn.textContent = 'Ukryj O mnie';
        } else {
            omnieSekcja.style.display = 'none';
            toggleSectionBtn.textContent = 'Pokaż O mnie';
        }
    });
}

// --- FORM VALIDATION ---
const kontaktForm = document.getElementById('kontakt-form');

if (kontaktForm) {
    kontaktForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        const imieError = document.getElementById('imie-error');
        const nazwiskoError = document.getElementById('nazwisko-error');
        const emailError = document.getElementById('email-error');
        const wiadomoscError = document.getElementById('wiadomosc-error');

        if (imieError) imieError.textContent = '';
        if (nazwiskoError) nazwiskoError.textContent = '';
        if (emailError) emailError.textContent = '';
        if (wiadomoscError) wiadomoscError.textContent = '';

        const imie = document.getElementById('imie')?.value.trim() || '';
        const nazwisko = document.getElementById('nazwisko')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const wiadomosc = document.getElementById('wiadomosc')?.value.trim() || '';

        const hasNumber = /\d/;
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!imie) {
            imieError.textContent = 'Pole Imię jest wymagane.';
            isValid = false;
        } else if (hasNumber.test(imie)) {
            imieError.textContent = 'Imię nie może zawierać cyfr.';
            isValid = false;
        }

        if (!nazwisko) {
            nazwiskoError.textContent = 'Pole Nazwisko jest wymagane.';
            isValid = false;
        } else if (hasNumber.test(nazwisko)) {
            nazwiskoError.textContent = 'Nazwisko nie może zawierać cyfr.';
            isValid = false;
        }

        if (!email) {
            emailError.textContent = 'Pole E-mail jest wymagane.';
            isValid = false;
        } else if (!validEmail.test(email)) {
            emailError.textContent = 'Podaj poprawny adres e-mail.';
            isValid = false;
        }

        if (!wiadomosc) {
            wiadomoscError.textContent = 'Pole Wiadomość jest wymagane.';
            isValid = false;
        }

        if (isValid) {
            alert('Formularz uzupełniony poprawnie! (Dane nie wysłano - brak backendu).');
            kontaktForm.reset();
        }
    });
}

// --- FETCH JSON ---
fetch('data.json')
    .then(res => {
        if (!res.ok) throw new Error('Błąd ładowania JSON');
        return res.json();
    })
    .then(data => {
        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };

        setText('cv-imie-nazwisko', data.naglowek.imieNazwisko);
        setText('cv-indeks', data.naglowek.indeks);

        const emailEl = document.getElementById('cv-email');
        if (emailEl) {
            emailEl.textContent = data.kontakt.email;
            emailEl.href = `mailto:${data.kontakt.email}`;
        }

        const telEl = document.getElementById('cv-telefon');
        if (telEl) {
            telEl.textContent = data.kontakt.telefon;
            telEl.href = `tel:${data.kontakt.telefon.replace(/\s/g, '')}`;
        }

        setText('cv-miasto', `Miasto: ${data.kontakt.miasto}`);

        const github = document.getElementById('cv-github');
        if (github) github.href = data.kontakt.github;

        const linkedin = document.getElementById('cv-linkedin');
        if (linkedin) linkedin.href = data.kontakt.linkedin;

        const img = document.getElementById('cv-zdjecie');
        if (img) {
            img.src = data.oMnie.zdjecie;
            img.alt = data.oMnie.alt;
        }

        setText('cv-omnie-tekst', data.oMnie.tekst);

        const listaUmiejetnosci = document.getElementById('lista-umiejetnosci');
        if (listaUmiejetnosci) {
            listaUmiejetnosci.innerHTML = '';
            data.umiejetnosci.forEach(u => {
                const li = document.createElement('li');
                li.textContent = u;
                listaUmiejetnosci.appendChild(li);
            });
        }

        const dosw = document.getElementById('doswiadczenie-kontener');
        if (dosw) {
            dosw.innerHTML = '';
            data.doswiadczenie.forEach(d => {
                const article = document.createElement('article');
                article.innerHTML = `<h3>${d.stanowisko}</h3><p>${d.opis}</p>`;
                dosw.appendChild(article);
            });
        }

        const edu = document.getElementById('edukacja-kontener');
        if (edu) {
            edu.innerHTML = `<strong>${data.edukacja.uczelnia}</strong><br>
            Kierunek: ${data.edukacja.kierunek}<br>
            Numer albumu: ${data.edukacja.indeks}<br>
            Rok studiów: ${data.edukacja.rok}`;
        }

        const projekty = document.getElementById('lista-projektow');
        if (projekty) {
            projekty.innerHTML = '';
            data.projekty.forEach(p => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${p.nazwa}:</strong> ${p.opis}`;
                projekty.appendChild(li);
            });
        }

        setText('cv-stopka', data.stopka);
    })
    .catch(err => console.error(err));


// --- LOCAL STORAGE (NOTATKI) ---
const poleNotatki = document.getElementById('nowa-notatka');
const dodajNotatkeBtn = document.getElementById('dodaj-notatke-btn');
const listaNotatekUl = document.getElementById('lista-notatek');

const LS_KEY = 'notatki_75381';

function pobierzNotatki() {
    try {
        return JSON.parse(localStorage.getItem(LS_KEY)) || [];
    } catch {
        return [];
    }
}

function zapiszNotatki(notatki) {
    localStorage.setItem(LS_KEY, JSON.stringify(notatki));
}

function renderujNotatki() {
    if (!listaNotatekUl) return;

    listaNotatekUl.innerHTML = '';
    const notatki = pobierzNotatki();

    notatki.forEach((tekst, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = tekst;

        const btn = document.createElement('button');
        btn.textContent = 'Usuń';

        btn.onclick = () => {
            const arr = pobierzNotatki();
            arr.splice(index, 1);
            zapiszNotatki(arr);
            renderujNotatki();
        };

        li.appendChild(span);
        li.appendChild(btn);
        listaNotatekUl.appendChild(li);
    });
}

if (dodajNotatkeBtn) {
    dodajNotatkeBtn.addEventListener('click', () => {
        const tekst = poleNotatki.value.trim();
        if (!tekst) return;

        const notatki = pobierzNotatki();
        notatki.push(tekst);

        zapiszNotatki(notatki);
        poleNotatki.value = '';

        renderujNotatki();
    });
}

renderujNotatki();
