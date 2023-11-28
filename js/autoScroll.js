$(document).ready(function() {
    // Scroll to the top when the page loads or refreshes
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');

    // Function to scroll the page smoothly
    function autoScroll() {
        // Select the element you want to scroll to
        var scrollToElement = document.getElementById("fh5co-event");

        // Scroll to the element when the page loads
        if (scrollToElement) {
            scrollToElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // Set the scroll speed (adjust this value as needed)
        var scrollSpeed = 2;

        // Set the target scroll position (adjust this value as needed)
        var targetScroll = document.body.scrollHeight;

        // Scroll the page smoothly
        var scrollInterval = setInterval(function() {
            // Calculate the distance remaining to scroll
            var distance = targetScroll - window.scrollY;

            // Calculate the scroll amount for this iteration
            var scrollAmount = Math.sign(distance) * Math.min(Math.abs(distance), scrollSpeed);

            // Scroll the page
            window.scrollBy(0, scrollAmount);

            // If we reached the target scroll position or cannot scroll anymore, stop scrolling
            if (Math.abs(distance) <= Math.abs(scrollAmount) || window.scrollY + window.innerHeight === document.body.scrollHeight) {
                clearInterval(scrollInterval);
            }
        }, 25); // Adjust the interval for smoother or faster scrolling
    }

    // Call the autoScroll function after a delay when the window is fully loaded
    window.onload = function() {
        // Use a delay to give the browser some time to stabilize after loading
        setTimeout(autoScroll, 100);
    };
});
