/* eslint-disable */

/**
 * REMOVE IT
 *
 * Скрипты можно писать тут, либо подключать с помощь https://github.com/coderhaoxin/gulp-file-include
 *
 * ВАЖНО: Файлы просто подключаются, без транспиляции (babel) минификации, поэтому нужно писать на ES5
 * Так же доступа к блокам, которые собираются с помощью вебпака не будет.
 */

new Vue({
  data: {
    el: '.page',
    brandSearch: '',
    brandsList: [
      { title: 'Adidas', value: 'Adidas', name: 'filter-brand', checked: false },
      { title: 'Adl', value: 'Adl', name: 'filter-brand', checked: false },
      { title: 'Banana Republic', value: 'Banana Republic', name: 'filter-brand', checked: false },
      { title: 'Baon', value: 'Baon', name: 'filter-brand', checked: false },
      { title: 'Befree', value: 'Befree', name: 'filter-brand', checked: false },
      { title: 'Betsy', value: 'Betsy', name: 'filter-brand', checked: false },
      { title: 'Caprice', value: 'Caprice', name: 'filter-brand', checked: false },
      { title: 'United Colors Of Benneton', value: 'United Colors Of Benneton', name: 'filter-brand', checked: false },
    ],
    productList: [
      { title: 'Очки для тренировок', value: '1', name: 'filter-product', checked: false },
      { title: 'Профессиональные очки для плавания', value: '1', name:'filter-product', checked: false },
      { title: 'Очки-маски', value: '1', name:'filter-product', checked: false },
      { title: 'Очки с диоприями', value: '1', name:'filter-product', checked: false },
      { title: 'Наборы “Очки+Шапочка”к', value: '1', name:'filter-product', checked: false },
    ],
    price: { min: 0, max: 0 },
    sort: '',
  },
  computed: {
    brandsFilter: function() {
      return this.productList.filter(function(item) {
        return item.title.indexOf(this.brandSearch) !== -1;
      });
    },
    selectedBrand: function() {
      return this.brandList.filter(function(item) {
        return item.checked;
      });
    },
    selectedProducts: function() {
      return this.productList.filter(function(item) {
        return item.checked;
      });
    },
  },
});
/* eslint-enable */
