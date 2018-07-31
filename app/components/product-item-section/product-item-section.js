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
  $(block).each((i, el) => {
    const mainSlider = $(el).find('.js-product-main-slider');
    const navSlider = $(el).find('.js-product-nav-slider');

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

    const colorSlider = $(el).find('.js-product-item-color-slider');

    const colorSettings = {
      slidesPerView: 7,
      breakpoints: {
        [window.globalOptions.sizes.lg - 1]: {
          slidesPerView: 4,
        },
      },
      callbackOnSlideChange(currentSlide) {
        const color = currentSlide.data('color');
        const colorInput = $('.js-product-color-input');

        if (!color || !colorInput) {
          return;
        }

        colorInput.val(color);
      },
    };

    slider(colorSlider, null, colorSettings);
  });
}

function reInitSliders() {
  const popupBlock = $('.preview-popup .js-product-item-section');

  if (!popupBlock.length) {
    return;
  }

  $(popupBlock).each((i, el) => {
    const mainSlider = $(el).find('.js-product-main-slider');
    const navSlider = $(el).find('.js-product-nav-slider');

    window.initMainSlider(mainSlider);

    if (!navSlider.length || !mainSlider.length) {
      return;
    }

    const settings = {
      slidesPerView: 5,
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

    const colorSlider = $(el).find('.js-product-item-color-slider');

    if (!colorSlider.length) {
      return;
    }

    const colorSettings = {
      slidesPerView: 5,
      breakpoints: {
        [window.globalOptions.sizes.lg - 1]: {
          slidesPerView: 4,
        },
      },
      callbackOnSlideChange(currentSlide) {
        const color = currentSlide.data('color');
        const colorInput = $('.js-product-color-input');

        if (!color || !colorInput) {
          return;
        }

        colorInput.val(color);
      },
    };

    slider(colorSlider, null, colorSettings);
  });
}

window.reInitPopupSliders = reInitSliders;

$(window).on('load', productItemSection);

// Замена картинки в главном слайдере
$(document).on('click', '.js-product-item-color-slider .product-nav-slider__slide', function () {
  const self = $(this);
  const img = self.find('.product-nav-slider__image img').attr('src');

  const parentHigh = $(self).closest('.js-product-item-section') || $(self).closest('.js-product-card');
  const targetImageElement = $(parentHigh).find('.js-product-main-slider .product-main-slider__slide:eq(0) img');

  const mainSlider = targetImageElement.parents('.swiper-container').get(0).swiper;

  if (mainSlider) {
    mainSlider.slideTo(0);
  }

  targetImageElement.attr('src', img);
});
