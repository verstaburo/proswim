const $ = window.$;

const searchItem = (text) => {
  const mainGrid = $('.js-orders-section-items');

  if (!mainGrid.length) {
    return;
  }

  const items = $('[data-order-id]');

  if (!items.length) {
    return;
  }

  items.each(function () {
    const self = $(this);
    const col = self.parents('.js-orders-section-item');
    const orderId = self.data('order-id').toString();
    const foundIndex = orderId.indexOf(text);


    // Показываем все элементы и убираем подсвечивание id
    col.removeClass('is-hidden');
    self.text(orderId);

    if (foundIndex === -1) {
      // Прячем неподходящие элементы
      col.addClass('is-hidden');
    } else {
      // Подсвечиваем текст
      let exprString = `(${text})`;

      if (foundIndex === 1) {
        exprString = `(#${text})`;
      }

      const highlighted = orderId.replace(new RegExp(exprString), '<b>$1</b>');
      self.html(highlighted);
    }
  });
};

/**
 * Listeners
 */
$(document).on('submit', '.js-orders-section-form', function (e) {
  e.preventDefault();
  searchItem($(this).find('input').val());
});

let searchInputTimer = null;

$(document).on('input', '.js-orders-section-form input', function () {
  clearTimeout(searchInputTimer);
  searchInputTimer = setTimeout(() => searchItem($(this).val()), 100);
});
