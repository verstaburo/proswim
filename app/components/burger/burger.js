import { freeze, unfreeze } from '../../blocks/js-functions/freeze';
const $ = window.$;

export default class Burger {
  constructor() {
    this.element = $('.js-burger');

    if (!this.element.length) {
      return;
    }

    this.isActive = this.element.hasClass('is-active');
    this.titleElement = this.element.find('.js-burger-title');
    this.currentItem = null;
    this.previousItems = [];

    this.listeners();
  }

  toggle(e) {
    e.preventDefault();

    this.isActive = !this.isActive;
    this.element.toggleClass('is-active');

    [unfreeze, freeze][Number(this.isActive)]();
  }

  selectItem(link) {
    if (!link.length) {
      return;
    }

    const child = link.next();

    if (!child.length || !child.hasClass('burger__list')) {
      return;
    }

    if (this.currentItem) {
      this.previousItems.push(this.currentItem);
    }

    child.addClass('is-active');
    this.element.addClass('is-selected');

    this.currentItem = link;

    const linkText = link.find('.link__text').text();
    this.titleElement.text(linkText);
  }

  handleLinkClick(e) {
    const link = $(e.currentTarget);
    const dropdown = link.next();

    if (!dropdown.length || !dropdown.hasClass('burger__list')) {
      return;
    }

    e.preventDefault();
    this.selectItem(link);
  }

  handleBackClick(e) {
    e.preventDefault();

    if (!this.currentItem) {
      return;
    }

    this.currentItem.next().removeClass('is-active');
    this.currentItem = null;

    const prev = this.previousItems.pop();

    if (!prev) {
      this.element.removeClass('is-selected');
      return;
    }

    this.selectItem(prev);
  }

  listeners() {
    $(document)
      .on('click', '.js-burger-button, .js-burger-close, .js-burger-overlay', this.toggle.bind(this))
      .on('click', '.js-burger-link', this.handleLinkClick.bind(this))
      .on('click', '.js-burger-back', this.handleBackClick.bind(this));
  }
}
