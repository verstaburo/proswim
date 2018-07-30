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
  const { callbackOnSlideChange } = settings;

  delete settings.callbackOnSlideChange; // eslint-disable-line

  let initialSettings;

  if (!mainSlider || !mainSlider.length || !mainSlider[0].swiper) {
    initialSettings = {
      slideToClickedSlide: true,
      slidesPerView: 5,
      observer: true,
      observeParents: true,
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
  } else {
    initialSettings = {
      slideToClickedSlide: true,
      slidesPerView: 5,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl,
        prevEl,
      },
      breakpoints: {
        [window.globalOptions.sizes.lg - 1]: {
          slidesPerView: 4,
        },
      },
      // controller: {
      //   control: mainSlider[0].swiper,
      // },
      ...settings,
    };
  }

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

        if (typeof callbackOnSlideChange === 'function') {
          callbackOnSlideChange(slides.eq(self.activeIndex));
        }

        if (!mainSlider || !mainSlider.length || !mainSlider[0].swiper) {
          el.on('click', '.product-nav-slider__slide', function () {
            $(this)
              .addClass('is-active')
              .siblings('.product-nav-slider__slide')
              .removeClass('is-active');

            if (typeof callbackOnSlideChange === 'function') {
              callbackOnSlideChange($(this));
            }
          });
        } else {
          const mainSwiper = mainSlider[0].swiper;

          mainSwiper.on('slideChange', function () {
            slides
              .removeClass('is-active')
              .eq(this.activeIndex)
              .addClass('is-active');

            self.slideTo(this.activeIndex);

            if (typeof callbackOnSlideChange === 'function') {
              callbackOnSlideChange(slides.eq(this.activeIndex));
            }
          });

          el.on('click', '.product-nav-slider__slide', function () {
            const slide = $(this);
            mainSlider[0].swiper.slideTo(slide.index());
          });
        }
      },
      slideChange() {
        const self = this;
        slides
          .removeClass('is-active')
          .eq(self.activeIndex)
          .addClass('is-active');
        if (mainSlider || mainSlider.length || mainSlider[0].swiper) {
          const mainSwiper = mainSlider[0].swiper;
          mainSwiper.slideTo(self.activeIndex);
        }
      },
    },
  });
  $(sliderElement).each((ix, elem) => {
    $(elem)[0].swiper.update();
  });
};
