function throttle(fn, interval) {
  let lastTime;
  return function throttled() {
    let timeSinceLastExecution = Date.now() - lastTime;
    if (!lastTime || timeSinceLastExecution >= interval) {
      fn.apply(this, arguments);
      lastTime = Date.now();
    }
  };
}

// f1000 passes calls to f at maximum once per 1000 ms
let f1000 = throttle(console.log, 3000);

f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored
