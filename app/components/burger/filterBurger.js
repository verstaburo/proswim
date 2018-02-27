import { freeze, unfreeze } from '../../blocks/js-functions/freeze';

const $ = window.$;
let resizeTimeout = null;

$(window).on('resize', () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    if (!$('.js-filter-burger.is-active').length) {
      return;
    }

    if ($(window).width() >= window.globalOptions.sizes.lg) {
      unfreeze();
    } else {
      freeze();
    }
  }, 100);
});

function toggleFilterBurger(e) {
  e.preventDefault();
  const self = $(this);
  const burgerId = self.data('burger');
  let target;

  if (self.hasClass('js-filter-burger-close')) {
    target = $('.js-filter-burger.is-active');
  } else {
    target = $(burgerId);
  }

  if (!target.length) {
    return;
  }

  target.toggleClass('is-active');
  const isActive = target.hasClass('is-active');
  [unfreeze, freeze][Number(isActive)]();
}

$(document).on('click', '.js-filter-burger-button, .js-filter-burger-close', toggleFilterBurger);
