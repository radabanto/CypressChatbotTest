/// <reference types="cypress" />

import ChatConsole from '../pages/ChatConsole';
import { createUserData } from '../fixtures/userfactory';

/**
 * Sapia Privacy Notice Test
 */
describe("Sapia Privacy Notice Test", () => {
    let userData = {};
    beforeEach(function() {
        userData = (createUserData(1))[0];
        cy.log(JSON.stringify(userData, null, '\t'));
    })
    it("should be directed to Sapia Privacy Terms of Service", () => {
        const sapiaChatConsole = new ChatConsole();
        sapiaChatConsole.visit();
        sapiaChatConsole.viewTermsOfService();
        cy.url().should('contain', '/terms-of-service');
    }); 
});