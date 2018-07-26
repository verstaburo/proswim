/* eslint-disable no-unused-vars */
import $ from 'jquery';

// http://iamceege.github.io/tooltipster/
import tooltipster from 'tooltipster';

const noUiSlider = window.noUiSlider;

export default function rateRangeSlider() {
  $('.js-rate-range').each((i, el) => {
    const initValue = parseInt($(el).closest('.rate-range').find('input').val(), 10);
    noUiSlider.create($(el)[0], {
      start: initValue,
      connect: [false, true],
      step: 1,
      margin: 15,
      range: {
        min: 1,
        max: 10,
      },
      pips: {
        mode: 'steps',
        stepped: true,
        density: 10,
      },
    });
    $(el).closest('.rate-range').find('.smile').each((ixs, elems) => {
      $(elems).attr('data-value', ixs + 1);
      if (ixs === initValue - 1) {
        $(elems).addClass('is-active');
      }
    });
    $(el).find('.noUi-value').each((ix, elem) => {
      $(elem).attr('data-value', ix + 1);
      if (ix === initValue - 1) {
        $(elem).addClass('is-active');
      }
    });

    $(el)[0].noUiSlider.on('slide', (values, handle) => {
      const self = $(el).closest('.rate-range');
      const value = parseInt($(self).find(`[data-handle="${handle}"]`).attr('aria-valuetext'), 10);
      $(self).find('[data-value]').removeClass('is-active');
      $(self).find(`[data-value="${value}"]`).addClass('is-active');
    });

    $(el)[0].noUiSlider.on('change', (values) => {
      const self = $(el).closest('.rate-range');
      const value = parseInt(values[0], 10);
      $(self).find('[data-value]').removeClass('is-active');
      $(self).find(`[data-value="${value}"]`).addClass('is-active');
      $(self).find('input[type="hidden"]').val(value);
    });

    $(el).find('.noUi-handle').tooltipster({
      contentAsHTML: true,
      animationDuration: window.globalOptions.animationDuration,
      animation: 'fade',
      delay: 0,
      distance: 68,
      debug: true,
      side: 'top',
      theme: ['tooltipster-light', 'tooltipster-light-customize'],
      functionBefore(instance, helper) {
        const self = helper.origin;
        const value = parseInt($(self).attr('aria-valuetext'), 10);
        const text = $(self).closest('.rate-range').find(`.smile[data-value="${value}"]`).attr('data-tooltip');
        instance.content(`<p>${text}</p>`);
      },
      functionPosition(instance, helper, position) {
        const parent = $(helper.origin).closest('.rate-range');
        const parentMesures = parent[0].getBoundingClientRect();
        const newPosition = position;
        if (parentMesures.right - helper.geo.origin.windowOffset.right < position.size.width / 2) {
          newPosition.coord.left = parentMesures.right - position.size.width;
        }
        if (helper.geo.origin.windowOffset.left - parentMesures.left < position.size.width / 2) {
          newPosition.coord.left = parentMesures.left;
        }
        return newPosition;
      },
    });
  });
}
