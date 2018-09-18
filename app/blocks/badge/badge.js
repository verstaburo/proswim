/* eslint-disable */
const $ = window.$;

$( document ).ready(function() {
  const badge = $('.badge');

  badge.each(function () {
    const self = $(this);
    if (self.siblings('.badge').length > 0) {
      self.siblings('.badge_green').addClass('is-hidden');
    }
  });
});
