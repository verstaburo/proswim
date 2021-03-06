/* eslint-disable */
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

  function declOfNum(n) {
    const titles = ['отзыв', 'отзыва', 'отзывов'];
    let res;
    if (n % 10 === 1 && n % 100 !== 11) {
      res = 0;
    } else {
      res = n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    }
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
        <span class="rating__text rating__text_grey js-anchor">${reviews} <span class="hide-sm ">${declOfNum(reviews)}</span></span>
      </div>
    </div>`;
    return elem;
  }
  // TODO: td
  function generateRow(cells, arrValues, title) {
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
            <td>${title ? title : ''}</td>
            <td>${arrValues[0] ? arrValues[0] : ''}</td>
            <td>${arrValues[1] ? arrValues[1] : ''}</td>
            <td>${arrValues[2] ? arrValues[2] : ''}</td>
          </tr>`;
        break;
      default:
        res = `<tr>
            <td>${title ? title : ''}</td>
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
    if (tableDiff === 'diff') {
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
      const specData = dataObj.names;
      let cells;
      if ($(window).width() < window.globalOptions.sizes.sm) {
        cells = 2;
      } else if ($(window).width() < window.globalOptions.sizes.lg) {
        cells = 3;
      } else {
        cells = 4;
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
          row = generateRow(cells, starsData, specData[i]);
          $('.comparison-table__table').append(row);
        } else {
          row = generateRow(cells, rowData, specData[i]);
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
    const currentSlide = $(self).closest('.comparison-table__slide');
    const index = $(self).closest('.comparison-table__slide').attr('data-slide-index');
    currentSlide.remove();
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

  $(document).on('change', '.js-toggle-diff input', (evt) => {
    const self = evt.target;
    const compareTarget = $('.js-compare-slider');
    if (compareTarget.length > 0) {
      if ($(self).prop('checked')) {
        $(compareTarget).attr('data-diff', 'diff');
      } else {
        $(compareTarget).attr('data-diff', 'all');
      }
      generateTable();
    }
  });
}
/* eslint-disable */
