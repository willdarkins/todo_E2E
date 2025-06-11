import { test } from "../fixtures/base";
import User from "../models/User";

test("should be able to register with valid info", async ({ signUpPage }) => {
  const user = new User();

  await signUpPage.goto();
  await signUpPage.signUp(user);
  await signUpPage.validateSignUp();
});
