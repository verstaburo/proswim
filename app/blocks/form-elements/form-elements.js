// https://github.com/jshjohnson/Choices
import Choices from 'choices.js';

// https://github.com/leongersen/noUiSlider
import noUiSlider from 'nouislider';

// https://github.com/t1m0n/air-datepicker
import 'air-datepicker';

// https://github.com/RobinHerbots/Inputmask
import Inputmask from 'inputmask';

import $$ from 'jquery';

const $ = window.$;

export function selects() {
  /* eslint-disable no-unused-vars */
  const selectElements = $('.js-select');

  if (!selectElements.length) {
    return;
  }

  selectElements.each(function () {
    const self = $(this);

    const searchEnabled = !!self.data('search-enabled');

    const choices = new Choices(self[0], {
      searchEnabled,
      itemSelectText: '',
      callbackOnInit() {
        const icon = self.data('toggler-icon');
        const iconModifier = self.data('toggler-icon-mod');

        let modClass = '';

        if (iconModifier) {
          modClass = `choices__togglericon_${iconModifier}`;
        }

        self.parent().append(`<div class="choices__toggler">
          <svg class="choices__togglericon ${modClass}"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/icon.svg#icon_${icon}"></use></svg>
        </div>`);

        // custom scroll
        $$(self.parents('.choices').find('.choices__list--dropdown .choices__list')[0]).scrollbar();
      },
    });
  });

  /* eslint-enable no-unused-vars */
}

export function sliders() {
  // Параметры берутся из дата-атрибутов
  $('.js-range').each(function () {
    const el = $(this);

    noUiSlider.create(el.get(0), {
      start: el.data('start'),
      connect: el.data('connect'),
      range: {
        min: el.data('min'),
        max: el.data('max'),
      },
    });
  });
}

export function datepicker() {
  $('.js-datepicker').each(function () {
    const el = $(this);

    el.datepicker();
  });
}

export function inputmask() {
  Inputmask({
    mask: '+7 (999) 999-99-99',
  }).mask('input[data-type="tel"]');

  Inputmask({
    alias: 'email',
  }).mask('input[data-type="email"]');
}

export function numberinput() {
  $(document).on('click', '.js-numberbox-minus, .js-numberbox-plus', function (e) {
    e.preventDefault();

    const input = $(this).parent().find('.js-numberbox-input');
    let val = +input.val();
    const minus = $(this).attr('class').includes('minus') || false;

    if (!val.length) {
      input.val(1);
    }

    if (minus) {
      input.val(val > 1 ? (val -= 1) : 1);
    } else {
      input.val(val += 1);
    }

    input.trigger('change');
  });

  $(document).on('keyup change', '.js-numberbox-input', function () {
    this.value = this.value.replace(/[^\d]/, '');
    if ($(this).val() < 1) $(this).val(1);
  });
}
