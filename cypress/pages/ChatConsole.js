class ChatConsole {
    constructor() {
    }

    visit() {
      cy.visit('/');
    }

    send() {
        const button = cy.get('[data-testid="send-circle-button"]');
        button.click();
    }

    shouldHaveResponse(message) {
        cy.contains('[data-testid="text-bubble"]', message, {timeout: 20000 }).should('be.visible');
    }

    shouldNotHaveResponse(message) {
        cy.contains('p', message).should("not.exist");
    }

    shouldHaveMultipleResponse(messages) {
        for(let index = 0; index<messages.length; index++)
        {
            cy.contains('[data-testid="text-bubble"]', messages[index], {timeout: 20000 }).should('be.visible');
        }
    }

    respondToConsole(message) {
        cy.get('div[data-testid*="-editor"]').type(message);
        this.send();
    }

    respondFirstAddressMatchToConsole() {
        cy.get('*[class="option-item"]').first().click();
    }

    selectResponseFromConsole(choice) {
        cy.get(`[data-testid="text-bubble"] > div span:contains('${choice}')`).click();
    }

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

    clickSubmitRating() {
        cy.contains('SUBMIT RATING').click();
    }

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

    askWordCountFailingApplicantOnEssayQuestions(userData, botScript) {
        this.shouldHaveMultipleResponse(botScript.interviewChallenge1);
        this.shouldHaveResponse("Customers are our number one priority, it’s all about making sure the customer has the best shopping experience. Tell us about a time you went out of your way to make a difference to someone that improved their day?")
        this.respondToConsole(userData.freeTextNG);
        cy.wait(5000);
        this.shouldNotHaveResponse("Describe a time when you missed a deadline or personal commitment. How did that make you feel?");
        //TODO: Assert word count failure prompt here. At the time of creation, no prompt shows in the app. Another way was used
        //to determine whether the app proceeded with the prompts or not.
    }

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

    converseWithChatBot(userData, botScript) {
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
        this.shouldHaveMultipleResponse(botScript.interviewChallenge2);
        this.shouldHaveResponse("Do you identify as Aboriginal or Torres Strait Islander?");
        this.selectResponseFromConsole("No");
        this.shouldHaveResponse("Is English your second language?");
        this.selectResponseFromConsole("Yes");
        this.shouldHaveResponse("Please select your age group");
        this.selectResponseFromConsole("25-34");
        this.shouldHaveResponse("Great! That’s all the questions we have. Click the button below to submit your responses, and keep an eye out in your inbox for your personality profile.");
        this.selectResponseFromConsole("SUBMIT");
        this.shouldHaveMultipleResponse(botScript.interviewConclusionPlusRating);
        this.shouldHaveResponse("Rate your interview experience:");
        this.selectResponseToSlider(userData.rating);
        this.clickSubmitRating();
        cy.waitForSapiaResponse("Your feedback matters to us, share a few comments about your application and first interview experience.", 5000);
        this.respondToConsole(userData.freeText1);
        this.shouldHaveResponse(`Thank you for your feedback ${userData.name.split(' ')[0]}!`);
        this.shouldHaveResponse("Your interview is now finished and your answers have been submitted.");
    }
}

export default ChatConsole;