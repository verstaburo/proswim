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
    .addClass('is-active')
    .attr('data-for', forElement);
};

export const hide = () => {
  const block = $('.js-page-overlay');

  if (!block) {
    return;
  }

  unfreeze();
  block
    .trigger(BEFORE_SHOW)
    .removeClass('is-active')
    .removeAttr('data-for', null);
};


$(document).on('transitionend', '.js-page-overlay', function () { // eslint-disable-line func-names
  const self = $(this);
  const event = [BEFORE_HIDE, BEFORE_SHOW][Number(self.hasClass('is-active'))];

  self.trigger(event);
});
