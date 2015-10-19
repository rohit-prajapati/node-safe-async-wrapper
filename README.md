# safe-async-wrapper

### Wrapper for async functions to always catch errors as first parameter of callback.

### Installation -

```
npm install safe-async-wrapper
```

### Problem -

You can catch the errors using try/catch blocks in synchronous functions. i.e.

try {
    syncFunction(a, b, c);
} catch (e) {
    console.log("Dhappa: ", e);
}

But this will not work with asynchromnous functions. For e.g. 

function asyncFunction(a, b, c, callback) {
    setTimeout(function () {
        throw new Error("BINGO ERROR");
        callback();
    }, 1000);
}

try {
    asyncFunction(a, b, c, function () {
        console.log('asyncFunction completed');
    });
} catch (e) {
    console.log("I can't catch the error here");
}

### Solution - 

We can safely wrap our async function to get the uncaught exception as first parameter of the callback. i.e.

```
var safeAsyncWrapper = require('safe-async-wrapper');
var asyncFunctionWrapper = safeAsyncWrapper.wrap(asyncFunction);

asyncFunction(a, b, c, function (err) {
    if (err) {
        console.log('Now I can catch the BINGO ERROR here', err);
    }
});
```

## Assumption: safe-async-wrapper expects last argument of async function to be some callback.
