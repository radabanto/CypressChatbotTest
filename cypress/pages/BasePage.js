/**
 * Base Page Object Model.
 * POM class for supporting 
 * common page elements across multiple
 * POMs
 * @constructor BasePage
 * @module BasePage
 */
class BasePage {
    BasePage() {
        /* no implementation yet; placeholder */
    }

    /**
     * common visit method for all related pages
     * @method visit
     */
    visit() {
        cy.visit('/');
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

    /**
     * get access to the on page
     * quick return to top feature
     * @method getReturnToTopButton
     * @returns return to top button element selector
     */
    getReturnToTopButton() {
        return cy.get('.return-to-top').invoke('show');
    }
}

export default BasePage;