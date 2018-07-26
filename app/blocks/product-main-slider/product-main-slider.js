import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

window.initMainSlider = function (el) {
  if (!el.length) {
    return;
  }

  // eslint-disable-next-line no-unused-vars
  const slider = new Swiper(el, {
    slidesPerView: 1,
    touchRatio: el.data('touch-ratio'),
    navigation: {
      nextEl: $(el).find('.product-main-slider__button_next')[0],
      prevEl: $(el).find('.product-main-slider__button_prev')[0],
    },
    roundLengths: true,
    on: {
      slideChangeTransitionEnd() {
        const sliderElement = $(this.$el);
        const activeSlide = sliderElement.find('.swiper-slide-active');

        sliderElement.find('video').each(function () {
          $(this)[0].pause();
        });

        const activeVideo = activeSlide.find('video');

        if (activeVideo.length) {
          activeVideo[0].play();
        }
      },
    },
  });
};

$(window).on('load', () => {
  $('.js-product-main-slider').each(function () {
    window.initMainSlider($(this));
  });
});

/**
 * Ховер на картинку в большем слайдере
 */

$(document).on('mouseenter touchstart', '.js-product-main-slider-zoom', function (e) {
  const self = $(this);
  const { clientX, clientY } = e.touches && e.touches.length ? e.touches[0] : e;

  const img = self
    .addClass('is-hovered')
    .find('img');

  img.css('transform-origin', `${clientX - self.offset().left}px ${clientY - self.offset().top}px`);
});

$(document).on('mousemove touchmove', '.js-product-main-slider-zoom', function (e) {
  const self = $(this);
  const { clientX, clientY } = e.touches && e.touches.length ? e.touches[0] : e;

  const img = self.find('img');

  img.css('transform-origin', `${clientX - self.offset().left}px ${clientY - self.offset().top}px`);
});

$(document).on('mouseleave touchend', '.js-product-main-slider-zoom', function () {
  $(this).removeClass('is-hovered');
});
