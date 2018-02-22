const { $ } = window;

function handleAccordionClick(e) {
  e.preventDefault();
  const self = $(this);
  const isActive = self.hasClass('is-active');
  const { animationDuration, sizes } = window.globalOptions;

  if ($(window).width() >= sizes.sm) {
    return;
  }

  self.next()[isActive ? 'slideUp' : 'slideDown'](animationDuration);
  self.toggleClass('is-active');
}

$(document).on('click', '.js-footer-accordion', handleAccordionClick);
