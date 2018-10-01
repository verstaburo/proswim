/* eslint-disable no-unused-vars */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

const { lg, md, sm, xs } = window.globalOptions.sizes;

const sliderStars = new Swiper('.js-slider-star', {
  loop: false,
  speed: 700,
  autoplay: false,
  slidesPerView: 5,
  spaceBetween: 33,
  navigation: {
    nextEl: '.js-slider-star-next',
    prevEl: '.js-slider-star-prev',
  },
  roundLengths: true,
  breakpoints: {
    [md - 1]: {
      slidesPerView: 3,
    },
    [sm - 1]: {
      slidesPerView: 1,
      spaceBetween: 25,
    },
    [xs - 1]: {
      slidesPerView: 1,
    },
  },
});

$(window).resize();
