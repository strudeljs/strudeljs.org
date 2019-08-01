---
title: Custom Decorators
type: guide
order: 7
---

# Custom Decorators

## Challenges with decorators
Decorators are a cool syntax sugar for writing declarative code. There might be some cases in your project, where you would like to introduce some functionality to the component via decorator.

Decorator is just a function and there are plenty of tutorials in the web, how to write one depending on the legacy or recent syntax. However writing such decorator will be able to enhance the methods inside component, without being able to fully interact with component lifecycle or properties. That's why Strudel introduces own utility function to be able to define decorators that provide all of that.

## Writing custom property decorator

This utility function is called `createDecorator` and can be exported the same way as other modules from the API. The function as parameter accepts a decorator function with 3 parameters avaialble to use:
* `component` - object of component to be decorated
* `property` - name of the decorated property
* `params` - all parameters passed by decorator (array)

Example of `customDecorator` in action:
```js
import { Component, createDecorator } from 'strudel';

const Log = createDecorator((component, property, props) => {
    const org = component[property]; // Store old function
    const label = props[0];

    component[property] = function () {
        console.log(`${label}: Method ${property} called at ${Date.now()}`);
        org.apply(component, arguments);
    };
});

@Component('.test')
class Test {
    @Log('DEBUG')
    run() { }
}

// DEBUG: Method run called at 1564469076568
```

<blockquote class="alert">If you would like to write a decorator without parameters that you would like to be used without parentheses like `@Log` you need to add them to a `createDecorator` call like this: `const Log = createDecorator((...) => {})();
`</blockquote>