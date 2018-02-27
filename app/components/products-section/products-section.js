import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

$('.js-products-section').each(function () {
  const self = $(this);
  const sliderEl = self.find('.js-products-section-slider');
  const isSmall = self.hasClass('products-section_small');

  const slidesPerView = isSmall ? 6 : 4;
  const { lg, sm } = window.globalOptions.sizes;

  // eslint-disable-next-line no-unused-vars
  const slider = new Swiper(sliderEl, {
    loop: true,
    autoplay: false,
    slidesPerView,
    spaceBetween: 20,
    navigation: {
      nextEl: '.products-section__button_next',
      prevEl: '.products-section__button_prev',
    },
    roundLengths: true,
    breakpoints: {
      [lg - 1]: {
        slidesPerView: 4,
      },
      [sm - 1]: {
        slidesPerView: 'auto',
        spaceBetween: 10,
      },
    },
  });
});

$(window).resize();
