const $ = window.$;

$(document).on('click', '.js-toggleBlock', (e) => {
  console.log('123');
  e.preventDefault();
  $('.notification__form').slideToggle('slow');
});
