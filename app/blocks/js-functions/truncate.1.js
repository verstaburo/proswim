const $ = window.$;

function truncate() {
  $('[data-lines]').each(function () {
    const self = $(this);
    const lines = self.data('lines');
    let linesCount = Number(lines);
    let text = self.data('initial-text');
    const ww = $(window).width();

    if (!self.is(':visible')) {
      return;
    }

    if (typeof lines === 'object') {
      if (ww < window.globalOptions.sizes.sm && 'mobile' in lines) {
        linesCount = Number(lines.mobile);
      } else if (ww < window.globalOptions.sizes.lg && 'tablet' in lines) {
        linesCount = Number(lines.tablet);
      } else {
        linesCount = Number(lines.desktop);
      }
    }

    if (!text) {
      text = self.text().replace(/\s+/g, ' ');
      self.data('initial-text', text);
    }

    // set height
    const lh = parseInt(self.css('line-height'), 10);
    const height = lh * linesCount;

    self.css({
      maxHeight: height,
      overflow: 'hidden',
    });

    // // truncate
    // self.text(text);

    // while (self[0].scrollHeight > self.height()) {
    //   self.text((index, str) => str.replace(/\W*\s(\S)*$/, '...'));
    // }
  });
}

truncate();

let resizeTimer = null;

$(window).on('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(truncate, 100);
});
