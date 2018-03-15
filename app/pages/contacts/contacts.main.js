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

  var icon = L.icon({
    iconUrl: 'assets/images/pin.svg',
    shadowUrl: 'assets/images/marker-shadow.png',
    popupAnchor: [174, 189],
    iconSize: [32, 45],
    shadowSize: [31, 17],
    shadowAnchor: [16, -15],
  });

  $.each(markerLocations, function () {
    L.marker(this, { icon: icon }).addTo(map);
  });
}

initContactsMap('pickup-contacts-map', [[59.934, 30.335]]);
initContactsMap('msk-shop-contacts-map', [[59.934, 30.335], [59.9336222, 30.3469712], [59.9314322, 30.3429312]]);
initContactsMap('spb-shop-contacts-map', [[59.934, 30.335]]);
