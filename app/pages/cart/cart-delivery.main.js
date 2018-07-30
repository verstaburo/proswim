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

if ($('.js-map-change').length > 0) {
  var currValue = $('.js-map-change').val().split(';');
  var currCoordinates = currValue[1].split(',');
  deliveryCartMap.setView([currCoordinates[0], currCoordinates[1]], 13);

  $(document).on('change', '.js-map-change', (evt) => {
    var newValue = $(evt.target).val().split(';');
    var newCoordinates = newValue[1].split(',');
    deliveryCartMap.setView([newCoordinates[0], newCoordinates[1]], 13);
  });
}

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
