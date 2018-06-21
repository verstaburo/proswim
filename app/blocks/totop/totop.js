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
