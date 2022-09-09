/*
The singleton pattern is a type of creational pattern that solves two problems:
  1. Ensures that a class has just a single instance. 
      e.g. Create an object. If later you decide to create a new object, you get the object already created.
  2. Provide global access point.
      Global variables can potentially be overwritten. (typescript?)
      With the singleton pattern, the global object can now be accessed from anywhere, but without the possibility of it to change.

Main logic:
  Check if instance exists
    If instance doesn't exist create instance.
    If instance exists return instance.

*/

let instance = null;

class Singleton {
  constructor(country) {
    this.log = function () {
      console.log(country);
    };
  }

  static getInstance(country) {
    if (!instance) {
      instance = new Singleton(country);
    }
    return instance;
  }
}

let obj1 = Singleton.getInstance('Romania');
obj1.log();

let obj2 = Singleton.getInstance('Belarus');
obj2.log();

console.log(obj1 === obj2);
