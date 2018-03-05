/* eslint-disable */
/**
 * #################################
 * Отправка формы на странице товара
 * #################################
 */

$('.js-product-item-form').on('submit', function (e) {
  e.preventDefault();
  var self = $(this);

  self.parsley().validate();

  if (!self.parsley().isValid()) {
    return;
  }

  window.popups.show('#item-added-popup');
});
/* eslint-enable */
