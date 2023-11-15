$(document).ready(function() {
    // Client-side script to handle star rating selection
    $('.star').on('click', function() {
      const selectedValue = $(this).data('value');
      $('#stars').val(selectedValue);
      highlightStars(selectedValue);
    });
  
    function highlightStars(value) {
      $('.star').each(function() {
        const starValue = $(this).data('value');
        $(this).text(starValue <= value ? '★' : '☆');
      });
    }
  });
  