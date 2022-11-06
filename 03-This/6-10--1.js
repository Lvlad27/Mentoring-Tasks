/*  
Bound function as a method
importance: 5
What will be the output?

function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
*/

function f() {
  console.log(this); // ?
}

let user = {
  g: f.bind(null)
};

user.g();

// A: undefined??
