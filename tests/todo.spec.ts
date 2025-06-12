// todo.spec.ts
import { test, expect } from "../fixtures/base"; // Import from your base fixtures file
import TodoApi from "../api/TodoApi"; // Adjust path as necessary
import { faker } from "@faker-js/faker";

test.describe("Todo Application Tests", () => {
  const todoText = faker.lorem.sentence({ min: 4, max: 8 });

  test.beforeEach(async ({ loggedInUser }) => {
    const { page } = loggedInUser;
  });

  test("should add a new task", async ({ todoPage }) => {
    await todoPage.addTodo(todoText);
    await expect(todoPage.todoText).toBeVisible();
  });

  test("should add multiple tasks", async ({ todoPage, page }) => {
    const expectedTodos: string[] = [];
    const todoItemSelector = '[data-testid="todo-text"]';

    for (let i = 0; i < 5; i++) {
      const multipleTodos = `Task ${i + 1}`;
      await todoPage.addTodo(multipleTodos);
      await page
        .locator(todoItemSelector, { hasText: multipleTodos })
        .waitFor();
      expectedTodos.push(multipleTodos);
    }

    const todoItems = await page.getByTestId("todo-text").allTextContents();
    for (const expectedTodoText of expectedTodos) {
      const found = todoItems.some(
        (itemText) => itemText.trim() === expectedTodoText.trim()
      );
      expect(
        found,
        `Expected "${expectedTodoText}" to be in the todo list`
      ).toBe(true);
    }
    expect(todoItems.length).toBe(expectedTodos.length);
  });

  test("should be able to delete a new task", async ({
    loggedInUser,
    request,
    todoPage,
  }) => {
    const { user, page } = loggedInUser;
    const todoApi = new TodoApi();
    await todoApi.addTodo(request, user);

    await page.reload();

    await todoPage.deleteToDo();
    const noTodosMessage = page.locator("[data-testid=no-todos]");
    await expect(noTodosMessage).toBeVisible();
  });
});
