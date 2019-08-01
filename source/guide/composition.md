---
title: Composition
type: guide
order: 6
---

# Composition

## Sharing functionality between components
Strudel expects a single component to be attached to a single DOM node. Which is fine if you think about components, as single responsibility entities. However sometimes there are cases where you would like to have more functionality on a single DOM node, how can you organise your code in such scenario?

In this guide we will cover Strudel mixins - way of sharing functionality between components.

## Mixins
 To inject a mixin into a component you simply need to define `mixins` property inside the class and as a value provide an array of mixins that you would like to use. Mixins are just plain JavaScript objects (class mixins are not supported). A mixin object can contain any component properties, that will be later injected into the main component. 

```js
const dictionary = {
  message: 'Hello World!',
};

@Component('.welcome')
class Welcome {
  mixins = [dictionary],

  init() {
    console.log(this.message);
  }
};

// Hello world!
```

## Mixins with lifecycle hooks
When a lifecycle hook is defined inside a mixin - like `init` instead of mixing it as a regular property, such hook will be executed during component initialisation. It allows mixins to introduce logic to components and run it without any additional overhead.

```js
const makeRed = {
  init() {
    this.$element.addClass('red');
  }
};

const makeGreen = {
  init() {
    this.$element.addClass('green');
  }
};

const makeBold = {
  init() {
    this.$element.addClass('bold');
  }
}

@Component('.cmp1')
class Cmp1 {
  mixins = [makeRed, makeBold],
};

@Component('.cmp2')
class Cmp2 {
  mixins = [makeGreen, makeBold],
};
```

<iframe src="https://codesandbox.io/embed/custom-decorators-rg8yy?fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Common usecases
Mixins should come useful when sharing some accessibility functionality, reusable interactions or behaviour between components. There is no limit in how many mixins you would like to have and use in a single component.