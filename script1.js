document.addEventListener('DOMContentLoaded', function () {
    // Initialize Owl Carousel
    $(document).ready(function ($) {
        $('.owl-carousel').owlCarousel({
            loop: false,
            margin: 10,
            items: 5,
            autoWidth: true,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                750: {
                    items: 5
                },
                600: {
                    items: 3
                }
            }
        });

        // Initialize LazyLoad
        var lazyLoadInstance = new LazyLoad({
            elements_selector: ".outfit img"
        });
    });

    const backgrounds = document.querySelectorAll('.outfit.background');
    const outfits = document.querySelectorAll('.outfit.clothing');
    const hats = document.querySelectorAll('.outfit.hat');
    const faces = document.querySelectorAll('.outfit.face');
    const backgroundOverlay = document.getElementById('background-overlay');
    const outfitOverlay = document.getElementById('outfit-overlay');
    const hatOverlay = document.getElementById('hat-overlay');
    const faceOverlay = document.getElementById('face-overlay');
    const resetButton = document.getElementById('reset-button');
    const downloadButton = document.getElementById('download-button');
    const canvas = document.getElementById('canvas');
    const baseImage = document.getElementById('base');

    baseImage.crossOrigin = "anonymous";
    backgroundOverlay.crossOrigin = "anonymous";
    outfitOverlay.crossOrigin = "anonymous";
    hatOverlay.crossOrigin = "anonymous";
    faceOverlay.crossOrigin = "anonymous";

    function drawImageOnCanvas() {
        const context = canvas.getContext('2d');
        canvas.width = baseImage.naturalWidth;
        canvas.height = baseImage.naturalHeight;

        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the background overlay first
        if (!backgroundOverlay.classList.contains('hidden') && backgroundOverlay.src) {
            context.drawImage(backgroundOverlay, 0, 0, canvas.width, canvas.height);
        }

        // Draw the base image next
        context.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

        // Draw the hat overlay next
        if (!hatOverlay.classList.contains('hidden') && hatOverlay.src) {
            context.drawImage(hatOverlay, 0, 0, canvas.width, canvas.height);
        }

        // Draw the face overlay next
        if (!faceOverlay.classList.contains('hidden') && faceOverlay.src) {
            context.drawImage(faceOverlay, 0, 0, canvas.width, canvas.height);
        }

        // Draw the outfit overlay last to ensure it is on top
        if (!outfitOverlay.classList.contains('hidden') && outfitOverlay.src) {
            context.drawImage(outfitOverlay, 0, 0, canvas.width, canvas.height);
        }
    }

    function addClickListener(elements, overlay) {
        elements.forEach(element => {
            element.addEventListener('click', function () {
                if (overlay.src === element.src && !overlay.classList.contains('hidden')) {
                    overlay.classList.add('hidden');
                    overlay.src = '';
                    drawImageOnCanvas(); // Ensure the canvas is updated
                } else {
                    overlay.src = element.src;
                    overlay.onload = function () {
                        overlay.classList.remove('hidden');
                        drawImageOnCanvas();
                    };
                }
            });
        });
    }

    addClickListener(backgrounds, backgroundOverlay);
    addClickListener(outfits, outfitOverlay);
    addClickListener(hats, hatOverlay);
    addClickListener(faces, faceOverlay);

    resetButton.addEventListener('click', function () {
        backgroundOverlay.src = '';
        backgroundOverlay.classList.add('hidden');
        outfitOverlay.src = '';
        outfitOverlay.classList.add('hidden');
        hatOverlay.src = '';
        hatOverlay.classList.add('hidden');
        faceOverlay.src = '';
        faceOverlay.classList.add('hidden');
        drawImageOnCanvas();
    });

    downloadButton.addEventListener('click', function () {
        drawImageOnCanvas();
        canvas.toBlob(function (blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'trilly.png';
            link.click();
        });
    });

    baseImage.onload = function () {
        console.log('Base image loaded');
        drawImageOnCanvas();
    };

    if (baseImage.complete) {
        console.log('Base image already loaded');
        drawImageOnCanvas();
    }
});
