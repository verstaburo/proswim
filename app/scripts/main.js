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

// new Vue({
//   data: {
//     el: '.page',
//     brandSearch: '',
//     brandsList: [
//       { title: 'Adidas', value: 'Adidas', name: 'filter-brand', checked: false },
//       { title: 'Adl', value: 'Adl', name: 'filter-brand', checked: false },
//       { title: 'Banana Republic', value: 'Banana Republic', name: 'filter-brand', checked: false },
//       { title: 'Baon', value: 'Baon', name: 'filter-brand', checked: false },
//       { title: 'Befree', value: 'Befree', name: 'filter-brand', checked: false },
//       { title: 'Betsy', value: 'Betsy', name: 'filter-brand', checked: false },
//       { title: 'Caprice', value: 'Caprice', name: 'filter-brand', checked: false },
//       { title: 'United Colors Of Benneton', value: 'United Colors Of Benneton', name: 'filter-brand', checked: false },
//     ],
//     productList: [
//       { title: 'Очки для тренировок', value: '1', name: 'filter-product', checked: false },
//       { title: 'Профессиональные очки для плавания', value: '1', name:'filter-product', checked: false },
//       { title: 'Очки-маски', value: '1', name:'filter-product', checked: false },
//       { title: 'Очки с диоприями', value: '1', name:'filter-product', checked: false },
//       { title: 'Наборы “Очки+Шапочка”к', value: '1', name:'filter-product', checked: false },
//     ],
//     price: { min: 0, max: 0 },
//     sort: '',
//   },
//   computed: {
//     brandsFilter: function() {
//       return this.productList.filter(function(item) {
//         return item.title.indexOf(this.brandSearch) !== -1;
//       });
//     },
//     selectedBrand: function() {
//       return this.brandList.filter(function(item) {
//         return item.checked;
//       });
//     },
//     selectedProducts: function() {
//       return this.productList.filter(function(item) {
//         return item.checked;
//       });
//     },
//   },
// });
/* eslint-enable */
