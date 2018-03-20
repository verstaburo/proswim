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

new Vue({
  el: '#catalog',
  data: {
    brandSearch: '',
    brandsList: [
      { title: 'Adidas', value: 'Adidas', name: 'filter-brand', checked: false },
      { title: 'Adl', value: 'Adl', name: 'filter-brand', checked: false },
      { title: 'Banana Republic', value: 'Banana Republic', name: 'filter-brand', checked: false },
      { title: 'Baon', value: 'Baon', name: 'filter-brand', checked: false },
      { title: 'Befree', value: 'Befree', name: 'filter-brand', checked: false },
      { title: 'Betsy', value: 'Betsy', name: 'filter-brand', checked: false },
      { title: 'Caprice', value: 'Caprice', name: 'filter-brand', checked: false },
      { title: 'Zoggs', value: 'Zoggs', name: 'filter-brand', checked: false },
      { title: 'Tyr', value: 'Tyr', name: 'filter-brand', checked: false },
      { title: 'Speedo', value: 'Speedo', name: 'filter-brand', checked: false },
      { title: 'Maru', value: 'Maru', name: 'filter-brand', checked: false },
    ],
    productList: [
      { title: 'Очки для тренировок', value: '1', name: 'filter-product', checked: false },
      { title: 'Профессиональные очки для плавания', value: '2', name:'filter-product', checked: false },
      { title: 'Очки-маски', value: '3', name:'filter-product', checked: false },
      { title: 'Очки с диоприями', value: '4', name:'filter-product', checked: false },
      { title: 'Наборы “Очки+Шапочка”к', value: '5', name:'filter-product', checked: false },
    ],
    price: {
      min: 900,
      max: 6000,
      minValue: 900,
      maxValue: 4393,
    },
    sort: [
      { title: 'По популярности', selected: true, value: 'sort-popularity' },
      { title: 'По цене', icon: 'sort-price-ask', selected: false, value: 'sort-price-ask' },
      { title: 'По цене', icon: 'sort-price-desk', selected: false, value: 'sort-price-desk' },
      { title: 'По скидкам', selected: false, value: 'sort-discount' },
      { title: 'По новизне', selected: false, value: 'sort-newest' },
    ],
    sex: [
      { title: 'Мужские', value: 'male', name: 'sex', checked: false },
      { title: 'Женские', value: 'female', name: 'sex', checked: false },
    ],
  },
  computed: {
    brandsFilter: function() {
      var self = this;

      if (!self.brandSearch) {
        return self.brandsList;
      }

      return self.brandsList.filter(function(item) {
        return item.title.toLowerCase().indexOf(self.brandSearch.toLowerCase()) !== -1;
      });
    },

    sortList: function() {
      var self = this;

      return self.sort.filter(function(item) {
        return !item.selected;
      });
    },

    selectedSortItem: function() {
      var self = this;

      return self.sort.filter(function(item) {
        return item.selected;
      })[0];
    }
  },
  methods: {
    handlePriceChange: function() {
      $('.js-catalog-price-slider').get(0).noUiSlider.set([this.price.minValue, this.price.maxValue]);
    },
    selectSortItem: function(nextItem) {
      this.sort.forEach(function(item) {
        item.selected = false;
      });

      nextItem.selected = true;

      this.submitFilter();
    },
    submitFilter: function() {
      // получить выбранные товары

      // получить выбранные бренды

      // получить диапазон цен

      // получить выбранный пол


      // отрендерить выбранные фильтры

      // заменить данные в выпадающих списках

      // Спрятать все выпадающие списки
      $(document).trigger('dropdown/hide');
    },
  },
  mounted: function() {
    /**
     * Инициализация range слайдера
     */
    var self = this,
        slider = $('.js-catalog-price-slider');

    noUiSlider.create(slider.get(0), {
      start: [self.price.minValue, self.price.maxValue],
      connect: true,
      range: {
        min: self.price.min,
        max: self.price.max,
      },
    });

    slider[0].noUiSlider.on('update', function(values, handler) {
      var keys = ['minValue', 'maxValue'];
      var val = values[handler];
      self.price[keys[handler]] = Math.round(val);
    });
  },
});
/* eslint-enable */
