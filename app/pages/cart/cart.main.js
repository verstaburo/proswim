/**
 * Обновление итоговой стоимости
 */
function updateTotal() {
  var totalBlock = $('.js-total');

  if (!totalBlock.length) {
    return;
  }

  var sumEl = totalBlock.find('.js-total-sum'),
      deliveryEl = totalBlock.find('.js-total-delivery'),
      amountEl = totalBlock.find('.js-total-amount'),
      sum = 0,
      amount = 0;

  if (!totalBlock.length) {
    return;
  }

  $('.js-product-cart-item').each(function () {
    var self = $(this);

    sum += Number(self.data('item-price')) * Number(self.data('item-count'));
  });

  amount = sum;

  if (deliveryEl.length) {
    var deliveryPrice = Number($('.js-delivery-item:checked').data('price')) || 0;
    amount += deliveryPrice;

    deliveryEl.text(window.numberWithSpaces(deliveryPrice));
  }

  sumEl.text(window.numberWithSpaces(sum));
  amountEl.text(window.numberWithSpaces(amount));
}
updateTotal();

/**
 * Удаление карточки
 */
$(document).on('click', '.js-product-cart-item-remove', function (e) {
  e.preventDefault();
  $(this)
    .parents('.js-product-cart-item')
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
      parent = self.parents('.js-product-cart-item'),
      priceEl = parent.find('.js-product-cart-item-price'),
      countEl = parent.find('.js-product-cart-item-count'),
      amountEl = parent.find('.js-product-cart-item-amount');

  var price = Number(parent.data('item-price'));
      count = Number(self.val()),
      amount = price * count;

  amountEl.text(window.numberWithSpaces(amount));
  parent.data('item-price', price);

  countEl.text(count);
  parent.data('item-count', count);

  countEl.parents('.product-cart-item__col').toggleClass('is-empty', count <= 1);
  updateTotal();
});

/**
 * Обновление стоимости доставки
 */
$(document).on('change', '.js-delivery-item', updateTotal);
