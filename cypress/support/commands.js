// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';  

Cypress.Commands.add('generateTestUserData', (userScenarioName) => {
    faker.setLocale('en_AU');
    cy.writeFile(`cypress/fixtures/user${userScenarioName}Data.json`, 
        {
          'name':`${faker.name.findName()}`,
          'email':`${"example+" + faker.random.number() + "@gmail.com"}`,
          'phone':`${faker.phone.phoneNumber('+614########').slice(3).replace(' ', '')}`,
          'suburb':`${faker.address.county()}`,
          'freeText1': `${faker.lorem.words(200)}`,
          'freeText2': `${faker.lorem.words(60)}`,
          'freeText3': `${faker.lorem.words(70)}`,
          'freeTextNG': `${faker.lorem.words(30)}`,
          'rating': `${faker.random.number({ min: 1, max: 10, precision: 1})}`,
        }
    )
});
