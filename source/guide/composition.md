---
title: Composition
type: guide
order: 7
---

# Composition

## Mixins

Mixins are a flexible way to reuse functionality between components. A mixin object can contain any component options. When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options.

```js
const greeter = {
  message: 'Hello World!',
  
  greet() {
    this.$element.html(`${this.message}`);
  }
};

@Component('.welcome')
class Welcome {
  mixins = [greeter],

  init() {
    this.greet();
  }
};
```
