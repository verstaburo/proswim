export const UPLOAD_START = 'upload-photo/upload-start';
export const UPLOAD_COMPLETE = 'upload-photo/upload-complete';
export const DELETE_START = 'upload-photo/delete-start';
export const DELETE_COMPLETE = 'upload-photo/delete-complete';

const $ = window.$;

const ELEMENT_CLASS = '.js-upload-photo';
const CONTROL_CLASS = '.js-upload-photo-control';
const IMAGE_CLASS = '.js-upload-photo-image';
const DELETE_CLASS = '.js-upload-photo-delete';
const UPLOADED_CLASS = 'is-uploaded';
const LOADING_CLASS = 'is-loading';

/**
 * @param {jQuery element} el
 */
export const uploadPhoto = (el) => {
  if (!el.length || !el.hasClass(ELEMENT_CLASS.slice(1))) {
    return;
  }

  const control = el.find(CONTROL_CLASS);
  const image = el.find(IMAGE_CLASS);

  if (!control.length || !image.length || !control[0].files || !control[0].files[0]) {
    return;
  }

  el
    .trigger(UPLOAD_START)
    .addClass(LOADING_CLASS);

  const reader = new FileReader();

  reader.onload = (e) => {
    image.attr('src', e.target.result);

    el
      .trigger(UPLOAD_COMPLETE, { file: control[0].files[0] })
      .addClass(UPLOADED_CLASS)
      .removeClass(LOADING_CLASS);
  };

  reader.readAsDataURL(control[0].files[0]);
};

/**
 * @param jQuery element} el
 */
export const deletePhoto = (el) => {
  if (!el.length || !el.hasClass(ELEMENT_CLASS.slice(1))) {
    return;
  }


  const control = el.find(CONTROL_CLASS);
  const image = el.find(IMAGE_CLASS);

  if (!control.length || !image.length) {
    return;
  }

  el
    .trigger(DELETE_START)
    .addClass(LOADING_CLASS)
    .removeClass(UPLOADED_CLASS);

  control.val('');

  el
    .off('transitionend')
    .on('transitionend', () => {
      el
        .trigger(DELETE_COMPLETE)
        .removeClass(LOADING_CLASS);

      image.attr('src', '');

      el.off('transitionend');
    });
};

/**
 * Listeners
 */
$(document).on('click', DELETE_CLASS, function (e) {
  e.preventDefault();
  e.stopPropagation();

  deletePhoto($(this).parents(ELEMENT_CLASS));
});

$(document).on('change', CONTROL_CLASS, function () {
  uploadPhoto($(this).parents(ELEMENT_CLASS));
});
