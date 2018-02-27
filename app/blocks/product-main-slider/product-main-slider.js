import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

// eslint-disable-next-line no-unused-vars
const slider = new Swiper('.js-product-main-slider', {
  slidesPerView: 1,
  navigation: {
    nextEl: '.product-main-slider__button_next',
    prevEl: '.product-main-slider__button_prev',
  },
  roundLengths: true,
});

/**
 * Ховер на картинку в большем слайдере
 */

$(document).on('mouseenter touchstart', '.js-product-main-slider-zoom', function (e) {
  const self = $(this);
  const { clientX, clientY } = e.touches && e.touches.length ? e.touches[0] : e;

  self
    .addClass('is-hovered')
    .find('img')
    .css('transform-origin', `${clientX}px ${clientY}px`);
});

$(document).on('mousemove touchmove', '.js-product-main-slider-zoom', function (e) {
  const self = $(this);
  const { clientX, clientY } = e.touches && e.touches.length ? e.touches[0] : e;

  self
    .find('img')
    .css('transform-origin', `${clientX}px ${clientY}px`);
});

$(document).on('mouseleave touchend', '.js-product-main-slider-zoom', function () {
  $(this).removeClass('is-hovered');
});
