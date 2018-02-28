import slider from '../../blocks/product-nav-slider/product-nav-slider';

const $ = window.$;

function productItemSection() {
  const block = $('.js-product-item-section');

  if (!block.length) {
    return;
  }

  /**
   * Инициализация главного слайдера
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

  /**
   * инициализация слайдера выбора цвета
   */

  const colorSlider = block.find('.js-product-item-color-slider');

  slider(colorSlider, null, settings);
}

productItemSection();
