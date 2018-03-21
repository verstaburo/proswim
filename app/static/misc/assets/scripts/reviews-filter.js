var reviewsFilter = new Vue({
  el: '#reviewsPage',
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
      { title: 'Наборы “Очки+Шапочка”', value: '5', name:'filter-product', checked: false, selected: false },
    ],
    brandsApplied: false,
    productsApplied: false,
    cutoffBrands: true,
  },

  computed: {
    // Расчет кол-ва выбранных фильтров (нужно на мобильном)
    appliedCount: function() {
      var total = 0;

      // Товары
      this.productList.forEach(function(item) {
        total += item.selected;
      });

      // Бренды
      this.brandList.forEach(function(item) {
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

    // Выбранные товары
    selectedProducts: function() {
      return this.getSelectedItems(this.productList);
    },

    // Выбранные бренды
    selectedBrands: function() {
      return this.getSelectedItems(this.brandList);
    },

    // Выбранные примененные фильтры
    filtersApplied: function() {
      return this.brandsApplied || this.productsApplied;
    },

    // Если брендов > 8, то на мобильном будет выведена кнопка "показать еще"
    cutBrands: function() {
      return this.cutoffBrands === true ? this.brandsFilter.slice(0, 8) : this.brandsFilter;
    },

    // Значение "списка товаров"
    productsValue: function() {
      return this.getItemValue('Любой товар', this.productList);
    },

    // Значение "списка брендов"
    brandsValue: function() {
      return this.getItemValue('Любой бренд', this.brandList);
    },
  },

  methods: {
    // Хелпер: вернет массив отфильтрованный по selected: true
    getSelectedItems: function(itemList) {
      return itemList.filter(function(item) {
        return item.selected;
      });
    },

    // Хелпер: устанавливает значение selected аналогичное checked
    setSelectedItems: function(itemList) {
      itemList.forEach(function(item) {
        item.selected = item.checked;
      });
    },

    // Хелпер: сбрасывает все значения в false
    resetSelectedItems: function(itemList) {
      itemList.forEach(function(item) {
        item.selected = false;
        item.checked = false;
      });
    },

    // Хелпер: вернет выбранные значения, либо строку по умолчанию
    getItemValue: function(initialValue, itemList) {
      var items = this.getSelectedItems(itemList).map(function(item) {
        return item.title;
      });

      if (!items.length) {
        return initialValue;
      }

      return items.join(', ');
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
      }

      // отправляем запрос
      this.send();
    },

    resetFilters: function() {
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
});
