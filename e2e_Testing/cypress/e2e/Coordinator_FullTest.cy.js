//   Examen kalender en planner for coordinator
// Goal of this test:
// Full run through the webapplication to make sure everything works as expected for the coordinator. Automated using the Cypress framework.

// Pre-conditions:
// There must be 1 existing coordinator account
// There must be 1 existing teacher
before(function () {
  cy.fixture('exam.json').as('TestData');
});

describe('visit site', function () {
  it('Visit site', function () {
    cy.visit('http://torngems.nl/');
  });
});

describe('do stuff', function () {
  let dag = '12';

  it('Login existing user via login page', function () {
    // Fill in the user's email for a coordinator account
    cy.get('#Email').click().type(this.TestData.User.Coord.Email);

    // Fill in the user's password for a coordinator account
    cy.get('#Password').click().type(this.TestData.User.Coord.Password);

    // Click Inloggen
    cy.findByText(this.TestData.Button.LogIn).click();
  });

  it('Can switch between overview and calendar using buttons', function () {
    // Click Kalender
    cy.findByText(this.TestData.Button.Calendar).click();
    cy.wait(1000);

    // Check if there is an element with class calendar
    cy.get('.calendar-container').should('exist');
    cy.log('Calendar exists!');
    cy.wait(1000);

    // Click Overzicht
    cy.findByText(this.TestData.Button.Overview).click();
    cy.wait(1000);
  });

  it('Can switch between overview and calendar using slider', function () {
    // Click the slider in the navigation
    cy.get('.mdc-switch__handle').click();
    cy.wait(1000);

    // Click the slider again
    cy.get('.mdc-switch__handle').click();
    cy.wait(1000);
  });

  it('Create class using popup on the form page', function () {
    // Click the add-button
    cy.get('.add-button').click();

    // Click the + icon next to the class selection field
    cy.get('.form-plus').eq(0).click();

    // Click Annuleren
    cy.findByText(this.TestData.Button.Cancel).click();

    // Click the + icon next to the class selection field
    cy.get('.form-plus').eq(0).click();

    // Fill in the Klas with "A.I.255"
    cy.get('#Class').click().type(this.TestData.PopupFiller.Class);

    // Fill in the Mentor
    cy.get('#Mentor').click().type(this.TestData.PopupFiller.Mentor);

    // Click Opslaan
    cy.findAllByText(this.TestData.Button.Save).eq(1).click();

    // Click Kalender
    cy.findByText(this.TestData.Button.Calendar).click();
    cy.wait(1000);
  });

  it('Create classroom using popup on the form page', function () {
    // Click the add-button
    cy.get('.add-button').click();

    // Click the + icon next to the classroom selection field
    cy.get('.form-plus').eq(1).click();

    // Click Annuleren
    cy.findByText(this.TestData.Button.Cancel).click();

    // Click the + icon next to the classroom selection field
    cy.get('.form-plus').eq(1).click();

    // Fill in the Lokaal
    cy.get('#ClassRoom').click().type(this.TestData.PopupFiller.ClassRoom);

    // Click Opslaan
    cy.findAllByText(this.TestData.Button.Save).eq(1).click();

    // Click Kalender
    cy.findByText(this.TestData.Button.Calendar).click();
    cy.wait(1000);
  });

  it('Create exam using the form page', function () {
    // Click the add-button
    cy.get('.add-button').click();

    // Fill in the Examen Naam with "Cypress 101"
    cy.get('#ExamName').click().type(this.TestData.Exam.Name);

    // Fill in the Vak with "Webapp Testing"
    cy.get('#Subject').click().type(this.TestData.Exam.Subject);

    // Click the Klas dropdown
    cy.get('select').eq(0).select([0]);
    cy.get('select').eq(1).select([0]);
    cy.get('select').eq(2).select([0]);

    // Click the A.I.i option
    // cy.findByText('A.I.255').click();

    // Click the Lokaal dropdown
    // cy.get('select').eq(1).select('B2.10');

    // Click the B2.10 option
    // cy.findByText('B2.10').click();

    // Click the Toezichthouder dropdown
    // cy.get('select').eq(2).select('Bram, Hendriks');

    // Click the Bram, Hendriks option
    // cy.findByText('Bram, Hendriks').click();

    // Click the beginTijd input field and fill in a date and time with 2023-12-12T12:30 (change for future date or make dynamic)
    cy.get('#beginTijd')
      .click()
      .type('2023-12-' + dag + 'T12:30');

    // Click the eindTijd input field and fill in a date and time with 2023-12-12T13:30 (change for future date or make dynamic)
    cy.get('#eindTijd')
      .click()
      .type('2023-12-' + dag + 'T13:30');

    // Click Opslaan
    cy.intercept('http://devilskey.nl:7234/ExamenInPlannen').as('SavingExam');
    cy.findByText(this.TestData.Button.Save).click();
    cy.wait('@SavingExam');
  });

  it('Check if exam is visible on calendar page', function () {
    // Click Kalender
    cy.findByText(this.TestData.Button.Calendar).click();
    cy.wait(1000);

    // Check if today has class Exames
    cy.findByText(dag).parents().should('exist');

    cy.log('Exam exists');

    // Click today
    cy.contains(dag).click();
    // Check if exam with name "Cypress 101" exists
    cy.contains(this.TestData.Exam.Name).should('exist');
  });
});
