// Set the end date for the countdown
const endDate = "Wating for 14 feb 2025 12:00 AM";
document.getElementById("end-date").innerText = endDate;

// Function to update the countdown
function updateCountdown() {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const diff = end - now;

    if (diff <= 0) {
        clearInterval(interval);
        showBirthdayPopup();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

// Function to show the birthday popup with slideshow and album
function showBirthdayPopup() {
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "white";
    popup.style.color = "#333";
    popup.style.padding = "20px";
    popup.style.borderRadius = "12px";
    popup.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
    popup.style.textAlign = "center";
    popup.style.zIndex = "1000";
    popup.style.width = "90%";
    popup.style.maxWidth = "600px";

    popup.innerHTML = `
    <h1>🎉 Happy Birthday, Sunipa! 🎉</h1>
    <p> Hope your day is overflowing with happiness and love! 💖✨ </p>
    <div class="slideshow" style="position: relative; width: 100%; height: auto; overflow: hidden; border-radius: 12px; margin: 20px 0; border: 5px solid #ff4081; background: #f7f7f7;">
        <div class="image-container" style="display: flex; justify-content: center; align-items: center; height: 400px;">
            ${Array.from({ length: 14 }, (_, i) => `
                <img src="image/image${i + 1}.png" class="slide ${i === 0 ? 'active' : ''}" style="max-width: 100%; max-height: 100%; position: absolute; opacity: ${i === 0 ? 1 : 0}; transition: opacity 1s;">
            `).join('')}
        </div>
        <button class="arrow-left" style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); background: rgba(0, 0, 0, 0.6); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.5rem; display: flex; justify-content: center; align-items: center; z-index: 10;">&#10094;</button>
        <button class="arrow-right" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: rgba(0, 0, 0, 0.6); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.5rem; display: flex; justify-content: center; align-items: center; z-index: 10;">&#10095;</button>
    </div>
    <div class="album" style="display: flex; justify-content: flex-start; gap: 10px; margin-top: 20px; overflow-x: scroll; padding-bottom: 10px;">
    ${Array.from({ length: 14 }, (_, i) => `
        <img src="image/image${i + 1}.png" class="album-image" style="width: 80px; height: 80px; object-fit: cover; cursor: pointer; border: 2px solid transparent; border-radius: 8px;">
    `).join('')}
    </div>

    <button id="close-popup" style="padding: 10px 20px; background: #ff4081; color: #fff; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; margin-top: 20px;" aria-label="Close Popup">Close</button>
    
    <!-- Payment Section -->
    <div style="position: fixed; bottom: 10px; right: 10px; z-index: 1001;">
        <button id="show-payment-options" style="padding: 10px 20px; background: #ff4081; color: white; border: none; border-radius: 8px; cursor: pointer;">💳 Pay😂</button>
    </div>

    <!-- Payment Popup -->
    <div id="payment-popup" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; color: #333; padding: 20px; border-radius: 12px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); text-align: center; z-index: 1002;">
        <h2>Pay 2 Rs.😂</h2>
        <p>For hard Working</p>
        
        <!-- Payment Icons -->
        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;">
            <a href="upi://pay?pa=9382472550@ptsbi&pn=Your Name&am=2&cu=INR" target="_blank" title="Pay with Google Pay">
                <img src="icons/g pay.png" alt="Google Pay" style="width: 50px; height: 50px; cursor: pointer;">
            </a>
            <a href="upi://pay?pa=9382472550@ptsbi&pn=Your Name&am=2&cu=INR" target="_blank" title="Pay with PhonePe">
                <img src="icons/phone pe.png" alt="PhonePe" style="width: 50px; height: 50px; cursor: pointer;">
            </a>
        </div>
        
        <!-- QR Code -->
        <div style="text-align: center; margin-bottom: 20px;">
            <button id="show-qr-code" style="padding: 10px 20px; background: #ff4081; color: white; border: none; border-radius: 8px; cursor: pointer;">Show QR Code</button>
            <div id="qr-code-container" style="display: none; margin-top: 20px;">
                <img src="icons/qr-code.png" alt="QR Code" style="width: 200px; height: 200px;">
               
            </div>
        </div>
        

        <button id="close-payment-popup" style="padding: 10px 20px; background: #ff4081; color: white; border: none; border-radius: 8px; cursor: pointer;">Close</button>
    </div>
`;

    // Show Payment Popup
    popup.querySelector("#show-payment-options").addEventListener("click", () => {
        document.getElementById("payment-popup").style.display = "block";
    });

    // Close Payment Popup
    popup.querySelector("#close-payment-popup").addEventListener("click", () => {
        document.getElementById("payment-popup").style.display = "none";
    });

    // Show QR Code
    popup.querySelector("#show-qr-code").addEventListener("click", () => {
        const qrCodeContainer = document.getElementById("qr-code-container");
        qrCodeContainer.style.display = qrCodeContainer.style.display === "none" ? "block" : "none";
    });










    // Append the popup to the DOM
    document.body.appendChild(popup);

    // Select the "Close" button and add the click event listener
    const closeButton = popup.querySelector("#close-popup");
    closeButton.addEventListener("click", () => {
        // Clear the slideshow interval
        clearInterval(window.slideshowInterval);

        // Remove the popup
        popup.remove();
    });






    // Slideshow functionality
    const slides = popup.querySelectorAll(".slide");
    const albumImages = popup.querySelectorAll(".album-image");
    const leftArrow = popup.querySelector(".arrow-left");
    const rightArrow = popup.querySelector(".arrow-right");
    let currentSlide = 0;

    function updateSlides(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? "1" : "0";
            slide.classList.toggle("active", i === index);
        });

        // Highlight the active album image
        albumImages.forEach((image, i) => {
            image.style.borderColor = i === index ? "#ff4081" : "transparent";
        });
    }

    // Handle left arrow click
    leftArrow.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides(currentSlide);
    });

    // Handle right arrow click
    rightArrow.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides(currentSlide);
    });

    // Click on album images to update the slideshow
    albumImages.forEach((image, index) => {
        image.addEventListener("click", () => {
            currentSlide = index;
            updateSlides(currentSlide);
        });
    });

    // Automatic slideshow
    window.slideshowInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides(currentSlide);
    }, 2500);

    // Pause slideshow on hover
    popup.querySelector(".slideshow").addEventListener("mouseover", () => {
        clearInterval(window.slideshowInterval);
    });

    // Resume slideshow on mouse leave
    popup.querySelector(".slideshow").addEventListener("mouseout", () => {
        window.slideshowInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides(currentSlide);
        }, 3000);
    });

    // Initialize the first slide and album highlight
    updateSlides(currentSlide);
}

// Start countdown
const interval = setInterval(updateCountdown, 1000);
updateCountdown();









































