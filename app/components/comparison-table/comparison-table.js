/* eslint-disable no-unused-vars */
import * as Swiper from 'swiper/dist/js/swiper';

const $ = window.$;

export default function compare() {
  function productHeight(elements) {
    let nameHeight = 0;
    let priceHeight = 0;
    $(elements).each((i, el) => {
      $(el).find('.product-card__heading').css({ height: '' });
      $(el).find('.product-card__price').css({ height: '' });
      const curNameHeight = $(el).find('.product-card__heading').height();
      const curPriceHeight = $(el).find('.product-card__price').height();
      nameHeight = curNameHeight > nameHeight ? curNameHeight : nameHeight;
      priceHeight = curPriceHeight > priceHeight ? curPriceHeight : priceHeight;
    });
    $(elements).each((i, el) => {
      $(el).find('.product-card__heading').css({ height: `${nameHeight}px` });
      $(el).find('.product-card__price').css({ height: `${priceHeight}px` });
    });
  }

  function declOfNum(number) {
    const titles = ['отзыв', 'отзыва', 'отзывов'];
    const cases = [2, 0, 1, 1, 1, 2];
    const resC = (number % 10 < 5) ? number % 10 : 5;
    const res = (number % 100 > 4 && number % 100 < 20) ? 2 : cases[resC];
    return titles[res];
  }

  function generateRating(stars, reviews) {
    let clsStars1 = '';
    let clsStars2 = '';
    let clsStars3 = '';
    let clsStars4 = '';
    let clsStars5 = '';
    switch (stars) {
      case '1':
        clsStars1 = 'is-active';
        break;
      case '2':
        clsStars2 = 'is-active';
        break;
      case '3':
        clsStars3 = 'is-active';
        break;
      case '4':
        clsStars4 = 'is-active';
        break;
      case '5':
        clsStars5 = 'is-active';
        break;
      default:
        break;
    }
    const elem = `<div class="rating rating_sm">
      <div class="rating__stars">
        <div class="rating__box ${clsStars5}">
          <svg class="rating__icon"><use xlink:href="assets/images/icon.svg#icon_star"></use></svg>
        </div>
        <div class="rating__box ${clsStars4}">
          <svg class="rating__icon"><use xlink:href="assets/images/icon.svg#icon_star"></use></svg>
        </div>
        <div class="rating__box ${clsStars3}">
          <svg class="rating__icon"><use xlink:href="assets/images/icon.svg#icon_star"></use></svg>
        </div>
        <div class="rating__box ${clsStars2}">
          <svg class="rating__icon"><use xlink:href="assets/images/icon.svg#icon_star"></use></svg>
        </div>
        <div class="rating__box ${clsStars1}">
          <svg class="rating__icon"><use xlink:href="assets/images/icon.svg#icon_star"></use></svg>
        </div>
      </div>
      <div class="rating__textwrap">
        <span class="rating__text rating__text_grey js-anchor">${reviews} <span class="hide-sm ">${declOfNum(stars)}</span></span>
      </div>
    </div>`;
    return elem;
  }
  function generateRow(cells, arrValues) {
    let res;
    switch (cells) {
      case 2:
        res = `<tr>
            <td>${arrValues[0] ? arrValues[0] : ''}</td>
            <td>${arrValues[1] ? arrValues[1] : ''}</td>
          </tr>`;
        break;
      case 3:
        res = `<tr>
            <td>${arrValues[0] ? arrValues[0] : ''}</td>
            <td>${arrValues[1] ? arrValues[1] : ''}</td>
            <td>${arrValues[2] ? arrValues[2] : ''}</td>
          </tr>`;
        break;
      default:
        res = `<tr>
            <td>${arrValues[0] ? arrValues[0] : ''}</td>
            <td>${arrValues[1] ? arrValues[1] : ''}</td>
            <td>${arrValues[2] ? arrValues[2] : ''}</td>
            <td>${arrValues[3] ? arrValues[3] : ''}</td>
          </tr>`;
        break;
    }
    return res;
  }
  function generateTable() {
    $('.comparison-table__table tr').remove();
    const tableDiff = $('.js-compare-slider').attr('data-diff');
    const sourceFull = $('.js-compare-slider').attr('data-compare-data');
    const sourceDiff = $('.js-compare-slider').attr('data-compare-data-diff');
    let source;
    if (tableDiff === true) {
      source = sourceDiff;
    } else {
      source = sourceFull;
    }
    $.getJSON(source, (dataObj) => {
      const visibleElements = $('.js-compare-slider').find('.is-visible');
      const elData = [];
      $(visibleElements).each((i, el) => {
        elData.push(dataObj[$(el).attr('data-prodid')]);
      });
      const structure = dataObj.structure;
      let cells;
      if ($(window).width() < window.globalOptions.sizes.sm) {
        console.log('small');
        cells = 2;
      } else if ($(window).width() < window.globalOptions.sizes.lg) {
        cells = 3;
        console.log('middle');
      } else {
        cells = 4;
        console.log('big');
      }
      let row;
      $(structure).each((i, el) => {
        const rowData = [];
        const starsData = [];
        $(elData).each((ix, elem) => {
          rowData.push(elem[el]);
        });
        if (el === 'rating') {
          $(rowData).each((it, elt) => {
            starsData.push(generateRating(elt.stars, elt.reviews));
          });
          row = generateRow(cells, starsData);
          $('.comparison-table__table').append(row);
        } else {
          row = generateRow(cells, rowData);
          $('.comparison-table__table').append(row);
        }
      });
    });
  }
  const compareSlider = new Swiper('.js-compare-slider', {
    slidesPerView: 4,
    spaceBetween: 20,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    navigation: {
      nextEl: '.comparison-table__button_next',
      prevEl: '.comparison-table__button_prev',
      disabledClass: 'is-disabled',
    },
    slideVisibleClass: 'is-visible',
    breakpoints: {
      [window.globalOptions.sizes.sm - 1]: {
        slidesPerView: 2,
        spaceBetween: 1,
      },
      [window.globalOptions.sizes.lg - 1]: {
        slidesPerView: 3,
        spaceBetween: 1,
      },
    },
    on: {
      init() {
        const elements = this.slides;
        $(elements).each((i, el) => {
          $(el).attr('data-slide-index', i);
        });
        productHeight(elements);
        generateTable();
      },
      slideChange() {
        generateTable();
      },
      resize() {
        const elements = this.slides;
        productHeight(elements);
        generateTable();
      },
    },
  });

  $(document).on('click', '.js-remove-slide', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).hasClass('js-remove-slide') ? $(evt.target) : $(evt.target).closest('.js-remove-slide');
    const index = $(self).closest('.comparison-table__slide').attr('data-slide-index');
    compareSlider.removeSlide(index);
    compareSlider.update();
    generateTable();
  });

  $(document).on('click', '.js-del-all-compare-prod', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).hasClass('js-del-all-compare-prod') ? $(evt.target) : $(evt.target).closest('.js-del-all-compare-prod');
    const href = $(self).attr('href');
    compareSlider.removeAllSlides();
    compareSlider.update();
    document.location.href = href;
  });
}
/* eslint-enable no-unused-vars */
