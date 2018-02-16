import { BEFORE_SHOW, BEFORE_HIDE } from '../../blocks/dropdown/dropdown';
import * as pageOverlay from '../../blocks/page-overlay/page-overlay';

const { $ } = window;
const { animationDuration } = window.globalOptions;

function handleCityItemClick(e) {
  e.preventDefault();
  const self = $(this);
  const item = self.parent();
  const isActive = item.hasClass('is-active');
  const body = item.find('.shoplink__body');

  body[isActive ? 'slideUp' : 'slideDown'](animationDuration, () => {
    item
      .toggleClass('is-active')
      .siblings('.shoplink__item')
      .find('.shoplink__body')
      .slideUp(animationDuration, function () { // eslint-disable-line func-names
        $(this)
          .parent()
          .removeClass('is-active');
      });
  });
}

$(document)
  .on(BEFORE_SHOW, '.js-shopmenu-dropdown', () => pageOverlay.show('shopmenu'))
  .on(BEFORE_HIDE, '.js-shopmenu-dropdown', () => pageOverlay.hide())
  .on('click', '.js-shopmenu-accordion', handleCityItemClick);
