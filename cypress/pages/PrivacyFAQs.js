import BasePage from "./BasePage";

/**
 * Privacy FAQs Page Object Model.
 * POM class for supporting tests within the
 * Privacy FAQs site page
 * @constructor PrivacyFAQs
 * @module PrivacyFAQs
 * @augments BasePage
 */
class PrivacyFAQs extends BasePage{
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
}

export default PrivacyFAQs;