module.exports = pageName => `
extends ../../layouts/default

block head
  - var pageTitle = 'Proswim - ${pageName}'

block content
  +b.page
    .container
      +e.head
        +e.headcol._flexible
          +breadcrumbs(['Главная', '${pageName}'])

      +e.H1.heading ${pageName}

block popups
`;
