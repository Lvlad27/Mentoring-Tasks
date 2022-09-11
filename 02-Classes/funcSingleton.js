function Singleton(countryName) {
  let instance = null;

  function newInstance(countryName) {
    const instance = { country: countryName };
    const obj = Object.create(instance);
    return obj;
  }

  const returnInstance = function getInstance(countryName) {
    if (!instance) {
      instance = newInstance(countryName);
    }
    return instance;
  };

  return returnInstance();
}

let obj1 = Singleton('Romania');
console.log(obj1);
