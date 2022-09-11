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
  read() {
    console.log('Please enter a value');
  }
};

calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());
