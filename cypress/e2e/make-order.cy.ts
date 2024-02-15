describe('make order', () => {

  const burgerIngredients = "[data-test=burger-ingredients]";
  const burgerConstructor = "[data-test=burger-constructor]";
  const buns = "[data-test=ingredient-bun]";
  const sauces = "[data-test=ingredient-sauce]";
  const mains = "[data-test=ingredient-main]";
  const userEmail = "[type=email]";
  const userPassword = "[type=password]";
  const modal = "[data-test=modal]";
  const orderNumber = "[data-test=order-number]";
  const closeButton = "[data-test=close-button]";

  beforeEach(() => {
    cy.viewport(1600, 800);

    cy.intercept("GET", "api/ingredients", { fixture: "ingredients" });
    cy.intercept("POST", "api/auth/login", { fixture: "login" });

    cy.visit('/');
  })

  it('make order', () => {

    cy.get(burgerIngredients).should("exist");
    cy.get(burgerConstructor).should("exist");

    // Перетаскиваем ингредиенты
    cy.get(buns).eq(0).trigger("dragstart");
    cy.get(burgerConstructor).trigger("drop");

    cy.get(sauces).eq(0).trigger("dragstart");
    cy.get(burgerConstructor).trigger("drop");

    cy.get(mains).eq(0).trigger("dragstart");
    cy.get(burgerConstructor).trigger("drop");

    // Оформляем заказ (вход в систему не выполнен)
    cy.get("button").contains("Оформить заказ").as("order-button");
    cy.get("@order-button").click();

    // Логинимся
    cy.location().should((location) => {
      console.log(location.hash);
      expect(location.hash).to.eq("#/login");
    });

    cy.get(userEmail).type("a@b.c");
    cy.get(userPassword).type("12345678");
    cy.get("button").contains("Войти").as("login-button");
    cy.get("@login-button").click();
    cy.get("a").contains("abcdef").as("user-home-button");
    cy.get("@user-home-button").should("exist");

    // Оформляем заказ (вход в систему выполнен)
    cy.intercept("POST", "api/orders", { fixture: "orders" }).as("get-order-request");
    cy.get("@order-button").click();
    cy.wait("@get-order-request");

    // Проверяем номера заказа
    cy.get(modal).should("exist");
    cy.get(orderNumber).should("have.text", "54321");
    cy.get(closeButton).click();
    cy.get(modal).should("not.exist");

    // Выходим из системы
    cy.intercept("POST", "api/auth/logout", { fixture: "logout" }).as("logout-request");
    cy.get("@user-home-button").click();
    cy.get("a").contains("Выход").click();
    cy.wait("@logout-request");

    // Проверяем что вышли
    cy.get("@user-home-button").should("not.exist");
    cy.get("a").contains("Войти").should("exist");
  })
})