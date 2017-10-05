---
title: Components
type: guide
order: 3
---

# Components

## What are components?

Components are centerpiece of modern web development. Dividing websites into components makes not only cleaner code architecture, but also makes easier to talk with designers. Components are reusable, encapsulated pieces of website functionality - think about carousels, navigations, tabs, accordions, forms. In Strudel everything is a component.

## Defining components

To declare new component there needs are two things required:

* element in DOM so functionality can be attached
* Javascript class that will contain the functionality

The class is attached to the DOM by using `@Component` decorator, which ties classes to elements found by selector. Full specification can be found in the [API](http://strudeljs.org/api/#Component).

```html
<div class="example"></div>
```
```js
@Component('.example')
class Example {	}
```

## Initializing components

Components are instantiated when page is fully loaded - on `DOMContentLoaded` browser event. If you want to run a code when component is instantiated there are certain hooks that can be used.

<blockquote class="alert">You should never define `constructor` for a new Component, there are lifecycle hooks that will help achieving what is required - see [Lifecycle hooks](http://hooks)</blockquote>

If you want to run some code when component is created you can use `init` hook in your code.

```js
@Component('.example')
class Example {	
    init() {
        this.$element.text('Hello');
    }
}
```

## Making components interactive

As components are classes you can define methods and properties inside that will provide custom functionality for them. However what we really care for when building websites is *interactivity*. Strudel makes responding to DOM events and binding elements to code easier with additional decorators - `@El` and `@Evt`.
* `@El` decorator binds property from class to DOM element matching selector - [see full API](http://strudeljs.org/api/#El)
* `@Evt` decorator binds method from class to a DOM event that will occur on element or a children element - [see full API](http://strudeljs.org/api/#Evt)

Of course this functionality can be also achieved by [DOM manipulation API](http://strudeljs.org/guide/dom.html). However using decorators makes code more structured. Example below shows a simple collapsible component that reveals the content when clicked. See how decorators are used.

```html
<div class="collapsible">
    <div class="collapsible__trigger">Click me</div>
    <div class="collapsible__content">
        Hello there!
    </div>
</div>
```

```js
@Component('.collapsible')
class Collapsible {
  @El('.collapsible__content')
  content;
	
  @Evt('click .collapsible__trigger')
  toggle() {
    this.content.toggleClass('is-expanded');
  }
}
```

<iframe width="100%" height="500" src="https://www.webpackbin.com/bins/-KuntuH3D9Sh0VqETelg" allowfullscreen="allowfullscreen" frameborder="0"></iframe>