const titles = [
    "welcome to",
    "my bio!"
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 270; // 250ms/ký tự
const deletingSpeed = 270;
const pauseTime = 1000;

function typeWriterEffect() {
    const currentTitle = titles[titleIndex];
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
        titleIndex = (titleIndex + 1) % titles.length; 
        charIndex = 0;
        setTimeout(typeWriterEffect, 500); 
    } else {
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeWriterEffect, speed);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    typeWriterEffect();
});