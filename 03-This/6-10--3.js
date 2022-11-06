/* 
Function property after bind
importance: 5
There’s a value in the property of a function. Will it change after bind? Why, or why not?

function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // what will be the output? why?
*/

function sayHi() {
  console.log(this.name);
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: 'John'
});

console.log(bound.test); // what will be the output? why?

// A: Undefined. We are passing a new context (object) for the sayHi method, and in this new context the method test doesn't exist, so it will return undefined.
