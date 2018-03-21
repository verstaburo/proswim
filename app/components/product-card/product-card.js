import slider from '../../blocks/product-nav-slider/product-nav-slider';

const $ = window.$;

window.initProductCards = function () {
  $('.js-product-card').each(function () {
    const card = $(this);
    const mainSlider = card.find('.js-product-main-slider');
    const navSlider = card.find('.js-product-nav-slider');

    if (!mainSlider.hasClass('swiper-initialized')) {
      window.initMainSlider(mainSlider);
    }

    // init sliders
    if (!navSlider.length || !mainSlider.length) {
      return;
    }

    slider(navSlider, mainSlider);
  });
};

$(window).on('load', window.initProductCards);
