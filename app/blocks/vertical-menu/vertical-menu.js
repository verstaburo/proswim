const $ = window.$;

function initVerticalMenu() {
  $('.vertical-menu').each(function () {
    const block = $(this);
    const button = block.find('.vertical-menu__button');

    if (!button.length) {
      return;
    }

    button.toggleClass('is-active', block.hasClass('is-active'));
  });
}

function toggleVerticalMenu(e) {
  e.preventDefault();

  const btn = $(this);
  const parent = btn.closest('.vertical-menu');

  btn.toggleClass('is-active');

  parent
    .children('.vertical-menu__items')
    .slideToggle(window.globalOptions.animationDuration, () => {
      parent.toggleClass('is-active');
    });
}

$(document).on('click', '.js-vertical-menu-button', toggleVerticalMenu);
initVerticalMenu();
