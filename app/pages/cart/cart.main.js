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
      discountEl = totalBlock.find('.js-total-discount'),
      sum = 0,
      amount = 0,
      discount = 0;

  if (!totalBlock.length) {
    return;
  }

  $('.js-product-cart-item').each(function (i, el) {
    var self = $(el);
    console.log($(self).attr('data-item-price'));
    console.log($(self).attr('data-item-count'));
    console.log($(self).attr('data-item-discountsum'));
    sum += Number($(self).attr('data-item-price')) * Number($(self).attr('data-item-count'));
    discount += Number($(self).attr('data-item-discountsum')) * Number($(self).attr('data-item-count'));
  });

  amount = sum;

  if (deliveryEl.length) {
    var deliveryPrice = Number($('.js-delivery-item:checked').data('price')) || 0;
    amount += deliveryPrice;

    deliveryEl.text(window.numberWithSpaces(deliveryPrice));
  }

  if (discountEl.length) {
    amount -= discount;
    discountEl.text("-" + window.numberWithSpaces(discount));
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
 * Установка скидки на товар
 */
if ($('.js-product-cart-item').length > 0) {
  function discountSet() {
    $('.js-product-cart-item').each(function(i, el) {
      var priceEl = $(el).find('.js-product-cart-item-price'),
          countEl = $(el).find('.js-product-cart-item-count'),
          amountEl = $(el).find('.js-product-cart-item-amount'),
          inputEl = $(el).find('.js-product-cart-item-input'),
          discountEl = $(el).find('.js-product-cart-item-discounts');

      var discount = Number($(el).attr('data-item-discount')) || 0,
          oldPrice = Number($(el).attr('data-item-price')),
          price = parseInt(oldPrice * ((100 - discount) / 100), 10),
          discountSum = parseInt(oldPrice * (discount * 0.01), 10),
          count = Number($(inputEl).val()),
          amount = price * count;

      amountEl.text(window.numberWithSpaces(amount));
      discountEl.attr('data-price', oldPrice + ' руб.');
      priceEl.text(window.numberWithSpaces(price));
      $(el).attr('data-item-newprice', price);
      discountEl.attr('data-discount', 'Скидка: ' + discount + '%');
      countEl.text(count);
      $(el)..attr('data-item-count', count);
      $(el).attr('data-item-discountsum', discountSum);
    });
    updateTotal();
  }
  discountSet();
}
/**
 * Обновление кол-ва и цены (за несколько товаров) в карточке
 */
$(document).on('change', '.js-product-cart-item-input', function () {
  var self = $(this),
      parent = self.parents('.js-product-cart-item'),
      priceEl = parent.find('.js-product-cart-item-price'),
      countEl = parent.find('.js-product-cart-item-count'),
      amountEl = parent.find('.js-product-cart-item-amount'),
      discountEl = parent.find('.js-product-cart-item-discounts');

  var discount = Number($(parent).attr('data-item-discount')) || 0,
      oldPrice = Number($(parent).attr('data-item-price')),
      price = parseInt(oldPrice * ((100 - discount) / 100), 10),
      discountSum = parseInt(oldPrice * (discount * 0.01), 10),
      count = Number(self.val()),
      amount = price * count;

  amountEl.text(window.numberWithSpaces(amount));
  discountEl.attr('data-price', oldPrice + ' руб.');
  priceEl.text(window.numberWithSpaces(price));
  parent.attr('data-item-newprice', price);
  discountEl.attr('data-discount', 'Скидка: ' + discount + '%');
  countEl.text(count);
  parent.attr('data-item-count', count);
  parent.attr('data-item-discountsum', discountSum);

  countEl.parents('.product-cart-item__col').toggleClass('is-empty', count <= 1);
  updateTotal();
});

/**
 * Обновление стоимости доставки
 */
$(document).on('change', '.js-delivery-item', updateTotal);
