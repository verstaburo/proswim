import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
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
import './globalOptions';
import '../blocks/rating/rating';
import '../blocks/accordion/accordion';
import '../blocks/dropdown/dropdown';
import '../blocks/shopmenu/shopmenu';
import '../components/header/header';
import '../components/hero-slider/hero-slider';
import '../components/brands-section/brands-section';
import '../components/products-section/products-section';
import '../components/footer/footer';

const $ = window.$;

$(() => {
  svg4everybody();
  objectFitImages();
  anchor();
  freezebuttons();
  selects();
  sliders();
  popups();
  scrollbar();
  slider();
  tooltips();
  tabs();
  datepicker();
  inputmask();
  numberinput();
  maps();
  scrollanimation();
});
