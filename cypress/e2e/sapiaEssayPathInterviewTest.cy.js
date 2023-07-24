/// <reference types="cypress" />

import ChatConsole from '../pages/ChatConsole';

describe("Sapia Interview Essay Length Test", () => {
    beforeEach(function() {
        // executes once prior all tests in it block
        let userScenarioName = "unhappyWordCount";
        cy.generateTestUserData(userScenarioName);
        cy.fixture(`user${userScenarioName}Data`).as('randomApplicant').then(userData => {
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