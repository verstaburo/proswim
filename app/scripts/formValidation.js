// import Parsley from 'parsleyjs/dist/parsley';
const { Parsley } = window;

if (Parsley) {
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
      ru: 'Некорректный телефонный номер, заполните поле по маске +7 (xxx) xxx-xx-xx',
      en: 'Incorrect phone number',
    },
  });

  Parsley.addMessages('ru', {
    defaultMessage: 'Некорректное значение.',
    type: {
      email: 'Адрес электронной почты должен содержать символ "@".',
      url: 'Введите URL адрес. example.com',
      number: 'Введите число.',
      integer: 'Введите целое число.',
      digits: 'Введите только цифры.',
      alphanum: 'Введите буквенно-цифровое значение.',
    },
    notblank: 'Это поле должно быть заполнено.',
    required: 'Обязательное поле не может быть пустым.',
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
}
