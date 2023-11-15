
function updateSlidesPerView() {
    if (window.matchMedia('(max-width: 767px)').matches) {
        swiper.params.slidesPerView = 1; // Change to 1 on mobile
    } else {
        swiper.params.slidesPerView = 4; // Change to 4 on desktop
    }
    swiper.update(); // Update Swiper instance
}
// updateSlidesPerView();

var swiper = new Swiper(".mySwiper", {
slidesPerView: 4,
spaceBetween: 30,
pagination: {
    el: ".swiper-pagination",
    type: "fraction",
},
navigation: {
    nextEl: ".swiper-button-next",
    prevEl: " .swiper-button-prev",
},
});

var swiper1 = new Swiper(".mySwiper1", {
slidesPerView: 4,
spaceBetween: 30,
pagination: {
    el: ".swiper-pagination",
    type: "fraction",
},
navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
},
});
