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











const mainImages = document.querySelector(".main-images");
const images = document.querySelectorAll(".main-images img");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const colorThumbs = document.querySelectorAll(".color-thumbs img");
const sizeBtns = document.querySelectorAll(".size");

let index = 0;
const visibleCount = 2;
const imageWidth = 500 + 20; // image + gap

function updateGallery() {
    const maxIndex = images.length - visibleCount;
    if (index > maxIndex) index = 0;
    if (index < 0) index = maxIndex;
    mainImages.style.transform = `translateX(-${index * imageWidth}px)`;
}

nextBtn.addEventListener("click", () => {
    index++;
    updateGallery();
});

prevBtn.addEventListener("click", () => {
    index--;
    updateGallery();
});

// Color selection
colorThumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
        colorThumbs.forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");

        const selectedImg = thumb.dataset.img;
        const matchIndex = Array.from(images).findIndex(img =>
            img.src.includes(selectedImg.split('/').pop())
        );
        if (matchIndex !== -1) {
            index = matchIndex;
            updateGallery();
        }
    });
});

// Size selection
sizeBtns.forEach(btn => {
    if (!btn.classList.contains("deleted")) {
        btn.addEventListener("click", () => {
            sizeBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    }
});

updateGallery();
