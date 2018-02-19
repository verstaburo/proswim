import * as Swiper from 'swiper/dist/js/swiper';

const { $ } = window;

function articlesSection() {
  const sliderElement = $('.js-articles-section-slider');
  const sliderGrid = sliderElement.find('.grid');
  const sliderSlide = sliderElement.find('.grid__col');

  if (!sliderElement.length) {
    return;
  }

  // destroy slider
  if ($(window).width() >= window.globalOptions.sizes.tablet) {
    sliderElement.removeClass('swiper-container');
    sliderGrid.removeClass('swiper-wrapper');
    sliderSlide.removeClass('swiper-slide');

    const swiper = sliderElement[0].swiper;

    if (swiper) {
      swiper.destroy();
    }

    return;
  }

  // ignore if already initialized
  if (sliderElement.hasClass('swiper-container-horizontal')) {
    return;
  }

  sliderElement.addClass('swiper-container');
  sliderGrid.addClass('swiper-wrapper');
  sliderSlide.addClass('swiper-slide');

  // eslint-disable-next-line no-unused-vars
  const slider = new Swiper('.js-articles-section-slider', {
    loop: true,
    autoplay: false,
    slidesPerView: 'auto',
    spaceBetween: 10,
    roundLengths: true,
  });
}

articlesSection();

let resizeTimer = null;

$(window).on('resize', () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(articlesSection, 100);
});
