import BasePage from "./BasePage";

/**
 * Candidate Explainer Page Object Model.
 * POM class for supporting tests within the
 * Main Candidate Explainer page
 * @constructor CandidateExplainer
 * @module CandidateExplainer
 * @augments BasePage
 */
class CandidateExplainer extends BasePage{
    CandidateExplainer() {
        /* no implementation yet; placeholder */
    }

    /**
     * visit the Candidate Explainer page via direct link
     * @method visit
     */
    visit() {
        cy.visit('https://sapia.ai/candidate-explainer');
    }
}

export default CandidateExplainer;