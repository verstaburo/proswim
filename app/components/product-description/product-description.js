const $ = window.$;

$(document).on('click', '.js-product-description-button', function (e) {
  e.preventDefault();
  const self = $(this);
  const block = self.parents('.product-description__block');
  const body = block.find('.product-description__body');

  block.toggleClass('is-active');
  body.slideToggle(window.globalOptions.animationDuration);
});
