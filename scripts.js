document.addEventListener('DOMContentLoaded', function () {
    const backgrounds = document.querySelectorAll('.outfit.background');
    const outfits = document.querySelectorAll('.outfit.clothing');
    const hats = document.querySelectorAll('.outfit.hat');
    const accessories = document.querySelectorAll('.outfit.accessory');
    const backgroundOverlay = document.getElementById('background-overlay');
    const outfitOverlay = document.getElementById('outfit-overlay');
    const hatOverlay = document.getElementById('hat-overlay');
    const accessoryOverlay = document.getElementById('accessory-overlay');
    const resetButton = document.getElementById('reset-button');
    const downloadButton = document.getElementById('download-button');
    const canvas = document.getElementById('canvas');
    const baseImage = document.getElementById('base');

    baseImage.crossOrigin = "anonymous";
    backgroundOverlay.crossOrigin = "anonymous";
    outfitOverlay.crossOrigin = "anonymous";
    hatOverlay.crossOrigin = "anonymous";
    accessoryOverlay.crossOrigin = "anonymous";

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

        // Draw the outfit overlay
        if (!outfitOverlay.classList.contains('hidden') && outfitOverlay.src) {
            context.drawImage(outfitOverlay, 0, 0, canvas.width, canvas.height);
        }

        // Draw the hat overlay
        if (!hatOverlay.classList.contains('hidden') && hatOverlay.src) {
            context.drawImage(hatOverlay, 0, 0, canvas.width, canvas.height);
        }

        // Draw the accessory overlay
        if (!accessoryOverlay.classList.contains('hidden') && accessoryOverlay.src) {
            context.drawImage(accessoryOverlay, 0, 0, canvas.width, canvas.height);
        }
    }

    backgrounds.forEach(background => {
        background.addEventListener('click', function () {
            if (backgroundOverlay.src === background.src && !backgroundOverlay.classList.contains('hidden')) {
                backgroundOverlay.classList.add('hidden');
                backgroundOverlay.src = '';
                drawImageOnCanvas(); // Ensure the canvas is updated
            } else {
                backgroundOverlay.src = background.src;
                backgroundOverlay.onload = function () {
                    backgroundOverlay.classList.remove('hidden');
                    drawImageOnCanvas();
                };
            }
        });
    });

    outfits.forEach(outfit => {
        outfit.addEventListener('click', function () {
            if (outfitOverlay.src === outfit.src && !outfitOverlay.classList.contains('hidden')) {
                outfitOverlay.classList.add('hidden');
                outfitOverlay.src = '';
                drawImageOnCanvas(); // Ensure the canvas is updated
            } else {
                outfitOverlay.src = outfit.src;
                outfitOverlay.onload = function () {
                    outfitOverlay.classList.remove('hidden');
                    drawImageOnCanvas();
                };
            }
        });
    });

    hats.forEach(hat => {
        hat.addEventListener('click', function () {
            if (hatOverlay.src === hat.src && !hatOverlay.classList.contains('hidden')) {
                hatOverlay.classList.add('hidden');
                hatOverlay.src = '';
                drawImageOnCanvas(); // Ensure the canvas is updated
            } else {
                hatOverlay.src = hat.src;
                hatOverlay.onload = function () {
                    hatOverlay.classList.remove('hidden');
                    drawImageOnCanvas();
                };
            }
        });
    });

    accessories.forEach(accessory => {
        accessory.addEventListener('click', function () {
            if (accessoryOverlay.src === accessory.src && !accessoryOverlay.classList.contains('hidden')) {
                accessoryOverlay.classList.add('hidden');
                accessoryOverlay.src = '';
                drawImageOnCanvas(); // Ensure the canvas is updated
            } else {
                accessoryOverlay.src = accessory.src;
                accessoryOverlay.onload = function () {
                    accessoryOverlay.classList.remove('hidden');
                    drawImageOnCanvas();
                };
            }
        });
    });

    resetButton.addEventListener('click', function () {
        backgroundOverlay.src = '';
        backgroundOverlay.classList.add('hidden');
        outfitOverlay.src = '';
        outfitOverlay.classList.add('hidden');
        hatOverlay.src = '';
        hatOverlay.classList.add('hidden');
        accessoryOverlay.src = '';
        accessoryOverlay.classList.add('hidden');
        drawImageOnCanvas();
    });

    downloadButton.addEventListener('click', function () {
        drawImageOnCanvas();
        canvas.toBlob(function (blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'dressup.png';
            link.click();
        });
    });

    baseImage.onload = function () {
        drawImageOnCanvas();
    };

    if (baseImage.complete) {
        drawImageOnCanvas();
    }
});
