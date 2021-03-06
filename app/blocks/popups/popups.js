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
    if ($(window).width() < window.globalOptions.sizes.md) {
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

  // fancybox for cart
  const fancyOpts = {
    afterLoad() {
      freeze();
    },
    afterClose() {
      unfreeze();
    },
    smallBtn: false,
    buttons: [],
  };

  $('.js-fancybox-cart').fancybox(fancyOpts);
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

$(document).on('click', '.js-popup-back', (evt) => {
  evt.preventDefault();
  if ($(window).width() < window.globalOptions.sizes.md) {
    window.history.back();
  } else {
    $.fancybox.close();
  }
});
