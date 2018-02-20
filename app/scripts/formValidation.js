import Parsley from 'parsleyjs';

const $ = window.$;

const lang = $('html').attr('lang');
const locale = lang === 'ru-RU' ? 'ru' : 'en';

Parsley.setLocale(locale);

Parsley.on('field:validated', function () {
  const form = this.$element.closest('form');

  form
      .find("[type='submit'], [data-submit='true']")
      .prop('disabled', !form.parsley().isValid());
});


/* Телефонный номер */
Parsley.addValidator('phone', {
  validateStringfunction(value) {
    return /^[-+0-9() ]*$/i.test(value);
  },
  messages: {
    ru: 'Некорректный телефонный номер',
    en: 'Incorrect phone number',
  },
});

Parsley.addMessages('ru', {
  defaultMessage: 'Некорректное значение.',
  type: {
    email: 'Неправильный формат email.',
    url: 'Введите URL адрес.',
    number: 'Введите число.',
    integer: 'Введите целое число.',
    digits: 'Введите только цифры.',
    alphanum: 'Введите буквенно-цифровое значение.',
  },
  notblank: 'Это поле должно быть заполнено.',
  required: 'Обязательное поле.',
  pattern: 'Это значение некорректно.',
  min: 'Это значение должно быть не менее чем %s.',
  max: 'Это значение должно быть не более чем %s.',
  range: 'Это значение должно быть от %s до %s.',
  minlength: 'Это значение должно содержать не менее %s символов.',
  maxlength: 'Это значение должно содержать не более %s символов.',
  length: 'Это значение должно содержать от %s до %s символов.',
  mincheck: 'Выберите не менее %s значений.',
  maxcheck: 'Выберите не более %s значений.',
  check: 'Выберите от %s до %s значений.',
  equalto: 'Это значение должно совпадать.',
});

Parsley.setLocale('ru');
