---
title: Manipulating DOM
type: guide
order: 5
---

# Manipulating DOM

## How to manipulate DOM?

Strudel allows DOM manipulation in similar manner to *jQuery* library. So there is a full API provided for working exclusively with DOM. The upside of using embedded API is it's small footprint compared to *jQuery*. In this chapter we will walk through some basic scenarios with the DOM API. See full reference under [DOM API reference](http://localhost:4000/api/#DOM-API) for more information.

## Using DOM API

Similar to _jQuery_ the DOM API can be imported into any module as a dollar sign - `$` or simply as `element`. All internal references to DOM in components (either `this.$element` or DOM elements found with `@El`) are using this API.

```js
import { $ } from 'strudel'; // OR import { element } from 'strudel'
```

Similar to _jQuery_ `$` is a function which can be used with a parameter of CSS selector as a string or an HTML element, which becomes decorated and enabled for full usage of API. In example below `body` element is decorated enabling usage of `addClass` method from the API..

```js
const body = $('body');
body.addClass('has-overlay-opened');
// body._nodes[0].classList.append('has-overlay-opened')
```

**Note:** If a method is missing in the Strudel DOM API, you can use native DOM API, by accessing Strudel elements with `_nodes` property.

## Traversing DOM

Most of DOM traversing could be achieved with usage of `@El` decorator, however DOM API exposes also suitable methods for finding elements, extracting children, parents, silbings etc.

```js
class Example {
    init() {
        const children = this.$element.children();
        const parent = this.$element.parent();
    }
}

```

## Manipulating DOM

Similar to traversing, manipulation methods iareprovided, with most common use cases like toggling classes, appending html, accessing data attributes etc.

```js
class Example {
    @Evt('click')
    click() {
        this.$element.toggleClass('is-clicked');
        this.$element.html(`
            ${this.$element.data('message')}
        `);
    }
}

```

## Handling custom DOM Events

Strudel DOM API also introduces the wrapper for handling DOM events in more pleasant way, so implementing custom events is easier.

```js
class Example {
    init() {
        this.on('custom-event', () =>  {
            alert('Hello world!');
        });
    }

    @Evt('click')
    click() {
        this.trigger('custom-event');
    }
}
```