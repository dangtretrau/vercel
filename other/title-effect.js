const tabTitles = [
    "AsTiC tEcH",
    "aStIc TeCh",
    "ASTIC TECH",
    "astic tech"
];
let tabTitleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 270;
const deletingSpeed = 270;
const pauseTime = 1000;

function typeWriterEffect() {
    const currentTitle = tabTitles[tabTitleIndex];
    let currentText = document.title;
    
    if (isDeleting) {
        currentText = currentTitle.substring(0, currentText.length - 1);
        charIndex = currentText.length;
    } else {
        currentText = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    document.title = currentText;

    if (!isDeleting && currentText === currentTitle) {
        isDeleting = true;
        setTimeout(typeWriterEffect, pauseTime);
    } else if (isDeleting && currentText === '') {
        isDeleting = false;
        tabTitleIndex = (tabTitleIndex + 1) % tabTitles.length; 
        charIndex = 0;
        setTimeout(typeWriterEffect, 500); 
    } else {
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeWriterEffect, speed);
    }
}

const rotatingTexts = [
    "astic tech founders.",
    "make it work then make it better.",
    "keep it simple.",
    "no need to be fussy."
];

const headerTextElement = document.getElementById('header-text');
let currentTextIndex = 0;
const displayDuration = 3000; 

function updateHeaderText() {
    if (!headerTextElement) return;

    headerTextElement.textContent = rotatingTexts[currentTextIndex];

    headerTextElement.classList.remove('fade-animation');
    void headerTextElement.offsetWidth; 
    headerTextElement.classList.add('fade-animation');

    currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;

    setTimeout(updateHeaderText, displayDuration);
}

document.addEventListener('DOMContentLoaded', () => {
    typeWriterEffect();
    setTimeout(updateHeaderText, 500); 
});

