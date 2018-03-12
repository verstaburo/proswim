/* eslint-disable no-unused-vars */
// http://leafletjs.com
// Для кластеров использовать: https://github.com/Leaflet/Leaflet.markercluster
import L from 'leaflet';

const $ = window.$;

export default function maps() {
  if (!$('#map').length) {
    return;
  }

  const map = L.map('map').setView([59.934, 30.335], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidGhldmVydmVyeTEiLCJhIjoiY2lzZXdzaXZ4MDBjaTJudm93dDI4MGVrMCJ9.Z8KKk0M_lpDTPB6_JtJBxg',
  }).addTo(map);

  const icon = L.icon({
    iconUrl: 'assets/images/pin.svg',
    shadowUrl: 'assets/images/marker-shadow.png',
    popupAnchor: [200, 220],
    iconSize: [32, 45],
    shadowSize: [31, 17],
    shadowAnchor: [16, -15],
  });

  const marker = L.marker([59.934, 30.335], { icon }).addTo(map);

  const popup = L
    .popup()
    .setContent(`
    <p>Ул. Вавилова, д.3, ТЦ “Гагаринский”</p>
    <p>1 минута пешком от метро, 2-й этаж</p>
    <p>График работы: с 9.00 до 20.00</p>
    <p>Телефон магазина: 8 (495) 730-30-62</p>
    <p>Примерка: Есть примерка</p>
  `);

  marker.bindPopup(popup);

  $(document).on('TAB_SHOWN', '[data-tab]', () => {
    map.invalidateSize(false);
  });
}
/* eslint-enable no-unused-vars */
