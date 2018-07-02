$(document).on('click', '[type="submit"]', function(evt) {
  evt.preventDefault();
  var form = this.form;
  var button = $(this);
  $(button).attr('disabled', 'disabled');
  $(button).addClass('is-loading');
  $.ajax({
    url: '/',
    type: 'POST',
    dataType: 'html',
    data: $(form).serialize(),
    complete: function (res, code) {
      setTimeout(() => {
        $(button).removeClass('is-loading');
        $(button).removeAttr('disabled');
        form.reset();
      }, 250);
    },
  });
});
