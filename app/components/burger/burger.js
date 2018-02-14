import 'jquery.mmenu/dist/jquery.mmenu';
import $ from 'jquery'; // TODO пофиксить

export default () => {
  const block = $('#burger-menu');

  if (!block.length) {
    return;
  }

  block.mmenu(
    {},
    {
      offCanvas: {
        pageSelector: '.page',
      },
      classNames: {
        selected: 'is-active',
      },
    },
  );
};
