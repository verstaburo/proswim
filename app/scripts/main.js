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
    brandList: [
      { title: 'Adidas', value: 'Adidas', name: 'filter-brand', checked: false, selected: false },
      { title: 'Adl', value: 'Adl', name: 'filter-brand', checked: false, selected: false },
      { title: 'Banana Republic', value: 'Banana Republic', name: 'filter-brand', checked: false, selected: false },
      { title: 'Baon', value: 'Baon', name: 'filter-brand', checked: false, selected: false },
      { title: 'Befree', value: 'Befree', name: 'filter-brand', checked: false, selected: false },
      { title: 'Betsy', value: 'Betsy', name: 'filter-brand', checked: false, selected: false },
      { title: 'Caprice', value: 'Caprice', name: 'filter-brand', checked: false, selected: false },
      { title: 'Zoggs', value: 'Zoggs', name: 'filter-brand', checked: false, selected: false },
      { title: 'Tyr', value: 'Tyr', name: 'filter-brand', checked: false, selected: false },
      { title: 'Speedo', value: 'Speedo', name: 'filter-brand', checked: false, selected: false },
      { title: 'Maru', value: 'Maru', name: 'filter-brand', checked: false, selected: false },
    ],
    productList: [
      { title: 'Очки для тренировок', value: '1', name: 'filter-product', checked: false, selected: false },
      { title: 'Профессиональные очки для плавания', value: '2', name:'filter-product', checked: false, selected: false },
      { title: 'Очки-маски', value: '3', name:'filter-product', checked: false, selected: false },
      { title: 'Очки с диоприями', value: '4', name:'filter-product', checked: false, selected: false },
      { title: 'Наборы “Очки+Шапочка”к', value: '5', name:'filter-product', checked: false, selected: false },
    ],
    price: {
      min: 900,
      max: 6000,
      minValue: 900,
      maxValue: 6000,
    },
    sort: [
      { title: 'По популярности', selected: true, value: 'sort-popularity' },
      { title: 'По цене', icon: 'sort-price-ask', value: 'sort-price-ask' },
      { title: 'По цене', icon: 'sort-price-desk', selected: false, value: 'sort-price-desk' },
      { title: 'По скидкам', selected: false, value: 'sort-discount' },
      { title: 'По новизне', selected: false, value: 'sort-newest' },
    ],
    gender: [
      { title: 'Мужские', value: 'male', name: 'gender', checked: false, selected: false },
      { title: 'Женские', value: 'female', name: 'gender', checked: false, selected: false },
    ],
    priceApplied: false,
    brandsApplied: false,
    productsApplied: false,
    genderApplied: false,
    cutoffBrands: true,
    sortApplied: false,
  },

  computed: {
    // Расчет кол-ва выбранных фильтров (нужно на мобильном)
    appliedCount: function() {
      var total = 0;

      // Цена
      total += this.priceApplied;

      // Товары
      this.productList.forEach(function(item) {
        total += item.selected;
      });

      // Бренды
      this.brandList.forEach(function(item) {
        total += item.selected;
      });

      // Пол
      this.gender.forEach(function(item) {
        total += item.selected;
      });

      return total;
    },

    // Фильтр (поиск) бренда
    brandsFilter: function() {
      var self = this;

      if (!self.brandSearch) {
        return self.brandList;
      }

      return self.brandList.filter(function(item) {
        return item.title.toLowerCase().indexOf(self.brandSearch.toLowerCase()) !== -1;
      });
    },

    // Рендер сортировки
    sortList: function() {
      var self = this;

      return self.sort.filter(function(item) {
        return !item.selected;
      });
    },

    // Рендер выбранного пункта сортировки
    selectedSortItem: function() {
      var self = this;

      return self.sort.filter(function(item) {
        return item.selected;
      })[0];
    },

    // Выбранный диапазаон
    priceValue: function() {
      return this.price.minValue + ' - ' + this.price.maxValue + ' руб.';
    },

    // Выбранные товары
    selectedProducts: function() {
      return this.getSelectedItems(this.productList);
    },

    // Выбранные бренды
    selectedBrands: function() {
      return this.getSelectedItems(this.brandList);
    },

    // Выбранный пол
    selectedGender: function() {
      return this.getSelectedItems(this.gender);
    },

    // Выбранные примененные фильтры
    filtersApplied: function() {
      return this.priceApplied || this.brandsApplied || this.productsApplied || this.genderApplied;
    },

    // Если брендов > 8, то на мобильном будет выведена кнопка "показать еще"
    cutBrands: function() {
      return this.cutoffBrands === true ? this.brandsFilter.slice(0, 8) : this.brandsFilter;
    },
  },

  methods: {
    // Хелпер: вернет массив отфильтрованный по selected: true
    getSelectedItems(itemList) {
      return itemList.filter(function(item) {
        return item.selected;
      });
    },

    // Хелпер: устанавливает значение selected аналогичное checked
    setSelectedItems(itemList) {
      itemList.forEach(function(item) {
        item.selected = item.checked;
      });
    },

    // Хелпер: сбрасывает все значения в false

    resetSelectedItems(itemList) {
      itemList.forEach(function(item) {
        item.selected = false;
        item.checked = false;
      });
    },

    // При смене цены в полях - апдейтим слайдер
    handlePriceChange: function() {
      var self = this;

      $('.js-catalog-price-slider').each(function() {
        $(this).get(0).noUiSlider.set([self.price.minValue, self.price.maxValue]);
      });
    },

    // выбор пункта соритовки
    selectSortItem: function(nextItem) {
      this.sort.forEach(function(item) {
        item.selected = false;
      });

      nextItem.selected = true;

      this.sortApplied = true;

      // Спрятать все выпадающие списки
      $(document).trigger('dropdown/hide');
    },

    // Применение фильтра
    submitFilter: function(applied) {
      // Применение фильтра товара
      if (applied === 'products') {
        this.setSelectedItems(this.productList);
        this.productsApplied = !!this.selectedProducts.length;
      }

      // Применение фильтра брендов
      if (applied === 'brands') {
        this.setSelectedItems(this.brandList);
        this.brandsApplied = !!this.selectedBrands.length;
      }

      // Применение фильтра цены
      if (applied === 'price') {
        this.priceApplied = true;
      }

      // Применение фильтра пола
      if (applied === 'gender') {
        this.setSelectedItems(this.gender);
        this.genderApplied = !!this.selectedGender.length;
      }

      // Спрятать все выпадающие списки
      $(document).trigger('dropdown/hide');

      // отправляем запрос
      this.send();
    },

    // Сброс пункта фильтра
    resetItem: function(listName, item) {
      item.checked = false;
      item.selected = false;

      var list = this[listName].filter(function(listItem) {
        return listItem.selected;
      });

      if (!list.length) {
        if (listName === 'productList') {
          this.productsApplied = false;
        }

        if (listName === 'brandList') {
          this.brandsApplied = false;
        }

        if (listName === 'gender') {
          this.genderApplied = false;
        }
      }

      // отправляем запрос
      this.send();
    },

    resetPrice: function() {
      // сброс цены
      this.price.minValue = this.price.min;
      this.price.maxValue = this.price.max;
      this.priceApplied = false;
    },

    resetFilters: function() {
      // сброс цены
      this.resetPrice();

      // сброс пола
      this.resetSelectedItems(this.gender);
      this.genderApplied = false;

      // сброс брендов
      this.resetSelectedItems(this.brandList);
      this.brandsApplied = false;

      // сброс товаров
      this.resetSelectedItems(this.productList);
      this.productsApplied = false;

      // отправляем запрос
      this.send();
    },

    // Отправка данных на сервер
    send: function() {
      // TODO
    },
  },

  mounted: function() {
    // Инициализация range слайдера
    var self = this,
        sliders = $('.js-catalog-price-slider');

    $('.js-catalog-price-slider').each(function() {
      var slider =  $(this);

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
    });

    // Обновление слайдера при ресайзе
    $(window).on('resize', this.handlePriceChange.bind(this));
  },
});
/* eslint-enable */
