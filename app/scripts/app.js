import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import L from 'leaflet';
import './globalOptions';
import './formValidation';
import './libs/helpers';
import '../blocks/js-functions/truncate';
import anchor from '../blocks/js-functions/anchor';
import { freezebuttons } from '../blocks/js-functions/freeze';
import scrollanimation from '../blocks/js-functions/scrollanimation';
import {
  selects,
  sliders,
  datepicker,
  inputmask,
  numberinput,
} from '../blocks/form-elements/form-elements';
import popups from '../blocks/popups/popups';
import scrollbar from '../blocks/scrollbar/scrollbar';
import slider from '../blocks/slider/slider';
import tooltips from '../blocks/tooltip/tooltip';
import tabs from '../blocks/tabs/tabs';
import maps from '../blocks/map/map';
import sortDropdowns from '../blocks/sort-dropdown/sort-dropdown';
import '../blocks/rating/rating';
import '../blocks/accordion/accordion';
import '../blocks/dropdown/dropdown';
import '../blocks/shopmenu/shopmenu';
import '../blocks/vertical-menu/vertical-menu';
import '../blocks/put-block-into-slot/put-block-into-slot';
import '../blocks/product-main-slider/product-main-slider';
import '../components/product-description/product-description';
import '../components/header/header';
import '../components/product-card/product-card';
import '../components/hero-slider/hero-slider';
import '../components/burger/filterBurger';
import '../components/brands-section/brands-section';
import '../components/products-section/products-section';
import '../components/articles-section/articles-section';
import '../blocks/section/section';
import '../blocks/review-form/review-form';
import '../blocks/total/total';
import '../components/product-item-section/product-item-section';
import '../components/footer/footer';

const $ = window.$;
window.L = L;

$(() => {
  svg4everybody();
  objectFitImages();
  scrollbar();
  anchor();
  freezebuttons();
  selects();
  sliders();
  popups();
  slider();
  tooltips();
  tabs();
  datepicker();
  inputmask();
  numberinput();
  maps();
  scrollanimation();
  sortDropdowns();
});
