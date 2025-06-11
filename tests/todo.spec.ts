// todo.spec.ts
import { test, expect } from "../fixtures/base"; // Import from your base fixtures file
import TodoApi from "../api/TodoApi"; // Adjust path as necessary
import { faker } from "@faker-js/faker";

test.describe("Todo Application Tests", () => {
  const todoText = faker.lorem.sentence({ min: 4, max: 8 });

  test("should be able to add a new task", async ({
    loggedInUser,
    todoPage,
  }) => {
    const { page } = loggedInUser;

    await todoPage.addTodo(todoText);
  });

  test("should be able to delete a new task", async ({
    loggedInUser,
    request,
    todoPage,
  }) => {
    const { user, page } = loggedInUser;
    const todoApi = new TodoApi();
    await todoApi.addTodo(request, user); // Ensure addTodo takes user and todoText

    await page.reload();

    await todoPage.deleteToDo();
    const noTodosMessage = page.locator("[data-testid=no-todos]");
    await expect(noTodosMessage).toBeVisible();
  });
});
