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

function nameChange() {
  $('.js-add-basket').each((i, el) => {
    const activeName = $(el).attr('data-in-basket');
    const activeNameShort = $(el).attr('data-in-basket-short');
    const name = $(el).attr('data-name');
    const nameShort = $(el).attr('data-name-short');
    if ($(window).width() < window.globalOptions.sizes.sm) {
      if ($(el).hasClass('in-basket')) {
        $(el).text(activeNameShort);
      } else {
        $(el).text(nameShort);
      }
    } else if ($(el).hasClass('in-basket')) {
      $(el).text(activeName);
    } else {
      $(el).text(name);
    }
  });
}

nameChange();

$(window).on('resize', nameChange);

$(document).on('click', '.js-add-basket', (evt) => {
  evt.preventDefault();
  const self = $(evt.target);
  const activeName = $(self).attr('data-in-basket');
  const activeNameShort = $(self).attr('data-in-basket-short');
  if (!$(self).hasClass('in-basket')) {
    $(self).addClass('in-basket');
    if ($(window).width() < window.globalOptions.sizes.sm) {
      $(self).text(activeNameShort);
    } else {
      $(self).text(activeName);
    }
  }
});
