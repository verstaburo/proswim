/* eslint-disable */

/**
 * Маркер на карте
 * @param loc {Array} [lat {Number}, lng {Number}]
 * @param params {Object} icon params
 */

function makeMapPin(loc, iconName, params) {
  var nextParams = typeof params === "object" ? params : {},
      nextIconName = typeof iconName === 'undefined' ? 'swim' : iconName;

  if (nextIconName) {
    icon = '<img class="leaflet-div-icon__icon" src="assets/images/'+nextIconName+'.png">';
  } else {
    icon = '';
  }

  var pinIcon = '<svg class="leaflet-div-icon__pin" viewBox="0 0 32 45"><defs><linearGradient id="defaultPinGradient" x1="68.2%" x2="0%" y1="0%" y2="73.135%"><stop offset="0%" stop-color="rgb(77,82,84)" stop-opacity="1" /><stop offset="100%" stop-color="rgb(89,94,97)" stop-opacity="1" /></linearGradient><linearGradient id="ActivePinGradient" x1="68.2%" x2="0%" y1="0%" y2="73.135%"><stop offset="0%" stop-color="rgb(0,155,212)" stop-opacity="1" /><stop offset="100%" stop-color="rgb(0,171,231)" stop-opacity="1" /></linearGradient></defs><g transform="translate(-11.38 -4.88)"><path fill="url(#defaultPinGradient)" d="M38.69,9.49a16.17,16.17,0,0,0-22.63,0C10.47,15,9.78,25.37,14.56,31.64L27.38,49.88l12.8-18.21C45,25.37,44.29,15,38.69,9.49Z"/><path fill="url(#ActivePinGradient)" d="M38.69,9.49a16.17,16.17,0,0,0-22.63,0C10.47,15,9.78,25.37,14.56,31.64L27.38,49.88l12.8-18.21C45,25.37,44.29,15,38.69,9.49Z"/></g></svg>';


  return L.marker(loc, {
    icon: L.divIcon($.extend({
      shadowUrl: 'assets/images/marker-shadow.png',
      iconSize: [32, 45],
      html: icon + pinIcon + '<div class="leaflet-div-icon__shadow"></div>'
    }, nextParams)),
  }).on('popupopen', function(e) {
    $(e.target._icon).addClass('is-active');
  }).on('popupclose', function(e) {
    $(e.target._icon).removeClass('is-active');
  });
}

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

/**
 * Выбор первой радиокноки в выбранной вкладке (доставка)
 */
$(document).on('TAB_SHOWN', '[data-tab]', function () {
  var deliveryItem = $(this).find('.js-delivery-item');

  if (deliveryItem.length) {
    deliveryItem.first().prop('checked', true).trigger('change');
  }
});

/**
 * Настройка карты доставки
 */
function initMap() {
  if (!$('#delivery-map').length) {
    return;
  }

  var map = L.map('delivery-map').setView([59.934, 30.335], 13);

  map.removeControl(map.zoomControl);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
  }).addTo(map);

  // Обновляем размеры карты при переключении вкладки
  $(document).on('TAB_SHOWN', '[data-tab]', function () {
    map.invalidateSize(false);
  });

  return map;
}

/**
 * Генерация попапа доставки
 */
function getDeliveryPopup(data) {
  var popup = $('<div class="address-popup"></div>'),
      body = $('<div class="address-popup__body"></div>'),
      station = $('<div class="address-popup__heading">' + data.station + '</div>'),
      addr = $('<p class="address-popup__text address-popup__text_bold">' + data.addr + '</p>');
      description = $('<p class="address-popup__text">' + data.description + '</p>'),
      btn = $('<button class="button button_size_sm address-popup__button js-select-self-discharge-point">Доставить сюда</button>');

  if (data.city) {
    popup.attr('data-city', data.city);
  }

  if (data.icon) {
    popup.attr('data-icon', data.icon);
  }

  popup
    .append(station)
    .append(body);

  body
    .append(addr)
    .append(description);

  $.each(data.textList, function() {
    $('<p></p>')
      .append('<span class="address-popup__text">' + this.key + '</span> ')
      .append('<span class="address-popup__text address-popup__text_grey">' + this.value + '</span>')
      .appendTo(body);
  });

  body.append(btn);

  return L.popup({
      className: 'address-popup-wrapper',
      width: 288,
      offset: {
        x: 0,
        y: 0,
      },
    })
    .setContent(popup[0].outerHTML);
}

var deliveryCartMap = initMap(),
    delvieryCartMapMarkers = [];

var currValue = $('.js-map-change').val().split(';');
var currCoordinates = currValue[1].split(',');
deliveryCartMap.setView([currCoordinates[0], currCoordinates[1]], 13);

$(document).on('change', '.js-map-change', (evt) => {
  var newValue = $(evt.target).val().split(';');
  var newCoordinates = newValue[1].split(',');
  deliveryCartMap.setView([newCoordinates[0], newCoordinates[1]], 13);
});

/**
 * При переключении радиокнопки рисуем маркеры на карте доставки
 */
$(document).on('change', '.js-delivery-item', function () {
  if (!deliveryCartMap) {
    return;
  }

  if (!$(this).parents('.tabs-content__wrapper').find('.map').length) {
    return;
  }

  // Удаляем маркеры
  $.each(delvieryCartMapMarkers, function () {
    this.remove();
  });

  // Генерация попапа
  var popup = getDeliveryPopup({
    station: 'Ленинский пр-т',
    addr: 'Ул. Вавилова, д.3, ТЦ “Гагаринский”',
    description: '1 минута пешком от метро, 2-й этаж',
    textList: [
      { key: 'График работы:', value: 'с 9.00 до 20.00' },
      { key: 'Телефон магазина:', value: '8 (495) 730-30-62' },
      { key: 'Примерка:', value: 'Есть примерка' },
    ],
    icon: 'logo',
    city: 'Москва',
  });

  // генерация маркеров
  delvieryCartMapMarkers = [
    window.makeMapPin([59.934, 30.335]).addTo(deliveryCartMap).bindPopup(popup),
    marker2 = window.makeMapPin([59.931494, 30.330091]).addTo(deliveryCartMap).bindPopup(popup),
    marker3 = window.makeMapPin([59.929947, 30.337687]).addTo(deliveryCartMap).bindPopup(popup),
  ];
});

/**
 * Выбор пункта самовывоза
 */

$(document).on('click', '.js-select-self-discharge-point', function (e) {
  e.preventDefault();

  var block = $(this).parents('.address-popup'),
      section = $('.js-selected-self-discharge-point');

  if (!section.length) {
    return;
  }

  var newBlock = block.clone(),
      icon = newBlock.data('icon'),
      city = newBlock.data('city');

  // добавляем город
  if (city) {
    newBlock.prepend('<div class="address-popup__heading address-popup__heading_city">' + city + '</div>');
  }

  // добавляем иконку
  if (icon) {
    newBlock.prepend('<svg class="icon icon_' + icon + '"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/images/icon.svg#icon_' + icon + '"></use></svg>');
  }

  // меняем модификатор
  newBlock.addClass('address-popup_chosen');

  // меняем кнопку
  newBlock
    .find('.button')
    .removeClass('button_size_sm js-select-self-discharge-point')
    .addClass('button_size_md button_transparent js-select-another-self-discharge-point')
    .text('Выбрать другой');

  // Скрываем карту
  $('.js-delivery-map-col').fadeOut(window.globalOptions.animationDuration);

  // рендерим блок
  section
    .fadeIn(window.globalOptions.animationDuration)
    .find('.address-popup-section__content')
    .html(newBlock);

  // Закрываем попапы
  if (deliveryCartMap) {
    deliveryCartMap.closePopup();
  }
});

/**
 * Выбор другого пункта самовывоза
 */
$(document).on('click', '.js-select-another-self-discharge-point', function (e) {
  e.preventDefault();
  // Скрываем секцию выбранного пункта
  $('.js-selected-self-discharge-point').fadeOut(window.globalOptions.animationDuration);

  // Показываем карту
  $('.js-delivery-map-col').fadeIn(window.globalOptions.animationDuration);

});

/**
 * Карты на странице контактов
 */

function initContactsMap(id, markerLocations) {
  if (!$('#' + id).length) {
    return;
  }

  var map = L.map(id).setView(markerLocations[0], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
  }).addTo(map);

  map.removeControl(map.zoomControl);

  var icon = L.icon({
    iconUrl: 'assets/images/pin.svg',
    shadowUrl: 'assets/images/marker-shadow.png',
    popupAnchor: [174, 189],
    iconSize: [32, 45],
    shadowSize: [31, 17],
    shadowAnchor: [16, -15],
  });

  $.each(markerLocations, function () {
    window.makeMapPin(this).addTo(map);
  });
}

initContactsMap('pickup-contacts-map', [[59.934, 30.335]]);
initContactsMap('msk-shop-contacts-map', [[59.934, 30.335], [59.9336222, 30.3469712], [59.9314322, 30.3429312]]);
initContactsMap('spb-shop-contacts-map', [[59.934, 30.335]]);


/**
* Показать город
*/

$(document).on('change', '.js-no-city-in-list', function(e) {
  var isChecked = $(this).is(':checked'),
      additionalCity = $($(this).parents('.checkradio').data('target'));

  if (!additionalCity.length) {
    return;
  }

  var action = isChecked ? 'fadeIn' : 'fadeOut';
  additionalCity[action](window.globalOptions.animationDuration);
});
/* eslint-enable */
