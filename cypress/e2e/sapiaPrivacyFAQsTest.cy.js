/// <reference types="cypress" />

import ChatConsole from '../pages/ChatConsole';
import PrivacyFAQs from '../pages/PrivacyFAQs';
import { createUserData } from '../fixtures/userfactory';

/**
 * Sapia Privacy FAQs Test
 */
describe("Sapia Privacy FAQs Test", () => {
    let userData = {};
    beforeEach(function() {
        userData = (createUserData(1))[0];
        cy.log(JSON.stringify(userData, null, '\t'));
    })
    it ("should be directed to Sapia Privacy FAQs page", () => {
        const sapiaChatConsole = new ChatConsole();
        sapiaChatConsole.visit();
        sapiaChatConsole.viewPrivacyFAQ();
        cy.url().should('contain', '/candidate-explainer/privacy-policy-candidates');
    }); 

    it ("should contain accessibility menu access", () => {
        const faqsPage = new PrivacyFAQs();
        faqsPage.visit();
        faqsPage.getAccessibilityMenuButton().should('be.visible');
    });

    it ("should have quick scroll to home button access upon scrolling through the page", () => {
        const faqsPage = new PrivacyFAQs();
        faqsPage.visit();
        cy.wait(5000);
        cy.scrollTo('bottom');
        faqsPage.getReturnToTopButton().should('be.visible');
    })
});