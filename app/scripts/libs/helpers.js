const $ = window.$;

$(document).on('click', '.js-print', (e) => {
  e.preventDefault();

  window.print();
});

window.numberWithSpaces = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
