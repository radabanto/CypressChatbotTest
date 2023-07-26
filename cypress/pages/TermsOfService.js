import BasePage from "./BasePage";

/**
 * Terms Of Service Page Object Model.
 * POM class for supporting tests within the
 * Terms Of Service site page
 * @constructor TermsOfService
 * @module TermsOfService
 * @augments BasePage
 */
class TermsOfService extends BasePage{
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
}

export default TermsOfService;