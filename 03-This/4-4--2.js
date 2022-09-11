/*
Create a calculator
importance: 5
Create an object calculator with three methods:

read() prompts for two values and saves them as object properties with names a and b respectively.
sum() returns the sum of saved values.
mul() multiplies saved values and returns the result.
let calculator = {
  // ... your code ...
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );
*/

let calculator = {
  a: +prompt('a is:'),
  b: +prompt('b is:'),

  read() {
    return { a: this.a, b: this.b };
  },

  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  },
};

console.log('Object is =>', calculator.read());
console.log('Sum is equal to =>', calculator.sum());
console.log('Product is equal to =>', calculator.mul());
