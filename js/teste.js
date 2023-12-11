const workSlider = document.querySelector('.work-slider');
const slider = document.querySelector('.work-six');
const slideWidth = slider.scrollWidth / slider.children.length;
const slideDuration = 500;

let currentIndex = 0;

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        scrollToCurrentIndex();
    }
}

function nextSlide() {
    if (currentIndex < slider.children.length - 1) {
        currentIndex++;
        scrollToCurrentIndex();
    }
}

function scrollToCurrentIndex() {
    const targetX = currentIndex * slideWidth;
    smoothScrollTo(targetX, slideDuration);
}

function smoothScrollTo(targetX, duration) {
    const startX = slider.scrollLeft;
    const distanceX = targetX - startX;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
            slider.scrollLeft = easeInOutCubic(elapsedTime, startX, distanceX, duration);
            requestAnimationFrame(step);
        } else {
            slider.scrollLeft = targetX;
        }
    }

    requestAnimationFrame(step);
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
}
