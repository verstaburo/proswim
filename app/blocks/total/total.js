const $ = window.$;

$(document).on('click', '.js-total-promolink', function (e) {
  e.preventDefault();

  const promoblock = $('.js-total-promoblock');

  if (!promoblock.length) {
    return;
  }

  $(this).parent().hide();
  promoblock.fadeIn(window.globalOptions.animationDuration);
});
