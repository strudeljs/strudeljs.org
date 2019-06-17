---
title: Event Handling
type: guide
order: 6
---

# Event Handling

## Cross-component communication

Components should never directly depend on each others. Component A should never include component B and fire it's methods directly. All the communication and synchronisation between components should be done using Events. Strudel implements a simple class responsible for controlling event communication - `EventEmitter`.

## Events

`EventEmitter` is automatically included as a mixin for every component, which means by default every component is able to use event communication.

Key methods responsible for handling communication are:
* `$emit` - activates all the listeners attached to the event with provided name
* `$on`/`$off` - attaches/detaches listener to particular event

Full Event specification can be found in the [API](http://strudeljs.org/api/#emit).

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

@Component('.publisher')
class Publisher {
  @Evt('click')
  publish() {
    this.$emit('publisher:publish', this.$data.id); // Firing event
  }
}
```

## Using EventEmitter

Static classes introduced for handling utility configuration or data requesting can also communicate with components using events. To use events simply extend `EventEmitter` class in class and suddenly it will be able to communicate with components using same API as components.

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
