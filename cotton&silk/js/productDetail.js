document.addEventListener('DOMContentLoaded', function () {
    // Image Zoom Functionality
    initializeImageZoom();
    
    // Color selection functionality
    initializeColorSelection();
    
    // Size selection functionality
    initializeSizeSelection();
});

function initializeImageZoom() {
    const container = document.getElementById('imageZoomContainer');
    const mainImage = document.getElementById('mainProductImage');

    if (!container || !mainImage) {
        console.warn('Zoom elements not found');
        return;
    }

    let isZoomed = false;

    // Click to toggle zoom
    container.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!isZoomed) {
            // Zoom in
            isZoomed = true;
            mainImage.classList.add('zoomed');
            container.style.cursor = 'zoom-out';
            
            // Get click position relative to image
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Set transform origin to clicked point
            mainImage.style.transformOrigin = `${x}% ${y}%`;
        } else {
            // Zoom out
            isZoomed = false;
            mainImage.classList.remove('zoomed');
            container.style.cursor = 'zoom-in';
            mainImage.style.transformOrigin = 'center';
        }
    });

    // Mouse move when zoomed for panning
    container.addEventListener('mousemove', function(e) {
        if (isZoomed) {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Constrain values to reasonable range for smooth panning
            const constrainedX = Math.max(20, Math.min(80, x));
            const constrainedY = Math.max(20, Math.min(80, y));
            
            mainImage.style.transformOrigin = `${constrainedX}% ${constrainedY}%`;
        }
    });

    // Reset zoom when mouse leaves container
    container.addEventListener('mouseleave', function() {
        if (isZoomed) {
            isZoomed = false;
            mainImage.classList.remove('zoomed');
            container.style.cursor = 'zoom-in';
            mainImage.style.transformOrigin = 'center';
        }
    });
}

function initializeColorSelection() {
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColorText = document.getElementById('selectedColor');
    const mainProductImage = document.getElementById('mainProductImage');

    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to clicked option
            this.classList.add('active');

            // Get color name and image URL
            const colorName = this.getAttribute('data-color');
            const imageUrl = this.getAttribute('data-image');

            // Update selected color text
            selectedColorText.textContent = colorName;

            // Add loading animation
            mainProductImage.classList.add('loading');

            // Reset zoom state when changing colors
            mainProductImage.classList.remove('zoomed');
            const container = document.getElementById('imageZoomContainer');
            if (container) {
                container.style.cursor = 'zoom-in';
            }

            // Change the main product image with smooth transition
            setTimeout(() => {
                mainProductImage.src = imageUrl;
                mainProductImage.alt = `22mm Mulberry Silk Basic Men's Shirt - ${colorName}`;

                // Remove loading animation after image loads
                mainProductImage.onload = () => {
                    mainProductImage.classList.remove('loading');
                };
            }, 200);
        });
    });
}

function initializeSizeSelection() {
    const sizeOptions = document.querySelectorAll('.size-option:not(.out-of-stock)');
    const selectedSizeText = document.getElementById('selectedSize');

    sizeOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove active class from all size options
            document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));

            // Add active class to clicked option
            this.classList.add('active');

            // Get size name
            const sizeName = this.getAttribute('data-size');

            // Update selected size text
            selectedSizeText.textContent = sizeName;
        });
    });
}