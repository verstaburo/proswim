const $ = window.$;

const setPlaceholder = () => {
  $('[data-mobile-placeholder]').each(function () {
    const self = $(this);

    const ww = $(window).width();

    if (!self.data('desktop-placeholder')) {
      self.data('desktop-placeholder', self.attr('placeholder'));
    }

    if (ww < window.globalOptions.sizes.sm) {
      self.attr('placeholder', self.data('mobile-placeholder'));
    } else {
      self.attr('placeholder', self.data('desktop-placeholder'));
    }
  });
};

setPlaceholder();

let placeholderTimer = null;

$(window).on('resize', () => {
  clearTimeout(placeholderTimer);
  placeholderTimer = setTimeout(setPlaceholder, 100);
});

$(document).on('input focus mouseenter', '.js-search-online .searchbar__input', (evt) => {
  if ($(evt.target).val() !== '') {
    $(evt.target).closest('.searchbar').addClass('is-searched');
  } else {
    $(evt.target).closest('.searchbar').removeClass('is-searched');
  }
});

$(document).on('mouseleave', '.searchbar', (evt) => {
  $(evt.currentTarget).removeClass('is-searched');
});
