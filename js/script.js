const slidesData = [
    {
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop', // Gym Interior
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
    },
    {
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop', // Muscular Man
        caption: 'Push your limits and achieve the impossible.'
    },
    {
        image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1000&auto=format&fit=crop', // Woman working out
        caption: 'Strength comes from overcoming the things you thought you couldn\'t.'
    }
];

const sliderContainer = document.getElementById('slider');
const captionElement = document.getElementById('slider-caption');
const paginationContainer = document.getElementById('pagination');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentSlideIndex = 0;
const slideIntervalTime = 5000;
let slideInterval;

// Initialize Slider
function initSlider() {
    // Create Slide Elements
    slidesData.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('slide');
        if (index === 0) slideDiv.classList.add('active');
        slideDiv.style.backgroundImage = `url('${slide.image}')`;
        sliderContainer.appendChild(slideDiv);

        // Create Dots
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        paginationContainer.appendChild(dot);
    });

    // Start Auto Play
    startSlideShow();
}

function updateSlider() {
    // Update Images
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlideIndex);
    });

    // Update Dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });

    // Update Caption with fade animation
    captionElement.style.opacity = '0';
    setTimeout(() => {
        captionElement.innerText = slidesData[currentSlideIndex].caption;
        captionElement.style.opacity = '1';
    }, 400); // Wait for half the transition
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slidesData.length;
    updateSlider();
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slidesData.length) % slidesData.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlideIndex = index;
    updateSlider();
    resetInterval();
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, slideIntervalTime);
}

function resetInterval() {
    clearInterval(slideInterval);
    startSlideShow();
}

// Event Listeners
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

// Floating Label Fix for Auto-fill (if needed)
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        // The CSS :not(:placeholder-shown) handles most of this,
        // but this ensures we catch any edge cases or add specific classes if needed.
    });
});

// Run Init
document.addEventListener('DOMContentLoaded', initSlider);
