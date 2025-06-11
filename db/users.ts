const users = {
  validCredentialsUser: {
    email: "willdarkins@gmail.com",
    password: "Finley2021!",
  },
  validEmailIncorrectPasswordUser: {
    email: "willdarkins@gmail.com",
    password: "Finley2021",
  },
  invalidEmailUser: {
    email: "notanemail",
    password: "Finley2021!",
  },
  invalidEmailvalidPassword: {
    email: "will.darkins@audcay.com",
    password: "Finley2021!",
  },
  invalidCredentialsUser: {
    email: "admin@example.com",
    password: "adminPassword",
  },
};

export default users;
