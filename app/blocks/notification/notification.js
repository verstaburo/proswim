const $ = window.$;

export default function notification() {
  $(document).on('click', '.js-toggleBlock', (e) => {
    e.preventDefault();
    $('.notification__form').slideToggle(300);
  });

  $(document).on('click', '.js-notification-submit', (e) => {
    e.preventDefault();
    $('.notification__content').addClass('is-hidden');
    $('.notification__send').removeClass('is-hidden');
  });
}
