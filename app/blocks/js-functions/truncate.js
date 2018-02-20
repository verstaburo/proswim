const $ = window.$;

function truncate() {
  $('[data-lines]').each(function () {
    const self = $(this);
    const lines = self.data('lines');
    let linesCount = Number(lines);
    const ww = $(window).width();

    if (!self.is(':visible')) {
      return;
    }

    if (typeof lines === 'object') {
      if (ww < window.globalOptions.sizes.tablet && 'mobile' in lines) {
        linesCount = Number(lines.mobile);
      } else if (ww < window.globalOptions.sizes.desktop && 'tablet' in lines) {
        linesCount = Number(lines.tablet);
      } else {
        linesCount = Number(lines.desktop);
      }
    }

    const lh = parseInt(self.css('line-height'), 10);
    const height = lh * linesCount;

    self.css({
      maxHeight: height,
      overflow: 'hidden',
    });

    self.dotdotdot();
  });
}

truncate();

let resizeTimer = null;

$(window).on('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(truncate, 100);
});
