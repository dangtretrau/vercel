document.addEventListener('DOMContentLoaded', () => {

    const enterBtn = document.getElementById('enter-btn');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const bgVideo = document.getElementById('bg-video');
    const bgAudio = document.getElementById('bg-audio');
    const bioContainer = document.querySelector('.bio-container'); 
    function getRandomColor() {
        let color = Math.floor(Math.random()*16777215).toString(16);
        while(color.length < 6) {
            color = "0" + color;
        }
        return "#" + color;
    }

    if (bioContainer) {
        bioContainer.addEventListener('mouseenter', () => {
            const neonColor = getRandomColor();
            bioContainer.style.setProperty('--neon-color', neonColor);
        });
    }

    enterBtn.addEventListener('click', () => {
        
        welcomeOverlay.classList.add('hidden');

        if (bgVideo.muted) {
            bgVideo.muted = false;
        }

        bgAudio.play().catch(error => {
            console.error("Không thể phát nhạc nền:", error);
        });

        setTimeout(() => {
            welcomeOverlay.style.display = 'none';
        }, 600); 
    });
});
