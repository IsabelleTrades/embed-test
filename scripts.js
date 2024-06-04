document.addEventListener('DOMContentLoaded', function () {
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

    faces.forEach(face => {
        face.addEventListener('click', function () {
            if (faceOverlay.src === face.src && !faceOverlay.classList.contains('hidden')) {
                faceOverlay.classList.add('hidden');
                faceOverlay.src = '';
                drawImageOnCanvas(); // Ensure the canvas is updated
            } else {
                faceOverlay.src = face.src;
                faceOverlay.onload = function () {
                    faceOverlay.classList.remove('hidden');
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
        faceOverlay.src = '';
        faceOverlay.classList.add('hidden');
        drawImageOnCanvas();
    });

    downloadButton.addEventListener('click', function () {
        drawImageOnCanvas();
        canvas.toBlob(function (blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'hamchi.png';
            link.click();
        });
    });

    baseImage.onload = function () {
        drawImageOnCanvas();
    };

    if (baseImage.complete) {
        drawImageOnCanvas();
    }

    var iframe = document.querySelector('#block-yui_3_17_2_1_1619008534514_75765 iframe');
});
