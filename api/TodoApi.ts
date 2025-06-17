import { APIRequestContext } from "@playwright/test";
import User from "../models/User";
import { faker } from "@faker-js/faker";

export default class TodoApi {
  /**
   * Adds a single todo item
   * @param request The Playwright APIRequestContext.
   * @param user The User object with access token.
   * @returns The API response for the added todo.
   */
  async addTodo(request: APIRequestContext, user: User) {
    return await request.post("/api/v1/tasks", {
      data: {
        isCompleted: false,
        item: faker.lorem.sentence({ min: 3, max: 7 }),
      },
      headers: {
        Authorization: `Bearer ${user.getAccessToken()}`,
      },
    });
  }

  /**
   * Adds multiple todo items
   * @param request The Playwright APIRequestContext.
   * @param user The User object with access token.
   * @returns The API response for the added todo.
   */
  async addMultipleTodos(
    request: APIRequestContext,
    user: User,
    count: number
  ): Promise<{
    responses: import("@playwright/test").APIResponse[];
    todoTexts: string[];
  }> {
    const responses: import("@playwright/test").APIResponse[] = [];
    const todoTexts: string[] = [];

    for (let i = 0; i < count; i++) {
      const todoText = faker.lorem.sentence({ min: 3, max: 7 });
      const response = await request.post("/api/v1/tasks", {
        data: {
          isCompleted: false,
          item: todoText,
        },
        headers: {
          Authorization: `Bearer ${user.getAccessToken()}`,
        },
      });

      responses.push(response);
      todoTexts.push(todoText);
    }

    return { responses, todoTexts };
  }
}
