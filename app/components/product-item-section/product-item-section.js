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
    breakpoints: {
      [window.globalOptions.sizes.lg - 1]: {
        slidesPerView: 5,
      },
      [window.globalOptions.sizes.sm - 1]: {
        slidesPerView: 4,
      },
    },
  };

  slider(navSlider, mainSlider, settings);

  /**
   * инициализация слайдера выбора цвета
   */

  const colorSlider = block.find('.js-product-item-color-slider');

  const colorSettings = {
    slidesPerView: 6,
    breakpoints: {
      [window.globalOptions.sizes.lg - 1]: {
        slidesPerView: 4,
      },
    },
  };

  slider(colorSlider, null, colorSettings);
}

$(window).on('load', productItemSection);

// Замена картинки в главном слайдере
$(document).on('click', '.js-product-item-color-slider .product-nav-slider__slide', function () {
  const self = $(this);
  const img = self.find('.product-nav-slider__image img').attr('src');

  const targetImageElement = $('.js-product-main-slider .product-main-slider__slide:eq(0) img');

  const mainSlider = targetImageElement.parents('.swiper-container').get(0).swiper;

  if (mainSlider) {
    mainSlider.slideTo(0);
  }

  targetImageElement.attr('src', img);
});
