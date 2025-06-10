// todo.spec.ts
import { test, expect } from "../fixtures/base"; // Import from your base fixtures file
import { faker } from "@faker-js/faker";
import TodoApi from "../api/TodoApi"; // Adjust path as necessary

test.describe("Todo Application Tests", () => {
  const todoText = faker.lorem.sentence({ min: 4, max: 8 });

  test("should be able to add a new todo", async ({ loggedInUser }) => {
    const { page } = loggedInUser;

    await page.click("[data-testid=add]");
    await page.fill("[data-testid=new-todo]", todoText);
    await page.click("[data-testid=submit-newTask]");
    const toDoItem = page.locator("[data-testid=todo-item]");
    await expect(toDoItem).toHaveText(todoText);
  });

  test("should be able to delete a new task", async ({
    loggedInUser,
    request,
  }) => {
    const { user, page } = loggedInUser;

    // Add a todo using the API before deleting it via UI
    const todoApi = new TodoApi();
    await todoApi.addTodo(request, user, todoText); // Ensure addTodo takes user and todoText

    // Refresh the page to see the newly added todo
    await page.reload();

    await page.click("[data-testid=delete]");
    const noTodosMessage = page.locator("[data-testid=no-todos]");
    await expect(noTodosMessage).toBeVisible();
  });
});
