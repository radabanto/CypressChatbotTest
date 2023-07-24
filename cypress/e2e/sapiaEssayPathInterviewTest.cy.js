/// <reference types="cypress" />

import ChatConsole from '../pages/ChatConsole';

// Do testing via categorized user data
// Test data generation may be done according to category; generate test user data
// is parametrized to demonstrate such use case.

/**
 * Sapia Interview Not happy :) Path Test
 */
describe("Sapia Interview Essay Length Test", () => {
    beforeEach(function() {
        // executes once prior all tests in it block
        let userScenarioName = "unhappyWordCount";
        cy.generateTestUserData(userScenarioName);
        cy.fixture(`user${userScenarioName}.Data`).as('randomApplicant').then(userData => {
            cy.log(JSON.stringify(userData, null, "\t"));
        });
        cy.fixture('sapiaScriptInterview').as('testScript');
     })
    it ("should give an error when applicant gives an answer below 50 words as prompted", () => {
        const sapiaChatConsole = new ChatConsole();
        sapiaChatConsole.visit();
        cy.get('@randomApplicant').then(userData => {
            cy.get('@testScript').then(botScript => {
                sapiaChatConsole.askForApplicantUserInformation(userData, botScript);
                sapiaChatConsole.askWordCountFailingApplicantOnEssayQuestions(userData, botScript);
            });
        });
    });
});