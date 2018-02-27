import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

export default (el, mainSlider, settings = {}) => {
  if (!el.length) {
    return;
  }

  const sliderElement = el.find('.product-nav-slider__slider');
  const nextEl = el.find('.product-nav-slider__button_next');
  const prevEl = el.find('.product-nav-slider__button_prev');
  const slides = el.find('.product-nav-slider__slide');

  const initialSettings = {
    slideToClickedSlide: true,
    slidesPerView: 5,
    navigation: {
      nextEl,
      prevEl,
    },
    breakpoints: {
      [window.globalOptions.sizes.lg - 1]: {
        slidesPerView: 4,
      },
    },
    ...settings,
  };

  // eslint-disable-next-line no-unused-vars
  const slider = new Swiper(sliderElement, {
    ...initialSettings,
    on: {
      init() {
        const self = this;

        if (slides.length > initialSettings.slidesPerView) {
          el.addClass('has-navigation');
        }

        slides
          .removeClass('is-active')
          .eq(self.activeIndex)
          .addClass('is-active');

        if (!mainSlider.length || !mainSlider[0].swiper) {
          return;
        }

        const mainSwiper = mainSlider[0].swiper;

        mainSwiper.on('slideChange', function () {
          slides
            .removeClass('is-active')
            .eq(this.activeIndex)
            .addClass('is-active');

          self.slideTo(this.activeIndex);
        });

        el.on('click', '.product-nav-slider__slide', function () {
          const slide = $(this);

          mainSlider[0].swiper.slideTo(slide.index());
        });
      },
    },
  });

  slider.update();
};
