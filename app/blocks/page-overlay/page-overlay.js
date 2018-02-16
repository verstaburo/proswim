import { freeze, unfreeze } from '../js-functions/freeze';

export const HIDDEN = 'page-overlay/shown';
export const SHOWN = 'page-overlay/hidden';
export const BEFORE_SHOW = 'page-overlay/beforeshow';
export const BEFORE_HIDE = 'page-overlay/beforehide';

const $ = window.$;

export const show = (forElement) => {
  const block = $('.js-page-overlay');

  if (!block) {
    return;
  }

  freeze();
  block
    .trigger(BEFORE_SHOW)
    .attr('data-for', forElement)
    .addClass('is-active');
};

export const hide = () => {
  const block = $('.js-page-overlay');

  if (!block) {
    return;
  }

  unfreeze();
  block
    .trigger(BEFORE_SHOW)
    .removeClass('is-active');
};


$(document).on('transitionend', '.js-page-overlay', function () { // eslint-disable-line func-names
  const self = $(this);
  const event = [HIDDEN, SHOWN][Number(self.hasClass('is-active'))];

  self.trigger(event);

  if (event === HIDDEN) {
    self.removeAttr('data-for');
  }
});
