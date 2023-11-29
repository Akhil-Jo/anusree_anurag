$(document).ready(function() {
    // Check if the page has been refreshed
    var pageRefreshed = localStorage.getItem('pageRefreshed');

    // Function to scroll to the top
    function scrollToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow');
    }

    // If the page has been refreshed, scroll to the top
    if (pageRefreshed) {
        scrollToTop();
    }

    // Set a flag to indicate that the page has been refreshed
    localStorage.setItem('pageRefreshed', true);

    // Function to scroll down slowly to the bottom of the page
    function slowScrollToBottom() {
        var currentPosition = window.scrollY;
        var targetPosition = document.documentElement.scrollHeight;

        var increment = 2; // Adjust the scrolling speed

        if (currentPosition < targetPosition) {
            // Scroll down
            window.scrollTo(0, currentPosition + increment);
        } else {
            // Clear the interval when it reaches the bottom
            clearInterval(scrollInterval);
        }
    }

    // Set an interval for smooth scrolling after scrolling to the top
    var scrollInterval = setInterval(slowScrollToBottom, 60); // Adjust the interval as needed
});


$(document).ready(function() {

    // Function to scroll down slowly to div2, div3, and then to the bottom of the page
    function slowScrollToDiv() {
        var div2 = document.getElementById('fh5co-couple');
        var div3 = document.getElementById('fh5co-event');
        var currentPosition = window.scrollY;
        var targetPosition;

        // Determine the target position based on the current scroll position
        if (currentPosition < div2.offsetTop) {
            targetPosition = div2.offsetTop;
        } else if (currentPosition < div3.offsetTop) {
            targetPosition = div3.offsetTop;
        } else {
            // Clear the interval when it reaches div3
            clearInterval(scrollInterval);
            return;
        }

        var increment = 2; // Adjust the scrolling speed

        if (currentPosition < targetPosition) {
            // Scroll down
            window.scrollTo(0, currentPosition + increment);
        } else {
            // Scroll up
            window.scrollTo(0, currentPosition - increment);
        }
    }

    // Set an interval for smooth scrolling after scrolling to the top
    var scrollInterval = setInterval(slowScrollToDiv, 60); // Adjust the interval as needed
});
