const $ = window.$;

$(document).on('click', '.js-home-seo-section-more', function (e) {
  e.preventDefault();

  $('.js-home-seo-section-cutoff').slideDown(window.globalOptions.time);
  $(this).fadeOut(window.globalOptions.time);
});
