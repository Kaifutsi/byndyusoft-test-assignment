describe('Проверка контактной информации на сайте Byndyusoft', () => {
  it('Проверка ссылки на Telegram', () => {
    cy.visit('https://www.google.ru/');

    cy.get('textarea[name="q"]').type('Byndyusoft{enter}');

    cy.get('body').then(($body) => {
      if ($body.find('.mpQYc .Hg3NO .sjVJQd').length > 0) {
        cy.get('.mpQYc .Hg3NO .sjVJQd').contains('Not now').click();
      }
    });

    cy.get('#search a').first().then((link) => {
      const url = link.prop('href');

      cy.request(url).then((response) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.body, 'text/html');
        const btnInfoElement = doc.querySelector('.popup-callback__contacts');
        const telegramLink = btnInfoElement ? btnInfoElement.querySelector('a[href="http://t.me/alexanderbyndyu"]') : null;

        expect(telegramLink).not.to.be.null;
      });
    });
  });
});
