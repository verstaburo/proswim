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
