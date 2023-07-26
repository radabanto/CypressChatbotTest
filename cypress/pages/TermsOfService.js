/**
 * Terms Of Service Page Object Model.
 * POM class for supporting tests within the
 * Terms Of Service site page
 * @constructor TermsOfService
 * @module TermsOfService
 */
class TermsOfService {
    TermsOfService() {
        /* no implementation yet; placeholder */
    }

    /**
     * visit the terms of service page via direct url
     * @method visit
     */
    visit() {
      cy.visit('https://sapia.ai/terms-of-service/');
    }

    /**
     * get access to the on page
     * accessibility menu button
     * @method getAccessibilityMenuButton
     * @returns accessibility menu element selector
     */
    getAccessibilityMenuButton() {
        return cy.get('.ui_w');
    }
}

export default TermsOfService;