---
title: Event Handling
type: guide
order: 8
---

# Event Handling

## Cross-component communication

As components are not aware of each other, they can be used in various combinations in various context. One of the ways of achieving the communication is by using Events. Strudel implements a simple class responsible for controlling event communication - `EventEmitter`.

## Using EventEmitter in components

`EventEmitter` is available to be imported from Strudel API. It's automatically included as a mixin for every component, which means by default every component is able to use event communication. 

Key methods responsible for handling communication are:
* `$emit()` - activates all the listeners attached to the event with provided name
* `$on()` - attaches listener to particular event
* `$off()` - detaches listener to particular event

Full specification can be found in the [API](http://strudeljs.org/api/#emit).

Example below shows cross-component event communication.

```html
  <div class="subscriber"></div>
  <button class="publisher" data-id="0">0</button>
```

```js
@Component('.subscriber')
class Subscriber {
  init() {
    this.$on('publisher:publish', (id) => { // Attaching listener
      this.$element.html(`${id}`);
    });
  }
}
```
```js
@Component('.publisher')
class Publisher {
  @Evt('click')
  publish() {
    this.$emit('publisher:publish', this.$data.id); // Firing event
  }
}
```

## Using EventEmitter outside of components

By extending the `EventEmitter` you can provide the same publish-subscribe communication mechanism to any JavaScript class. The API is the same as in components.

```js
import { EventEmitter } from 'strudel';

class DataProvider extends EventEmitter {
    constructor(url) {
        fetch(url).then((resp) => {
           this.$emit('data:fetched', resp.json());
        });
    }
}
```
