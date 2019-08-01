---
title: State Management
type: guide
order: 9
---

# State Management

## Official extension

Even back-end rendered pages often grow in complexity. To solve this problem Strudel provides official bindings for popular flux-like implementation - Redux. Checkout the dedicated github repository for details of [strudel-redux](https://github.com/strudeljs/strudel-redux).
<br>
<blockquote class="upgrade">**For regular Redux users**
The bindings available in [strudel-redux](https://github.com/strudeljs/strudel-redux) should allow you to use the dedicated Redux DevTools. Biggest difference is decorator-based API, but with all the rest you should be familiar with.
</blockquote>

## Simple state management from scratch

Simple state management implementation would be based around events using `EventEmitter`. Our store will hold the state and whenever state is updated internal event will be dispatched. Components would be able to react on the state change in a hook which we will implement in the next step.
```js
class Store extends EventEmitter {
  state = { message: 'N/A' }

  setState(newState) {
    this.$emit('state:change', [newState]);
  }
}
```
To easily connect components with store we could either write a **custom decorator** or a **mixin**. Let's use a mixin for the sake of this implementation. The decorator would allow us to provide a parameter to which store we would like to connect, but as we only have a store the mixin will do just fine. Mixin sets up the listener to state update event and expects a `stateChange` method being defined in a component.

```js
const store = new Store();

const connectStore = {
  init() {
    this.state = store.state;
    this.setState = store.setState;

    this.$on('state:change', ([payload]) => {
      this.state = payload;
      this.stateChange && this.stateChange();
    });
  }
};
```

Now the last step is to use the created mixin in the components. Whenever the `setState` method is being called, all components connected to a store will run their `stateChange` methods allowing us to for example modify the HTML output of a component. Example below triggers state change in the interval so you can observe as the HTML changes.

```js
@Component('.a')
class A {
  mixins = [connectStore];

  init() {
    setInterval(() => {
      this.setState({
        message: 'Component A'
      });
    }, 1000);
  }

  stateChange() {
    this.$element.html(this.state.message);
  }
}

@Component('.b')
class B {
  mixins = [connectStore];

  init() {
    setInterval(() => {
      this.setState({
        message: 'Component B'
      });
    }, 2000);
  }

  stateChange() {
    this.$element.html(this.state.message);
  }
}
```

<iframe src="https://codesandbox.io/embed/rwzsj?fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>



This simple state management should be fine for most applications, but basically it's a naive implementation of Redux has to offer, so if you read this entire article, maybe it's time to go to [strudel-redux](https://github.com/strudeljs/strudel-redux) and check it out!