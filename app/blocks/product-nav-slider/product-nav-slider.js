import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

$('.js-product-nav-slider').each(function () {
  const el = $(this);
  const sliderElement = el.find('.product-nav-slider__slider');
  const nextEl = el.find('.product-nav-slider__button_next');
  const prevEl = el.find('.product-nav-slider__button_prev');
  const slides = el.find('.product-nav-slider__slide');

  const slidesPerView = 5;

  // eslint-disable-next-line no-unused-vars
  const slider = new Swiper(sliderElement, {
    slidesPerView,
    navigation: {
      nextEl,
      prevEl,
    },
    roundLengths: true,
    on: {
      init() {
        console.log(slides.length, this);

        if (slides.length > slidesPerView) {
          el.addClass('has-navigation');
        }
      },
    },
  });
});
