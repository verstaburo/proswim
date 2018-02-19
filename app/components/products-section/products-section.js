import * as Swiper from 'swiper/dist/js/swiper';

// eslint-disable-next-line no-unused-vars
const slider = new Swiper('.js-products-section-slider', {
  loop: true,
  autoplay: false,
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: '.products-section__button_next',
    prevEl: '.products-section__button_prev',
  },
  roundLengths: true,
  breakpoints: {
    767: {
      slidesPerView: 'auto',
      spaceBetween: 10,
    },
  },
});

