/// <reference types="cypress" />

import ChatConsole from '../pages/ChatConsole';
import CandidateExplainer from '../pages/CandidateExplainer';
import { createUserData } from '../fixtures/userfactory';

/**
 * Sapia Candidate Explainer Test
 */
describe("Sapia Candidate Explainer Test", () => {
    let userData = {};
    beforeEach(function() {
        userData = (createUserData(1))[0];
        cy.log(JSON.stringify(userData, null, '\t'));
        cy.fixture('sapiaScriptInterview').as('testScript');
    })
    it ("should be directed to Sapia Candidate Explainer page", () => {
        const sapiaChatConsole = new ChatConsole();
        sapiaChatConsole.visit();
        sapiaChatConsole.viewCandidateExplainer();
        cy.url().should('contain', '/candidate-explainer');
    }); 

    it ("should have another access link to Sapia Candidate Explainer page after applicant details acceptance", () => {
        const sapiaChatConsole = new ChatConsole();
        sapiaChatConsole.visit();
        cy.get('@testScript').then(botScript => {
            sapiaChatConsole.askForApplicantUserInformation(userData, botScript);
            sapiaChatConsole.viewCandidateExplainerFromSecondLink();
        });
        cy.url().should('contain', '/candidate-explainer');
    }); 

    it ("should contain accessibility menu access", () => {
        const explainerPage = new CandidateExplainer();
        explainerPage.visit();
        explainerPage.getAccessibilityMenuButton().should('be.visible');
    });

    it ("should have quick scroll to home button access upon scrolling through the page", () => {
        const explainerPage = new CandidateExplainer();
        explainerPage.visit();
        cy.wait(5000);
        cy.scrollTo('bottom');
        explainerPage.getReturnToTopButton().should('be.visible');
    })
});