/// <reference types="cypress" />

import ChatConsole from '../pages/ChatConsole';

describe("Sapia Interview Chat Happy Path", () => {
    beforeEach(function() {
        // executes once prior all tests in it block
        cy.generateTestUserData();
        cy.fixture('userData').as('randomApplicant').then(userData => {
            cy.log(JSON.stringify(userData, null, "\t"));
        });
        cy.fixture('sapiaScriptInterview').as('testScript');
     })
    it("should be able to complete a personalized applicant interview", () => {
        const sapiaChatConsole = new ChatConsole();
        sapiaChatConsole.visit();
        cy.get('@randomApplicant').then(userData => {
            cy.get('@testScript').then(botScript => {
                sapiaChatConsole.askForApplicantUserInformation(userData, botScript);
                sapiaChatConsole.askApplicantOnEssayQuestions(userData,botScript);
                sapiaChatConsole.askApplicantOnChoiceQuestions(botScript);
                sapiaChatConsole.askApplicantOnRating(userData, botScript);
            });
        });
    }); 
});