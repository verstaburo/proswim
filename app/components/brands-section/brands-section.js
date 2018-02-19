const $ = window.$;

function toggleBrandsSection(e) {
  e.preventDefault();
  const section = $(this).parents('.brands-section');

  if (!section.length) {
    return;
  }

  section.toggleClass('is-active');
}

$(document).on('click', '.js-brands-section-toggle', toggleBrandsSection);
