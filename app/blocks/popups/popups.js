// http://fancyapps.com/fancybox/3/
import '@fancyapps/fancybox';

import { freeze, unfreeze } from '../js-functions/freeze';

const $ = window.$;

export default function popups() {
  $('.js-fancybox').fancybox({
    afterLoad: freeze,
    afterClose: unfreeze,
  });

  $(document).on('click', '.js-popup-close', (e) => {
    e.preventDefault();

    $.fancybox.close();
  });
}
