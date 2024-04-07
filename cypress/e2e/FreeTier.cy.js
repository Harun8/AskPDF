describe("Free plan", () => {
  it("You should see the free pricing plans", () => {
    cy.visit("http://localhost:3000/pricing");

    cy.get(`[data-testid="cypress-FreePlan"]`).should("exist");
    cy.get(`[data-testid="cypress-freeTierBtn"]`).should("exist").click();
    cy.visit("https://google.com");
  });

  // it("You should be able to click the button the get signed up ", () => {
  //   cy.get(`[data-testid="cypress-freeTierBtn"]`).should("exist");
  // });
});

// You should manually go in and click the gmail magic link
// Should be automated at some point
