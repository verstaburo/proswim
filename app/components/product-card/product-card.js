import slider from '../../blocks/product-nav-slider/product-nav-slider';

const $ = window.$;

$('.js-product-card').each(function () {
  const card = $(this);
  const mainSlider = card.find('.js-product-main-slider');
  const navSlider = card.find('.js-product-nav-slider');

  // init sliders
  if (!navSlider.length || !mainSlider.length) {
    return;
  }

  slider(navSlider, mainSlider);
});
