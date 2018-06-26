const $ = window.$;

$(document).on('click', '.js-totop', (e) => {
  e.preventDefault();
  const target = $('body');
  if (target.length > 0) {
    $('body, html').stop().animate({
      scrollTop: target.offset().top,
    }, 1000, 'swing');
  }
});

$(window).on('scroll', () => {
  if ($('.js-totop').length > 0) {
    const sT = $(window).scrollTop();
    if (sT > 200) {
      $('.js-totop').addClass('is-visible');
    } else {
      $('.js-totop').removeClass('is-visible');
    }
  }
});
