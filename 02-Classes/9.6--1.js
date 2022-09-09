/*
Strange instanceof
importance: 5
In the code below, why does instanceof return true? We can easily see that a is not created by B().

function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

alert( a instanceof B ); // true
*/

function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

////
console.log('Is a instance of B? =>', a instanceof B); // true
console.log('---------');
console.log('What is a? =>', typeof a);
console.log('What type is the result of calling function B =>', typeof B());
console.log('What type is undefined? =>', typeof undefined);

let objectToString = Object.prototype.toString;
console.log('What type is a? =>', objectToString(a));
console.log('What type is B.prototype =>', objectToString(B.prototype));
console.log('What type is A.prototype =>', objectToString(A.prototype));

/*
Explanation:
Both a and B.prototype are the Undefined object.
*/
