import slider from '../../blocks/product-nav-slider/product-nav-slider';

const $ = window.$;

function contentSlider() {
  const block = $('.js-content-slider');

  if (!block.length) {
    return;
  }

  const navSlider = block.find('.product-nav-slider');

  if (!navSlider.length) {
    return;
  }

  const settings = {
    slidesPerView: 4,
    breakpoints: {
      [window.globalOptions.sizes.sm - 1]: {
        slidesPerView: 4,
      },
    },
  };

  navSlider.each(function () {
    const self = $(this);
    const mainSlider = self.parents('.js-content-slider').find('.product-main-slider');
    slider(self, mainSlider, settings);
  });
}

contentSlider();
