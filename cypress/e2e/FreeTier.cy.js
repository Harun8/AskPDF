import "cypress-file-upload";

describe("Free plan", () => {
  it("should navigate to the homepage and click on the login button", () => {
    // one second is not good should tell cypress to wait for it to render fully
    cy.visit("http://localhost:3000").wait(1000);
    cy.get(`[ data-testid="login-btn"]`).should("exist").click();

    cy.get(`[ data-testid="password-btn"]`).should("exist").click();
    cy.get(`[ data-testid="email-field"]`)
      .should("exist")
      .type("support@askpdfs.io");

    cy.get(`[ data-testid="password-field"]`).should("exist").type("test123");

    cy.get(`[ data-testid="login-btn"]`).should("exist").click();

    cy.get(`[ data-testid="chat-page-link"]`).should("exist").click();

    cy.get(`[ data-testid="uploadPDF-btn"]`).should("exist").click();

    cy.get('input[type="file"]').selectFile("cypress/fixtures/ficCV.pdf", {
      force: true,
    });

    cy.get(`[  data-testid="chat-textfield"]`)
      .should("exist")
      .type("What is this pdf about?")
      .wait(8000);

    cy.get(`[  data-testid="chat-btn"]`).should("exist").click();
  });
});
