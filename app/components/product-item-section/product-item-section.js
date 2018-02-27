import slider from '../../blocks/product-nav-slider/product-nav-slider';

const $ = window.$;

function productItemSection() {
  const block = $('.js-product-item-section');

  if (!block.length) {
    return;
  }

  /**
   * Инициализация слайдеров
   */

  const mainSlider = block.find('.js-product-main-slider');
  const navSlider = block.find('.js-product-nav-slider');

  if (!navSlider.length || !mainSlider.length) {
    return;
  }

  const settings = {
    slidesPerView: 7,
  };

  slider(navSlider, mainSlider, settings);
}

productItemSection();

/**
 * Ховер на картинку в большем слайдере
 */

$(document).on('mouseenter touchstart', '.js-product-item-section .product-main-slider__slide', function (e) {
  const self = $(this);
  const { clientX, clientY } = e.touches && e.touches.length ? e.touches[0] : e;

  self.parents('.js-product-item-section').find('.product-item-section__zoom').addClass('is-hidden');

  self
    .addClass('is-hovered')
    .find('img')
    .css('transform-origin', `${clientX}px ${clientY}px`);
});

$(document).on('mousemove touchmove', '.js-product-item-section .product-main-slider__slide', function (e) {
  const self = $(this);
  const { clientX, clientY } = e.touches && e.touches.length ? e.touches[0] : e;

  self
    .find('img')
    .css('transform-origin', `${clientX}px ${clientY}px`);
});

$(document).on('mouseleave touchend', '.js-product-item-section .product-main-slider__slide', function () {
  $(this)
    .removeClass('is-hovered')
    .parents('.js-product-item-section')
    .find('.product-item-section__zoom')
    .removeClass('is-hidden');
});
