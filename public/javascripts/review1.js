$(document).ready(function() {
    // Client-side script to handle dynamic star rating
    const starsContainer = $('.rating');
    const starsInput = $('#stars');
  
    // Initial star rating setup
    updateStarRating(starsInput.val());
  
    starsContainer.on('click', '.star', function() {
      const selectedValue = $(this).data('value');
      starsInput.val(selectedValue);
      updateStarRating(selectedValue);
    });
  
    function updateStarRating(rating) {
      starsContainer.find('.star').each(function(index, element) {
        const value = $(element).data('value');
        $(element).text(value <= rating ? '★' : '☆');
      });
    }
  });
  