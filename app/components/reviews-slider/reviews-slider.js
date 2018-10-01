/* eslint-disable no-unused-vars */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

const { lg, md, xs } = window.globalOptions.sizes;

const sliderReview = new Swiper('.js-slider-review', {
  loop: false,
  speed: 700,
  autoplay: false,
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    nextEl: '.js-slider-review-next',
    prevEl: '.js-slider-review-prev',
  },
  roundLengths: true,
  breakpoints: {
    [lg - 1]: {
      slidesPerView: 3,
    },
    [md - 1]: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    [xs - 1]: {
      slidesPerView: 1,
    },
  },
});

$(window).resize();
