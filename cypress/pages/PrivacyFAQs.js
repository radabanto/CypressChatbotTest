/**
 * Privacy FAQs Page Object Model.
 * POM class for supporting tests within the
 * Privacy FAQs site page
 * @constructor PrivacyFAQs
 * @module PrivacyFAQs
 */
class PrivacyFAQs {
    PrivacyFAQs() {
        /* no implementation yet; placeholder */
    }

    /**
     * visit the Privacy FAQs page via direct link
     * @method visit
     */
    visit() {
        cy.visit('https://sapia.ai/candidate-explainer/privacy-policy-candidates/');
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

export default PrivacyFAQs;