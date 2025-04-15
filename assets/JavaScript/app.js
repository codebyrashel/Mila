const scrollContainer = document.getElementById('scrollContainer');
const scrollThumb = document.getElementById('scrollThumb');

// DRAG TO SCROLL
let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
});

scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
});

scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainer.scrollLeft = scrollLeft - walk;
});

// SYNC THUMB POSITION
scrollContainer.addEventListener('scroll', () => {
    const scrollLeft = scrollContainer.scrollLeft;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const scrollRatio = scrollLeft / maxScroll;
    const thumbWidth = (scrollContainer.clientWidth / scrollContainer.scrollWidth) * 100;
    scrollThumb.style.width = `${thumbWidth}%`;
    scrollThumb.style.transform = `translateX(${scrollRatio * (100 - thumbWidth)}%)`;
});