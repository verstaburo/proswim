import Swiper from 'swiper';

// eslint-disable-next-line no-unused-vars
const slider = new Swiper('.js-hero-slider', {
  loop: true,
  speed: 700,
  autoplay: false,
  slidesPerView: 1,
  navigation: {
    nextEl: '.hero-slider__button_next',
    prevEl: '.hero-slider__button_prev',
  },
  pagination: {
    el: '.hero-slider__dots',
    clickable: true,
    paginationClickableClass: 'hero-slider__dots_clickable',
    bulletClass: 'hero-slider__dot',
    bulletActiveClass: 'is-active',
  },
  roundLengths: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
  },
});

