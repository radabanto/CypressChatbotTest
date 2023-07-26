/**
 * Chat Console Page Object Model.
 * POM class for supporting tests within the standard
 * Sapia Chat Window
 * @constructor ChatConsole
 * @module ChatConsole
 */
class ChatConsole {
    ChatConsole() {
        /* no implementation yet; placeholder */
    }

    /**
     * visit root chat session
     * @method visit
     */
    visit() {
      cy.visit('/');
    }

    /**
     * perform message send operation in test
     * @method send
     */
    send() {
        const button = cy.get('[data-testid="send-circle-button"]');
        button.click();
    }

    /**
     * perform viewing of Terms of Service from 
     * Sapia chat prompt
     * @method viewTermsOfService
     */
    viewTermsOfService() {
        cy.contains('Terms of Service', {timeout: 30000}).invoke('removeAttr','target').click();
    }

    /**
     * perform viewing of Privacy FAQs from 
     * Sapia chat prompt
     * @method viewTermsOfService
     */
    viewPrivacyFAQ() {
        cy.contains('Privacy FAQs', {timeout: 30000}).invoke('removeAttr','target').click();
    }

    /**
     * assertion of the visibility of a particular chat
     * response from Sapia
     * @param {string} message - intended response in test for verification
     * @method shouldHaveResponse
     */
    shouldHaveResponse(message) {
        cy.contains('[data-testid="text-bubble"]', message, {timeout: 20000 }).should('be.visible');
    }

    /**
     * negative assertion of the visibility of a particular chat
     * response from Sapia
     * @param {string} message - intended response in test for verification
     * @method shouldNotHaveResponse
     */
    shouldNotHaveResponse(message) {
        cy.contains('p', message).should("not.exist");
    }

    /**
     * method for performing multiple assertions
     * based on a script fixture array
     * useful for when anticipating a multi-bubble response
     * from Sapia
     * @param {string[]} messages - intended multiple response (array of string ) in test for verification
     * @method shouldHaveMultipleResponse
     */
    shouldHaveMultipleResponse(messages) {
        for(let index = 0; index<messages.length; index++)
        {
            cy.contains('[data-testid="text-bubble"]', messages[index], {timeout: 20000 }).should('be.visible');
        }
    }

    /**
     * method for verifying that the essay low end limit threshold prompt
     * is shown after applicants response is received with below
     * expected word count
     * @method shouldPromptOnEssayLimitsOnLessThan
     */
    shouldPromptOnEssayLimitsOnLessThan() {
        cy.get('[id="rcDialogTitle0"]').as('essayLimitPrompt').should('be.visible');
        cy.get('@essayLimitPrompt').find('p').should('have.text', 'You’ve entered less than the recommended 50 words');
    }

    /**
     * perform a chat response in test
     * @param {string} message - intended response in test for verification
     * @method respondToConsole
     */
    respondToConsole(message) {
        cy.get('div[data-testid*="-editor"]').type(message);
        this.send();
    }

    /**
     * perform an address selection on the first
     * address match; would work with any choice prompts
     * TODO: rename as intended to a better method name
     * @method respondFirstAddressMatchToConsole
     */
    respondFirstAddressMatchToConsole() {
        cy.get('*[class="option-item"]').first().click();
    }

    /**
     * select a specific match in a choice prompt when known
     * @param {string} choice - desired choice from choice prompt to select/click
     * @method selectResponseFromConsole
     */
    selectResponseFromConsole(choice) {
        cy.get(`[data-testid="text-bubble"] > div span:contains('${choice}')`).click();
    }

    /**
     * perform a response on a slider prompt in chat
     * NOTE: method assumes a pre-set location of the slider
     * and may mulfunction if slider position changes
     * TODO: Add a dynamic way of figuring out current slider position
     * WARNING: Method is not tested on different slider configurations and
     * may not work for all slider setups (i.e. different steps size/number of steps)
     * @param {string} desiredSliderPos - desired slider position in integer
     * @method selectResponseToSlider
     */
    selectResponseToSlider(desiredSliderPos) {
        // Current slider default position is set arbitrarily to 7
        // TODO: Add a way to check current slider position
        var currSliderPos = 7;
        var typeArrowDirection = '{rightarrow}';
        if (desiredSliderPos < currSliderPos) {
            typeArrowDirection = '{leftarrow}';
        }
        var moveStrokes = typeArrowDirection.repeat(Math.abs(currSliderPos-desiredSliderPos));
        if(desiredSliderPos != currSliderPos){
            cy.get(`[class='ant-slider-handle']`).as('sliderHandle').click().type(moveStrokes);
        }
    }

    /**
     * perform applicant rating response submission
     * by clicking on 'Submit Rating'button
     * @method clickSubmitRating
     */
    clickSubmitRating() {
        cy.contains('SUBMIT RATING').click();
    }

    /**
     * Perform initial applicant response based on 
     * bot script data and
     * user data
     * Validates response from json script
     * @param {JSON} userData - json object containing input user data
     * @param {JSON} botScript - json object containing a bot response script profile
     * @method askForApplicantUserInformation
     */
    askForApplicantUserInformation(userData, botScript) {
        this.shouldHaveMultipleResponse(botScript.introduction);
        this.shouldHaveResponse("Before we get started, can I get your first name and last name?");
        this.respondToConsole(userData.name);
        this.shouldHaveResponse("Thanks! And your email?");
        this.respondToConsole(userData.email);
        this.shouldHaveResponse("Great, and your phone number?");
        this.respondToConsole(userData.phone);
        this.shouldHaveResponse("Just one more thing, where do you live?");
        var location = userData.suburb;
        cy.get('[data-testid="desktop-editor"]').type(location);
        this.respondFirstAddressMatchToConsole();
        this.selectResponseFromConsole('Accept');
        this.shouldHaveResponse(`Thanks ${userData.name.split(' ')[0]} 😀`);
    }

    /**
     * Perform first phase of interview (arbitrary division of test script)
     * Contains test script for doing essay responses based on
     * bot script data and
     * user data
     * validates response from json script
     * @param {JSON} userData - json object containing input user data
     * @param {JSON} botScript - json object containing a bot response script profile
     * @method askApplicantOnEssayQuestions 
     */
    askApplicantOnEssayQuestions(userData, botScript) {
        this.shouldHaveMultipleResponse(botScript.interviewChallenge1);
        this.shouldHaveResponse("Customers are our number one priority, it’s all about making sure the customer has the best shopping experience. Tell us about a time you went out of your way to make a difference to someone that improved their day?")
        this.respondToConsole(userData.freeText1);
        this.shouldHaveResponse("Describe a time when you missed a deadline or personal commitment. How did that make you feel?");
        this.respondToConsole(userData.freeText2);
        this.shouldHaveResponse("We are always hungry to learn and do things differently. Give an example of a time you have had to deal with change, professionally or personally?");
        this.respondToConsole(userData.freeText3);
        this.shouldHaveResponse(`Thanks for sharing that with us, ${userData.name.split(' ')[0]}.`);
        this.shouldHaveResponse("We believe that we are better together. Tell us about a time when you have rolled up your sleeves to help out your team or someone else?");
        this.respondToConsole(userData.freeText1);
        this.shouldHaveResponse("Have you ever dealt with someone difficult? How did you handle the situation? You can draw on your experiences at work, at school or any group activity");
        this.respondToConsole(userData.freeText2);
    }

    /**
     * Alternative test script for doing essay
     * Implemented for when user enters a response that is below
     * outside the prompted message response length (in this case 50-150)
     * @param {JSON} userData - json object containing input user data
     * @param {JSON} botScript - json object containing a bot response script profile
     * @method askWordCountFailingApplicantOnEssayQuestions
     */
    askWordCountFailingApplicantOnEssayQuestions(userData, botScript) {
        this.shouldHaveMultipleResponse(botScript.interviewChallenge1);
        this.shouldHaveResponse("Customers are our number one priority, it’s all about making sure the customer has the best shopping experience. Tell us about a time you went out of your way to make a difference to someone that improved their day?")
        this.respondToConsole(userData.freeTextNG);
        cy.wait(5000);
        this.shouldNotHaveResponse("Describe a time when you missed a deadline or personal commitment. How did that make you feel?");
        this.shouldPromptOnEssayLimitsOnLessThan();
    }

    /**
     * Test Script to setup first essay prompt to Sapia
     * and check on passed essay data integrity
     * @param {JSON} userData - json object containing input user data
     * @param {JSON} botScript - json object containing a bot response script profile
     * @method askEssayWithLongestExpectedResponse
     */
    askEssayWithLongestExpectedResponse(userData, botScript) {
        this.shouldHaveMultipleResponse(botScript.interviewChallenge1);
        this.shouldHaveResponse("Customers are our number one priority, it’s all about making sure the customer has the best shopping experience. Tell us about a time you went out of your way to make a difference to someone that improved their day?");
        cy.interceptRequestFreeText(userData.freeText3).as('candidateResponseAPI');
        this.respondToConsole(userData.freeText3);
        cy.wait('@candidateResponseAPI').its('response.statusCode').should('eq', 200);
    }

    /**
     * Perform a preset response to 
     * choice questions
     * TODO: Make prompts random
     * @param {JSON} botScript - json object containing a bot response script profile
     * @method askApplicantOnChoiceQuestions
     */
    askApplicantOnChoiceQuestions(botScript) {
        this.shouldHaveMultipleResponse(botScript.interviewChallenge2);
        this.shouldHaveResponse("Do you identify as Aboriginal or Torres Strait Islander?");
        this.selectResponseFromConsole("No");
        this.shouldHaveResponse("Is English your second language?");
        this.selectResponseFromConsole("Yes");
        this.shouldHaveResponse("Please select your age group");
        this.selectResponseFromConsole("25-34");
        this.shouldHaveResponse("Great! That’s all the questions we have. Click the button below to submit your responses, and keep an eye out in your inbox for your personality profile.");
        this.selectResponseFromConsole("SUBMIT");
    }

    /**
     * Perform rating interaction after interview and test it
     * @param {JSON} userData - json object containing input user data
     * @param {JSON} botScript - json object containing a bot response script profile
     * @method askApplicantOnRating
     */
    askApplicantOnRating(userData, botScript) {
        this.shouldHaveMultipleResponse(botScript.interviewConclusionPlusRating);
        this.shouldHaveResponse("Rate your interview experience:");
        this.selectResponseToSlider(userData.rating);
        this.clickSubmitRating();
        this.shouldHaveResponse("Your feedback matters to us, share a few comments about your application and first interview experience.");
        this.respondToConsole(userData.freeText1);
        this.shouldHaveResponse(`Thank you for your feedback ${userData.name.split(' ')[0]}!`);
        this.shouldHaveResponse("Your interview is now finished and your answers have been submitted.");
    }
}

export default ChatConsole;