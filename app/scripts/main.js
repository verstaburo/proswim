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

@@include('../components/product-item-section/product-item-section.main.js')
@@include('../pages/cart/cart.main.js')
@@include('../pages/cart/cart-delivery.main.js')
@@include('../pages/contacts/contacts.main.js')

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
