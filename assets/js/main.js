document.addEventListener("DOMContentLoaded", function () {
  $(function () {
    $(".menu-bar").on("click", function () {
      // Toggle the right position based on its current value
      $(".side-info").css("right", "0%");
    });

    // Event listener for the button with class 'side-info-close'
    $(".side-info-close").on("click", function () {
      // Remove the right position style
      $(".side-info").css("right", "");
    });
  });
});
