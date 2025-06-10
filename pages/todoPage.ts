import { faker } from "@faker-js/faker";
import { expect, Locator, Page } from "@playwright/test";

export default class ToDoPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly todoEntry: Locator;
  readonly submitButton: Locator;
  readonly todoText: Locator;
  readonly checkbox: Locator;
  readonly trashCanIcon: Locator;
  readonly backLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByTestId("add");
    this.todoEntry = page.getByTestId("new-todo");
    this.todoText = page.getByTestId("todo-text");
    this.submitButton = page.getByTestId("submit-newTask");
    this.checkbox = page.getByTestId("complete-task");
    this.trashCanIcon = page.getByTestId("delete");
    this.backLink = page.getByRole("heading", {
      name: "Go back to your Todos",
    });
  }

  async addTodo() {
    const todoText = faker.lorem.sentence({ min: 4, max: 8 });
    await this.addButton.click();
    await this.todoEntry.fill(todoText);
    await this.submitButton.click();
    await expect(this.todoText).toBeVisible();
  }
}
