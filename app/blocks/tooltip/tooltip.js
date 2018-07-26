/* eslint-disable no-unused-vars */
import $ from 'jquery';

// http://iamceege.github.io/tooltipster/
import tooltipster from 'tooltipster';

export default function tooltips() {
  $('.js-tooltip').each(function () {
    const self = $(this);

    self.tooltipster({
      contentAsHTML: true,
      animationDuration: window.globalOptions.animationDuration,
      animation: 'fade',
      delay: 0,
      debug: true,
      side: ['top', 'bottom', 'left', 'right'],
      theme: 'tooltipster-borderless',
      functionInit(instance, helper) {
        const $origin = $(helper.origin);
        let dataOptions = $origin.attr('data-tooltipster');

        if (dataOptions) {
          dataOptions = JSON.parse(dataOptions);

          $.each(dataOptions, (name, option) => {
            instance.option(name, option);
          });
        }
      },
    });
  });
}
/* eslint-enable no-unused-vars */
