// Keep the cursor visible at the bottom of the document to mimic a real terminal
document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.querySelector('.cursor');
    
    // Optional: add a slight delay before showing the final prompt 
    // to simulate command execution time.
    cursor.style.display = 'none';
    setTimeout(() => {
        cursor.style.display = 'inline';
        // window.scrollTo(0, document.body.scrollHeight);
    }, 400);
});
