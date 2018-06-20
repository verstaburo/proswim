const $ = window.$;

$(document).on('click', '.js-add-comparison', function () {
  if ($(this).hasClass('is-added')) {
    $(this).removeClass('is-added');
  } else {
    $(this).addClass('is-added');
  }
});
