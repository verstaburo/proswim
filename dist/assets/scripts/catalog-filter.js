var catalogFilter = new Vue({
  el: '#catalog',
  data: {
    brandSearch: '',
    colorSearch: '',
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
    sizeList: [
      { title: '32', value: '32', name: 'filter-size', checked: false, selected: false },
      { title: '34', value: '34', name: 'filter-size', checked: false, selected: false },
      { title: '36', value: '36', name: 'filter-size', checked: false, selected: false },
      { title: '38', value: '38', name: 'filter-size', checked: false, selected: false },
      { title: '52', value: '52', name: 'filter-size', checked: false, selected: false },
      { title: '54', value: '54', name: 'filter-size', checked: false, selected: false },
      { title: '31', value: '31', name: 'filter-size', checked: false, selected: false },
      { title: '23', value: '23', name: 'filter-size', checked: false, selected: false },
      { title: '32', value: '32', name: 'filter-size', checked: false, selected: false },
      { title: '43', value: '43', name: 'filter-size', checked: false, selected: false },
      { title: '39', value: '39', name: 'filter-size', checked: false, selected: false },
      { title: '42', value: '42', name: 'filter-size', checked: false, selected: false },

      { title: '01', value: '01', name: 'filter-size-children', checked: false, selected: false },
      { title: '02', value: '02', name: 'filter-size-children', checked: false, selected: false },
      { title: '03', value: '03', name: 'filter-size-children', checked: false, selected: false },
      { title: '04', value: '04', name: 'filter-size-children', checked: false, selected: false },
      { title: '05', value: '05', name: 'filter-size-children', checked: false, selected: false },
      { title: '06', value: '06', name: 'filter-size-children', checked: false, selected: false },
      { title: '07', value: '07', name: 'filter-size-children', checked: false, selected: false },
      { title: '08', value: '08', name: 'filter-size-children', checked: false, selected: false },
      { title: '09', value: '09', name: 'filter-size-children', checked: false, selected: false },
      { title: '10', value: '10', name: 'filter-size-children', checked: false, selected: false },
      { title: '11', value: '11', name: 'filter-size-children', checked: false, selected: false },
      { title: '12', value: '12', name: 'filter-size-children', checked: false, selected: false },
      { title: '13', value: '13', name: 'filter-size-children', checked: false, selected: false },
      { title: '14', value: '14', name: 'filter-size-children', checked: false, selected: false },
      { title: '15', value: '15', name: 'filter-size-children', checked: false, selected: false },
      { title: '16', value: '16', name: 'filter-size-children', checked: false, selected: false },
      { title: '17', value: '17', name: 'filter-size-children', checked: false, selected: false },

    ],
    colorList: [
      { title: 'синий', value: 'blue', name: 'filter-color', amount: '1', checked: false, selected: false },
      { title: 'красный', value: 'red', name: 'filter-color', amount: '2', checked: false, selected: false },
      { title: 'зеленый', value: 'green', name: 'filter-color', amount: '3', checked: false, selected: false },
      { title: 'желтый', value: 'yellow', name: 'filter-color', amount: '4', checked: false, selected: false },
      { title: 'серый', value: 'grey', name: 'filter-color', amount: '5', checked: false, selected: false },
      { title: 'черный', value: 'black', name: 'filter-color', amount: '6', checked: false, selected: false },
    ],
    priceApplied: false,
    brandsApplied: false,
    productsApplied: false,
    genderApplied: false,
    sizeApplied: false,
    colorApplied: false,
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

      // Размеры
      this.sizeList.forEach(function(item) {
        total += item.selected;
      });

      // Цвета
      this.colorList.forEach(function(item) {
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

    // Фильтр (поиск) цветов
  colorFilter: function() {
      var self = this;

      if (!self.colorSearch) {
        return self.colorList;
      }

      return self.colorList.filter(function(item) {
        return item.title.toLowerCase().indexOf(self.colorSearch.toLowerCase()) !== -1;
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

    // Выбранные размеры
    selectedSize: function() {
      return this.getSelectedItems(this.sizeList);
    },

    // Выбранные цвета
    selectedColor: function() {
      return this.getSelectedItems(this.colorList);
    },

    // Выбранные примененные фильтры
    filtersApplied: function() {
      return this.priceApplied || this.brandsApplied || this.productsApplied || this.genderApplied
        || this.sizeApplied || this.colorApplied;
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

    // Значение "пола"
    genderValue: function() {
      return this.getItemValue('Любой пол', this.gender);
    },

    // Значение "списка размеров"
    sizeValue: function() {
      return this.getItemValue('Любой размер', this.sizeList);
    },

    // Значение "списка цветов"
    colorValue: function() {
      return this.getItemValue('Любой цвет', this.colorList);
    },

    // Значение "цены" от 900 руб.
    priceItemValue: function() {
      return this.priceApplied ? 'от ' + this.price.minValue + ' руб.' : 'Любая цена';
    },

    // Значение "цены" от 900 - 6000 руб.
    priceItemFullValue: function() {
      return this.priceApplied ? this.price.minValue + ' - ' + this.price.maxValue + ' руб.' : 'Любая цена';
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
    setSelectedItems: function (itemList) {
      itemList.forEach(function(item) {
        item.selected = item.checked;
      });
    },

    // Хелпер: сбрасывает все значения в false
    resetSelectedItems: function (itemList) {
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

      // Применение фильтра размеров
      if (applied === 'size') {
        this.setSelectedItems(this.sizeList);
        this.sizeApplied = !!this.selectedSize.length;
      }

      // Применение фильтра цветов
      if (applied === 'color') {
        this.setSelectedItems(this.colorList);
        this.colorApplied = !!this.selectedColor.length;
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

        if (listName === 'sizeList') {
          this.sizeApplied = false;
        }

        if (listName === 'colorList') {
          this.colorApplied = false;
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

      // сброс размеров
      this.resetSelectedItems(this.sizeList);
      this.sizeApplied = false;

      // сброс цветов
      this.resetSelectedItems(this.colorList);
      this.colorApplied = false;

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
// TODO: change
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
