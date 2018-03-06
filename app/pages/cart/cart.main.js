/**
 * Обновление итоговой стоимости
 */
function updateTotal() {
  var totalBlock = $('.js-total'),
      totalAmountEl = $('.js-total-amount'),
      amount = 0;

  if (!totalBlock.length) {
    return;
  }

  $('.js-product-cart-item-amount').each(function () {
    amount += Number($(this).text().replace(/[^\d]/, ''));
  });

  totalAmountEl.text(window.numberWithSpaces(amount));
}

/**
 * Удаление карточки
 */
$(document).on('click', '.js-product-cart-item-remove', function (e) {
  e.preventDefault();
  $(this)
    .parents('.product-cart-item')
    .fadeOut(window.globalOptions.animationDuration, function () {
      $(this).remove();
      updateTotal();
    });
});

/**
 * Обновление кол-ва и цены (за несколько товаров) в карточке
 */
$(document).on('change', '.js-product-cart-item-input', function () {
  var self = $(this),
      parent = self.parents('.product-cart-item'),
      priceEl = parent.find('.js-product-cart-item-price'),
      countEl = parent.find('.js-product-cart-item-count'),
      amountEl = parent.find('.js-product-cart-item-amount');

  var price = Number(priceEl.text().replace(/[^\d]/, ''));
      count = Number(self.val()),
      amount = price * count;

  amountEl.text(window.numberWithSpaces(amount));
  countEl.text(count);

  countEl.parents('.product-cart-item__col').toggleClass('is-empty', count <= 1);
  updateTotal();
});
