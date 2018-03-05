const $ = window.$;

export default () => {
  $('.js-catalog-price-slider').each(function () {
    const self = this;
    const slider = $(this);
    const parent = slider.parents('.sort-dropdown__body');

    const inputs = parent.find('.js-catalog-price-slider-input');

    self.noUiSlider.on('update', (values, handler) => {
      const val = values[handler];
      inputs.eq(handler).val(Math.round(val));
    });
  });

  let timer = null;

  $(document).on('keydown', '.js-catalog-price-slider-input', function () {
    clearTimeout(timer);

    timer = setTimeout(() => {
      const self = $(this);
      const slider = self.parents('.sort-dropdown__body').find('.js-catalog-price-slider');
      const handler = self.data('handler');
      const handlers = [null, null];
      handlers[handler] = self.val();
      slider.get(0).noUiSlider.set(handlers);
    }, 200);
  });
};
