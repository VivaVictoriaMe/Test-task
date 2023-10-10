describe("User Login and Assignment Creation", () => {
  it("should successfully create and assign an assignment", () => {
    // Step 1: Visit the login page
    cy.visit("https://myf2b.com/session/new");

    // Step 2: Provide user login credentials
    const login = "automationteacher";
    const password = "Autom@tionTe@cher2023";
    cy.get("#username-button").click();
    cy.get("#login").type(login);
    cy.get("#password").type(password);
    cy.get("#username-login-submit").click();
    cy.wait(7000);

    // Step 3: Verify successful login
    cy.get(".welcome-text")
      .should("contain.text", "Automation Teacher")
      .and("be.visible");

    // Step 4: Navigate to Kindergarten Toolkit
    cy.get('[href="/toolkits/library/kindergarten-skill-library/"]').click();
    cy.wait(4000);

    // Step 5: Verify the toolkit title
    cy.get(".title-content")
      .should("have.text", "Kindergarten Teacher Toolkit")
      .and("be.visible");

    // Step 6: Select Capital Letters lesson
    cy.get(".ant-collapse-item.thumbanail-view-collapse-panel")
      .contains("Capital Letters")
      .eq(0)
      .click();

    // Step 7: Select Capital Letter A lesson
    cy.get('[href="/toolkits/lessons/capital-letter-a/"]').click();
    cy.wait(3000);
    cy.get(".title-content")
      .should("contain.text", "Capital letter A")
      .and("be.visible");

    // Step 8: Assign the lesson to students
    cy.get('[class="ant-btn ant-btn-primary"]')
      .contains("Assign to Students")
      .click();

    // Step 9: Edit assignment  - Remove task
    // cy.get(".ant-modal-confirm-btns > .ant-btn-primary").click();
    cy.get('[class="ant-btn ant-btn-link ant-btn-icon-only ant-btn-dangerous"]')
      .eq(0)
      .click();

    // Step 10: Edit assignment - Move task up or down in order
    cy.get(".ant-tree-draggable-icon")
      .eq(0)
      .drag(
        ".ant-tree-treenode-leaf-last > .ant-tree-node-content-wrapper > .ant-tree-title > .ant-space"
      );

    // Step 11: Proceed to the next step
    cy.get('[class="ant-btn ant-btn-primary"]').contains("Next").click();
    cy.wait(1000);

    // Step 12: Select a class
    cy.get(".ant-modal-body")
      .should("contain.text", "Choose a Class")
      .and("be.visible");
    cy.get(".ant-card-body > .ant-btn > :nth-child(1)").click();

    // Step 13: Select all students
    cy.get('[class="ant-btn ant-btn-primary"]').contains("Select All").click();

    // Step 14: Proceed to the next step
    cy.get('[class="ant-btn ant-btn-primary"]').contains("Next").click();
    cy.wait(1000);

    // Step 15: Set the start date to today
    cy.get('[class="ant-picker ant-picker-status-success"]').eq(0).click();
    cy.get(
      '[class="ant-picker-cell ant-picker-cell-in-view ant-picker-cell-today"]'
    ).click();

    // Step 16: Click "Assign" to create the assignment
    cy.get('[class="ant-btn ant-btn-primary"]')
      .eq(-1)
      .contains("Assign")
      .click();
    cy.wait(1000);

    // Step 17: Verify assignment creation success
    cy.get('[class="ant-result ant-result-success"]')
      .should("contain.text", "Assignment successfully created")
      .and("be.visible");
  });
});
