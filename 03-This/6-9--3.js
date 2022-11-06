function debounce(func, delayTime) {
  return function () {
    clearTimeout();
    setTimeout(() => func.apply(this, arguments), delayTime);
  };
}

let f = debounce(console.log, 1000);

f('a');
setTimeout(() => f('b'), 200);
setTimeout(() => f('c'), 500);
