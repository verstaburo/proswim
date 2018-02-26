// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';

import { freeze, unfreeze } from '../js-functions/freeze';

const $ = window.$;

export default function popups() {
  $(document).on('click', '.js-popup-close', (e) => {
    e.preventDefault();

    $.fancybox.close();
  });

  $(document).on('click', '[data-popup]', function (e) {
    if ($(window).width() < window.globalOptions.sizes.lg) {
      return;
    }

    e.preventDefault();
    const popup = $($(this).data('popup'));

    $.fancybox.open(popup, {
      afterLoad: freeze,
      afterClose: unfreeze,
    });
  });
}
