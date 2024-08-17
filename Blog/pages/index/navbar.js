// JavaScript to handle menu toggle and click outside functionality
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', function () {
    menu.classList.toggle('hidden');
});

// Close the menu if clicking outside of it
document.addEventListener('click', function (event) {
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.add('hidden');
    }
});