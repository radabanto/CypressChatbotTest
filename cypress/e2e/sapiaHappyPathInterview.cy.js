/// <reference types="cypress" />

import ChatConsole from '../pages/ChatConsole';
import { createUserData } from '../fixtures/userfactory';

// Do testing via categorized user data
// Test data generation may be done according to category; generate test user data
// is parametrized to demonstrate such use case.

/**
 * Sapia Interview Happy Path Test
 */
describe("Sapia Interview Chat Happy Path", () => {
    let userData = {};
    beforeEach(function() {
        userData = (createUserData(1))[0];
        cy.log(JSON.stringify(userData, null, '\t'));
        cy.fixture('sapiaScriptInterview').as('testScript');
    });
    it("should be able to complete a personalized applicant interview", () => {
        const sapiaChatConsole = new ChatConsole();
        sapiaChatConsole.visit();
        cy.get('@testScript').then(botScript => {
            sapiaChatConsole.askForApplicantUserInformation(userData, botScript);
            sapiaChatConsole.askApplicantOnEssayQuestions(userData,botScript);
            sapiaChatConsole.askApplicantOnChoiceQuestions(botScript);
            sapiaChatConsole.askApplicantOnRating(userData, botScript);
        });
    }); 
});