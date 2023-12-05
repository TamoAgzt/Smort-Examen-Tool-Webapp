//   Examen kalender en planner for coordinator
// Goal of this test:
// Full run through the webapplication to make sure everything works as expected for the coordinator. Automated using the Cypress framework.

// Pre-conditions:
// There must be 1 existing coordinator account
// There must be 1 existing teacher

describe('visit site', function () {
  it('Visit site', function () {
    cy.visit('http://torngems.nl/');
  });
});

describe('do stuff', function () {
  it('Login existing user via login page', function () {
    // Fill in the user's email for a coordinator account
    // Expected result:
    // The email is visible in the field
    cy.get('#Email').click().type('root@vistacollege.nl');

    // Fill in the user's password for a coordinator account
    // Expected result:
    // The password is dotted in the field
    cy.get('#Password').click().type('root');

    // Click Inloggen
    // Expected result:
    // You are redirected to the overview page
    cy.findByText('Inloggen').click();
  });

  it('Can switch between overview and calendar using buttons', function () {
    // Click Kalender
    // Expected result:
    // You are redirected to the calendar page
    cy.findByText('Kalender').click();
    cy.wait(1000);

    // Check if there is an element with class calendar
    // Expected result:
    // We get a log saying "Calendar exists" and the test moves on
    cy.get('.calendar').should('exist');
    cy.log('Calendar exists!');
    cy.wait(1000);

    // Click Overzicht
    // Expected result:
    // You are redirected to the overview page
    cy.findByText('Overzicht').click();
    cy.wait(1000);
  });

  it('Can switch between overview and calendar using slider', function () {
    // Click the slider in the navigation
    // Expected result:
    // You are redirected to the calendar page
    cy.get('.mdc-switch__handle').click();
    cy.wait(1000);

    // Click the slider again
    // Expected result:
    // You are redirected to the overview page
    cy.get('.mdc-switch__handle').click();
    cy.wait(1000);
  });

  it('Create class using popup on the form page', function () {
    // Click the add-button
    // Expected result:
    // You are redirected to the form page
    cy.get('.add-button').click();

    // Click the + icon next to the class selection field
    // Expected result:
    // A popup appears
    cy.get('.form-plus').eq(0).click();

    // Click Annuleren
    // Expected result:
    // The popup closes
    cy.findByText('Annuleren').click();

    // Click the + icon next to the class selection field
    // Expected result:
    // A popup appears
    cy.get('.form-plus').eq(0).click();

    // Fill in the Klas with "A.I.256"
    // Expected result:
    // The class is visible in the field
    cy.get('#Class').click().type('A.I.256');

    // Fill in the Mentor
    // Expected result:
    // The mentor is visible in the field
    cy.get('#Mentor').click().type('E. Vallinga');

    // Click Opslaan
    // Expected result:
    // The popup closes and the new class is saved
    cy.findAllByText('Opslaan').eq(1).click();

    // Click Kalender
    // Expected result:
    // You are redirected to the calendar page
    cy.findByText('Kalender').click();
    cy.wait(1000);
  });

  it('Create classroom using popup on the form page', function () {
    // Click the add-button
    // Expected result:
    // You are redirected to the form page
    cy.get('.add-button').click();

    // Click the + icon next to the classroom selection field
    // Expected result:
    // A popup appears
    cy.get('.form-plus').eq(1).click();

    // Click Annuleren
    // Expected result:
    // The popup closes
    cy.findByText('Annuleren').click();

    // Click the + icon next to the classroom selection field
    // Expected result:
    // A popup appears
    cy.get('.form-plus').eq(1).click();

    // Fill in the Lokaal
    // Expected result:
    // The classroom is visible in the field
    cy.get('#ClassRoom').click().type('B2.10');

    // Click Opslaan
    // Expected result:
    // The popup closes and the new classroom is saved
    cy.findAllByText('Opslaan').eq(1).click();

    // Click Kalender
    // Expected result:
    // You are redirected to the calendar page
    cy.findByText('Kalender').click();
    cy.wait(1000);
  });

  it('Create exam using the form page', function () {
    // Click the add-button
    // Expected result:
    // You are redirected to the form page
    cy.get('.add-button').click();

    // Fill in the Examen Naam with "Cypress 101"
    // Expected result:
    // The exam name is visible in the field
    cy.get('#ExamName').click().type('Cypress 101');

    // Fill in the Vak with "Webapp Testing"
    // Expected result:
    // The subject is visible in the field
    cy.get('#Subject').click().type('Webapp Testing');

    // Click the Klas dropdown
    cy.get('select').eq(1).select('A.I.256').first();

    // Click the A.I.256 option
    // cy.findByText('A.I.256').click();

    // Click the Lokaal dropdown
    cy.get('select').eq(2).select('B2.10');

    // Click the B2.10 option
    // cy.findByText('B2.10').click();

    // Click the Toezichthouder dropdown
    cy.get('select').eq(3).select('Bram, Hendriks');

    // Click the Bram, Hendriks option
    // cy.findByText('Bram, Hendriks').click();

    // Click the "dd" in the beginTijd input field
    // Expected result:
    // "dd" gets a blue background
    cy.findByText('dd').eq(0).click();

    // Fill in a current date and time with the right format: dd-mm-yyyy --:--
    // Expected result:
    // You see the current date and time in the input field
    cy.type('061220231400'); // hardcoded day of expo at 14:00

    // Click the "dd" in the eindTijd input field
    // Expected result:
    // "dd" gets a blue background
    cy.findByText('dd').eq(1).click();

    // Fill in a current date and time with the right format: dd-mm-yyyy --:--
    // Expected result:
    // You see the current date and time in the input field
    cy.type('061220231420'); // hardcoded day of expo at 14:20
  });

  it('Check if exam is visible on calendar page', function () {
    // Click Kalender
    // Expected result:
    // You are redirected to the calendar page
    cy.findByText('Kalender').click();
    cy.wait(1000);

    // Check if today has class Exames
    // Expected result:
    // Log "Exam exists"
    cy.contains('6').parents('.Exames').should('exist');
    cy.log('Exam exists');

    // Click today
    // Expected result:
    // Popup appears with all exams for today
    cy.contains('6').click();

    // Check if exam with name "Cypress 101" exists
    // Expected result:
    // "Cypress 101" should exist
    cy.findByText('Cypress 101').should('exist');
  });
});