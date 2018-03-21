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

  return L.marker(loc, {
    icon: L.divIcon($.extend({
      shadowUrl: 'assets/images/marker-shadow.png',
      iconSize: [32, 45],
      html: icon + '<div class="leaflet-div-icon__shadow"></div>'
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

  var marker = window.makeMapPin([59.934, 30.335]).addTo(map),
      marker2 = window.makeMapPin([59.931494, 30.330091]).addTo(map),
      marker3 = window.makeMapPin([59.929947, 30.337687]).addTo(map);

  marker.bindPopup(getDeliveryPopup({
    station: 'Ленинский пр-т',
    addr: 'Ул. Вавилова, д.3, ТЦ “Гагаринский”',
    description: '1 минута пешком от метро, 2-й этаж',
    textList: [
      { key: 'График работы:', value: 'с 9.00 до 20.00' },
      { key: 'Телефон магазина:', value: '8 (495) 730-30-62' },
      { key: 'Примерка:', value: 'Есть примерка' },
    ],
  }));

  marker2.bindPopup(getDeliveryPopup({
    station: 'Ленинский пр-т',
    addr: 'Ул. Вавилова, д.3, ТЦ “Гагаринский”',
    description: '1 минута пешком от метро, 2-й этаж',
    textList: [
      { key: 'График работы:', value: 'с 9.00 до 20.00' },
      { key: 'Телефон магазина:', value: '8 (495) 730-30-62' },
      { key: 'Примерка:', value: 'Есть примерка' },
    ],
  }));

  marker3.bindPopup(getDeliveryPopup({
    station: 'Ленинский пр-т',
    addr: 'Ул. Вавилова, д.3, ТЦ “Гагаринский”',
    description: '1 минута пешком от метро, 2-й этаж',
    textList: [
      { key: 'График работы:', value: 'с 9.00 до 20.00' },
      { key: 'Телефон магазина:', value: '8 (495) 730-30-62' },
      { key: 'Примерка:', value: 'Есть примерка' },
    ],
  }));

  $(document).on('TAB_SHOWN', '[data-tab]', function () {
    map.invalidateSize(false);
  });
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
      btn = $('<button class="button button_size_sm address-popup__button">Доставить сюда</button>');

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
      closeButton: false,
      className: 'address-popup-wrapper',
      width: 288,
      offset: {
        x: 150,
        y: 0,
      },
    })
    .setContent(popup[0].outerHTML);
}

initMap();

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
