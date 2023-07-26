/// <reference types="cypress" />

import ChatConsole from '../pages/ChatConsole';
import { createUserData } from '../fixtures/userfactory';

/**
 * Sapia Privacy Notice Test
 */
describe("Sapia Privacy FAQs Test", () => {
    let userData = {};
    beforeEach(function() {
        userData = (createUserData(1))[0];
        cy.log(JSON.stringify(userData, null, '\t'));
    })
    it("should be directed to Sapia Privacy FAQs page", () => {
        const sapiaChatConsole = new ChatConsole();
        sapiaChatConsole.visit();
        sapiaChatConsole.viewPrivacyFAQ();
        cy.url().should('contain', '/candidate-explainer/privacy-policy-candidates');
    }); 
});