import { Locator, Page } from "@playwright/test";

export default class ToDoPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly todoEntry: Locator;
  readonly submitButton: Locator;
  readonly todoText: Locator;
  readonly checkbox: Locator;
  readonly trashCanIcon: Locator;
  readonly backLink: Locator;
  readonly CHECKED_CLASS = "Mui-checked";

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

  async addTodo(todoText: string) {
    await this.addButton.click();
    await this.todoEntry.fill(todoText);
    await this.submitButton.click();
  }

  async deleteToDo() {
    await this.trashCanIcon.click();
  }

  async completeToDo() {
    await this.checkbox.click();
  }

  async clickAllTodos() {
    const allCheckboxes = await this.page.getByTestId("complete-task").all();
    for (const checkboxInput of allCheckboxes) {
      const parent = checkboxInput.locator("css=span.MuiCheckbox-root");
      const hasCheckedClass = await parent.evaluate((element, checkedClass) => {
        return element.classList.contains(checkedClass);
      }, this.CHECKED_CLASS);

      if (!hasCheckedClass) {
        await checkboxInput.click();
        console.log(`Clicked an unchecked checkbox.`);
      }
    }
  }
}
