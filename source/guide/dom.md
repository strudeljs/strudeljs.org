---
title: Manipulating DOM
type: guide
order: 4
---

# Manipulating DOM

## Fundamentals

Strudel uses DOM manipulation in similar manner as jQuery library. All DOM manipulation is done from Javascript in unobtrusive manner. This means all the traversing, manipulation and event handling is done in Javascript code, not in HTML.

<blockquote class="alert">Strudel uses DOM API v4, so no support for IE8 and IE9</blockquote>

If you are familiar with jQuery you should be familiar with the DOM API that Strudel provides, however Strudel API is much lighter.

## Traversing

Most of DOM traversing could be achieved with usage of `@El` decorator, however DOM API exposes also suitable methods for finding elements, extracting children, parents, silbings and others. See full reference in [DOM API reference](http://strudeljs.org/api/#find)

<blockquote class="alert">Always prefer `@El` decorator over `.find` if possible</blockquote>

```js
class Example {
    init() {
        const children = this.$element.children();
        const parent = this.$element.parent();
    }
}

```

## Manipulating

Similar to traversing manipulation is done from Javascript. DOM API handles DOM modifications as efficient as possible, so you could use corresponding methods to modify DOM as referenced in [DOM API reference](http://strudeljs.org/api/#html).

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