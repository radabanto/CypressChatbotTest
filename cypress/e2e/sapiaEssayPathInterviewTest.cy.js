/// <reference types="cypress" />

import ChatConsole from "../pages/ChatConsole";
import { createUserData } from "../fixtures/userfactory";

// Do testing via categorized user data
// Test data generation may be done according to category; generate test user data
// is parametrized to demonstrate such use case.

/**
 * Sapia Interview Not happy :) Path Test
 */
describe("Sapia Interview Essay Length Test", () => {
  let userData = {};
  beforeEach(function () {
    userData = createUserData(1)[0];
    cy.log(JSON.stringify(userData, null, "\t"));
    cy.fixture("sapiaScriptInterview").as("testScript");
  });

  it("should give an error when applicant gives an answer below 50 words as prompted", () => {
    const sapiaChatConsole = new ChatConsole();
    sapiaChatConsole.visit();
    cy.get("@testScript").then((botScript) => {
      sapiaChatConsole.askForApplicantUserInformation(userData, botScript);
      sapiaChatConsole.askWordCountFailingApplicantOnEssayQuestions(
        userData,
        botScript
      );
    });
  });

  it("should be able to get the complete essay answer of applicant", () => {
    const sapiaChatConsole = new ChatConsole();
    sapiaChatConsole.visit();
    cy.get("@testScript").then((botScript) => {
      sapiaChatConsole.askForApplicantUserInformation(userData, botScript);
      sapiaChatConsole.askEssayWithLongestExpectedResponse(userData, botScript);
    });
  });

  it("should allow for edit of previous applicant response ", () => {
    const sapiaChatConsole = new ChatConsole();
    sapiaChatConsole.visit();
    cy.get("@testScript").then((botScript) => {
      sapiaChatConsole.askForApplicantUserInformation(userData, botScript);
      sapiaChatConsole.askApplicantOnFirstEssayQuestionThenTryEditFirstResponse(
        userData,
        botScript
      );
    });
  });
});
