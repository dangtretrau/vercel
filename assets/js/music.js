const songs = [
    {
        file: 'Obito - Trốn Chạy.mp3',
        title: 'Trốn Chạy',
        artist: 'obito',
        cover: './assets/favico/default.png'
    },
    {
        file: 'Obito - Đánh Đổi.mp3',
        title: 'Đánh Đổi',
        artist: 'Obito',
        cover: './assets/favico/default3.png'
    },
    {
        file: 'Obito - Biên Giới Long Bình.mp3',
        title: 'Biên Giới Long Bình',
        artist: 'Obito',
        cover: './assets/favico/default2.png'
    },
    {
        file: 'Obito - Đầu Đường Xó Chợ.mp3',
        title: 'Đầu Đường Xó Chợ',
        artist: 'Obito',
        cover: './assets/favico/default2.png'
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let shuffledSongs = [];
const audio = new Audio();

const coverEl = document.getElementById('music-cover');
const titleEl = document.getElementById('track-title');
const artistEl = document.getElementById('track-artist');
const prevBtn = document.getElementById('prev-btn');
const playPauseBtn = document.getElementById('play-pause-btn');
const nextBtn = document.getElementById('next-btn');

audio.volume = 0.5;

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function updateMusicUI() {
    const currentSong = shuffledSongs[currentSongIndex];
    if (!currentSong) return;

    if (coverEl) {
        coverEl.src = currentSong.cover || './assets/pfp/default.png';
    }

    if (titleEl) {
        titleEl.textContent = currentSong.title || 'Unknown Track';
    }

    if (artistEl) {
        artistEl.textContent = currentSong.artist || 'Unknown Artist';
    }

    if (playPauseBtn) {
        const icon = playPauseBtn.querySelector('i');
        if (icon) {
            icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
    }
}

function bindMusicControls() {
    prevBtn?.addEventListener('click', prevSong);
    nextBtn?.addEventListener('click', nextSong);
    playPauseBtn?.addEventListener('click', togglePlayback);
}

function initMusicPlayer() {
    shuffledSongs = shuffleArray([...songs]);
    currentSongIndex = 0;
    updateMusicUI();
    bindMusicControls();
    audio.addEventListener('ended', nextSong);
    audio.addEventListener('play', updateMusicUI);
    audio.addEventListener('pause', updateMusicUI);
    loadSong(currentSongIndex);
}

function startMusicAfterTerminal() {
    if (!audio.src) {
        loadSong(currentSongIndex);
    }

    isPlaying = true;
    audio.play()
        .catch(error => {
            console.error('Music playback error:', error);
            setTimeout(() => {
                audio.play().catch(e => console.error('Retry error:', e));
            }, 1000);
        });

    updateMusicUI();
}

function loadSong(index) {
    const currentSong = shuffledSongs[index];
    if (!currentSong) return;

    currentSongIndex = index;
    audio.src = `./assets/music/${currentSong.file}`;
    updateMusicUI();

    if (isPlaying) {
        audio.play().catch(error => console.error('Play error:', error));
    }
}

function togglePlayback() {
    if (!audio.src) {
        loadSong(currentSongIndex);
    }

    if (audio.paused) {
        isPlaying = true;
        audio.play().catch(error => console.error('Play error:', error));
    } else {
        isPlaying = false;
        audio.pause();
    }

    updateMusicUI();
}

function nextSong() {
    const nextIndex = (currentSongIndex + 1) % shuffledSongs.length;
    loadSong(nextIndex);
}

function prevSong() {
    const prevIndex = (currentSongIndex - 1 + shuffledSongs.length) % shuffledSongs.length;
    loadSong(prevIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    initMusicPlayer();
});

window.MusicPlayer = {
    start: startMusicAfterTerminal,
    getAudio: () => audio
};
