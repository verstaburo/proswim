/* eslint-disable no-unused-vars */
// http://idangero.us/swiper/#.WcIu5oy0OHs
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

export default function slidersAbout() {
  const sliderShop1 = new Swiper('[data-slider="slider-shop-1"]', {
    loop: false,
    speed: 700,
    autoplay: false,
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
      nextEl: '.js-button-next_shop-1',
      prevEl: '.js-button-prev_shop-1',
    },
  });
  const sliderShop2 = new Swiper('[data-slider="slider-shop-2"]', {
    loop: false,
    speed: 700,
    autoplay: false,
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
      nextEl: '.js-button-next_shop-2',
      prevEl: '.js-button-prev_shop-2',
    },
  });
  const sliderShop3 = new Swiper('[data-slider="slider-shop-3"]', {
    loop: false,
    speed: 700,
    autoplay: false,
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
      nextEl: '.js-button-next_shop-3',
      prevEl: '.js-button-prev_shop-3',
    },
  });
  const sliderMarket1 = new Swiper('[data-slider="slider-market-1"]', {
    loop: false,
    speed: 700,
    autoplay: false,
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
      nextEl: '.js-button-next_market-1',
      prevEl: '.js-button-prev_market-1',
    },
  });
  const sliderMarket2 = new Swiper('[data-slider="slider-market-2"]', {
    loop: false,
    speed: 700,
    autoplay: false,
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
      nextEl: '.js-button-next_market-2',
      prevEl: '.js-button-prev_market-2',
    },
  });
  const sliderStore = new Swiper('[data-slider="slider-store"]', {
    loop: false,
    speed: 700,
    autoplay: false,
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
      nextEl: '.js-button-next_store',
      prevEl: '.js-button-prev_store',
    },
  });
}
/* eslint-enable no-unused-vars */
