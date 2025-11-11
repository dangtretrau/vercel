document.addEventListener('DOMContentLoaded', () => {

    const enterBtn = document.getElementById('enter-btn');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const bgVideo = document.getElementById('bg-video');
    const bgAudio = document.getElementById('bg-audio');

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
