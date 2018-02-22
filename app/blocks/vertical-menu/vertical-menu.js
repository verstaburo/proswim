const $ = window.$;

function toggleVerticalMenu(e) {
  e.preventDefault();

  const parent = $(this).parents('.vertical-menu');
  const isActive = parent.hasClass('is-active');

  parent
    .toggleClass('is-opening', !isActive)
    .toggleClass('is-closing', isActive)
    .find('.vertical-menu__items')
    .slideToggle(window.globalOptions.animationDuration, () => {
      parent
        .toggleClass('is-active')
        .removeClass('is-opening is-closing');
    });
}

$(document).on('click', '.js-vertical-menu-button', toggleVerticalMenu);
