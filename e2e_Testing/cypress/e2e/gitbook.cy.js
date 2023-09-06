// Dit is een voorbeeld test

describe('visit site', function () {
  it('Reject Cookies', function () {
    cy.visit(
      'https://vistaict.gitbook.io/j03-and-j04/projecten-sd/examenkalender-en-planner'
    );
  });
});

describe('do stuff', function () {
  it('Reject Cookies', function () {
    cy.findByText('Next').scrollIntoView();
    cy.wait(1500);
    cy.findByText('Next').click();
  });
});
