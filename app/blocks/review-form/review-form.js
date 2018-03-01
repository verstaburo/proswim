const $ = window.$;

$(document).on('click', '.js-review-form-section-button', function (e) {
  e.preventDefault();

  const block = $(this).parents('.review-form-section');

  const short = block.find('.review-form-section__short');
  const full = block.find('.review-form-section__full');

  short.hide();
  full.slideDown(window.globalOptions.animationDuration);
});
