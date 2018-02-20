const $ = window.$;

$('.js-truncate').each(function () {
  const self = $(this);

  self.dotdotdot({
    truncate: 'letter',
    watch: 'window',
    height: self.css('max-height'),
  });
});
