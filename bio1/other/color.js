document.addEventListener('DOMContentLoaded', () => {
    const bioContainer = document.querySelector('.bio-container');

    function getRandomColor() {
        let color = Math.floor(Math.random() * 16777215).toString(16);
        while (color.length < 6) {
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
});
