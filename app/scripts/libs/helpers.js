const $ = window.$;

$(document).on('click', '.js-print', (e) => {
  e.preventDefault();

  window.print();
});
