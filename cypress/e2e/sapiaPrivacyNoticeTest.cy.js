/// <reference types="cypress" />

import ChatConsole from '../pages/ChatConsole';
import TermsOfService from '../pages/TermsOfService';
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
    it("should be directed to Sapia Privacy Terms of Service from the chat console", () => {
        const sapiaChatConsole = new ChatConsole();
        sapiaChatConsole.visit();
        sapiaChatConsole.viewTermsOfService();
        cy.url().should('contain', '/terms-of-service');
    }); 

    it ("should contain accessibility menu access", () => {
        const termsPage = new TermsOfService();
        termsPage.visit();
        termsPage.getAccessibilityMenuButton().should('be.visible');
    });

    it ("should have quick scroll to home button access upon scrolling through the page", () => {
        const termsPage = new TermsOfService();
        termsPage.visit();
        cy.wait(5000);
        cy.scrollTo('bottom');
        termsPage.getReturnToTopButton().should('be.visible');
    })
});