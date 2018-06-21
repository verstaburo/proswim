// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';
import { freeze, unfreeze } from '../js-functions/freeze';

const $ = window.$;

export default function () {
  $(document).on('click', '.js-popup-close', (e) => {
    e.preventDefault();

    $.fancybox.close();
  });

  $(document).on('click', '[data-popup]', function (e) {
    if ($(window).width() < window.globalOptions.sizes.lg) {
      return;
    }

    e.preventDefault();
    const popup = $($(this).data('popup'));

    $.fancybox.open(popup, {
      afterLoad() {
        freeze();
        const itemEl = $(popup).find('.js-product-main-slider');
        const navEl = $(popup).find('.js-product-nav-slider .product-nav-slider__slider');
        const colorNavEl = $(popup).find('.js-product-item-color-slider .product-nav-slider__slider');
        if ($(itemEl).length > 0) {
          itemEl[0].swiper.update();
        }
        if ($(navEl).length > 0) {
          navEl[0].swiper.params.slidesPerView = 5;
          // navEl[0].swiper.init();
          navEl[0].swiper.update();
        }
        if ($(colorNavEl).length > 0) {
          colorNavEl[0].swiper.params.slidesPerView = 5;
          // colorNavEl[0].swiper.init();
          colorNavEl[0].swiper.update();
        }
      },
      afterClose: unfreeze,
    });
  });
}

window.popups = {
  show(id, settings) {
    const initialSettings = {
      afterLoad: freeze,
      afterClose: unfreeze,
    };

    $.fancybox.open($(id), { initialSettings, ...settings });
  },
};
