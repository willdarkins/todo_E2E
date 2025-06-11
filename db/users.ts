const users = {
  validCredentials: {
    email: "willdarkins@gmail.com",
    password: "Finley2021!",
  },
  validEmailIncorrectPassword: {
    email: "willdarkins@gmail.com",
    password: "Finley2021",
  },
  validEmailInvalidPassword: {
    email: "willdarkins@gmail.com",
    password: "test",
  },
  invalidEmail: {
    email: "notanemail",
    password: "Finley2021!",
  },
  invalidEmailvalidPassword: {
    email: "will.darkins@audcay.com",
    password: "Finley2021!",
  },
  invalidCredentials: {
    email: "admin@example.com",
    password: "adminPassword",
  },
};

export default users;
