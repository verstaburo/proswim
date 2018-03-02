const $ = window.$;

$(document).on('click', '.js-seo-section-more', function (e) {
  e.preventDefault();

  $('.js-seo-section-cutoff').slideDown(window.globalOptions.time);
  $(this).parent().fadeOut(window.globalOptions.time);
});
