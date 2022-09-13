/* 
Second bind
importance: 5
Can we change this by additional binding?

What will be the output?

function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
*/

function f() {
  console.log(this.name);
}

f = f.bind({ name: 'John' }).bind({ name: 'Ann' });

f();

// A: John
