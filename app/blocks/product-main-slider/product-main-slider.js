import * as Swiper from 'swiper/dist/js/swiper';

// eslint-disable-next-line no-unused-vars
const slider = new Swiper('.js-product-main-slider', {
  slidesPerView: 1,
  navigation: {
    nextEl: '.product-main-slider__button_next',
    prevEl: '.product-main-slider__button_prev',
  },
  roundLengths: true,
});
