document.addEventListener("DOMContentLoaded", function() {
    const closeButton = document.querySelector(".close-btn");
    
    closeButton.addEventListener("click", function() {
        window.close();
    });
});