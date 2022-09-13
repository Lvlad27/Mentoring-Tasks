/*
Fix a function that loses "this"
importance: 5
The call to askPassword() in the code below should check the password and then call user.loginOk/loginFail depending on the answer.

But it leads to an error. Why?

Fix the highlighted line for everything to start working right (other lines are not to be changed).

function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

askPassword(user.loginOk, user.loginFail);
*/

function askPassword(ok, fail) {
  let password = prompt('Password?', '');
  if (password == 'rockstar') ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  }
};

askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

// Why does it still work in the browser without correction?
