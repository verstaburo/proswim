 // import $$ from 'jquery';

 const $ = window.$;

 export default function toggleAboutSection() {
   $('.js-toggle').on('click', (e) => {
     const el = $(e.target).closest('.section-title');
     $(e.target).parent().toggleClass('is-open');
     const elToggle = el.next();
     elToggle.slideToggle(300);
   });
 }
