---
title: Introduction
type: guide
order: 2
---

# Introduction

## What is Strudel
Strudel (yup, exactly like a delicious 🇦🇹 layered pastry) is a lightweight component framework dedicated for back-end powered multi-page websites. Compared to the frameworks optimised for building *Single Page Applications*, Strudel is all about providing modern and lightweight way of providing interactivity to static HTML that is coming from the server.

## So... yet another framework?
Kinda. The goal of Strudel is to not compete with *React*, *Vue* or *Angular*, but to provide a much modern approach to writing things like tabs, accordions on carousels than *jQuery* offers. So if you are looking for virtual DOM powered, reactive powerhouse you rather won't find anything what you look for in Strudel. 

However if you need a library for taking care of DOM nicer than the native API and that will help you organise your front-end code in your CMS-powered site or blog then you might find Strudel useful.

## Getting started
Strudel is meant to be a component framework so to start let's create a first component. As it was stated above, Strudel relies on markup being provided by the server - it can be hand coded, provided from a static site generator, or even CMS like Wordpress. Let's start with a piece of HTML like this one:

```html
<div class="greeter"></div>
```

Now to make our HTML interactive with JavaScript. Strudel is a component-based framework so every HTML found on a page, can become a component with it's own interactive feats and JavaScript logic.

To define a component you simply need to create a `class` and wrap it with `@Component` decorator. Strudel relies heavily on ECMAScript decorators. Which are not yet standard API, but they are extremaly useful. With single line of code we can bind our JavaScript object with DOM.

```js
@Component('.greeter')
class Greeter {
}
```

## Lifecycle 

In Strudel components have lifecycle hooks that allows running logic when they are initialised or destroyed. To run code when the page has been loaded we need to implement `init` hook. We can also make use of Strudel's DOM API to write code similar to *jQuery* so displaying "Hello world" message is pretty simple using `.html()` method:

```js
@Component('.greeter')
class Greeter {
  init() {
    this.$element.html('Hello world!');
  }
}
```

<iframe src="https://codesandbox.io/embed/51p95?fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## More decorators

First let's expand our component's HTML to have an additional `input` and a `div` elements that we will use. Something like:

```html
<div class="greeter">
  <input type="text" class="greeter__input">
  <div class="greeter__output"></div>
</div>
```

Now our interactive bit would need to react to text being written. In Strudel easiest way to attach logic to DOM is via property decorators. There are two basic decorators - `@El` and `@Evt` for binding class methods to DOM elements and events. We would need to modify the code of our component to look like below.

```js
@Component('.greeter')
class Greeter {
  @El('.greeter__output') output
  @El('.greeter__input') input

  @Evt('keyup', '.greeter__input')
  onKeyUp() {
    this.output.html(this.input.prop('value').toUpperCase());
  }
}
```

<iframe src="https://codesandbox.io/embed/e66ty?fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Next steps
We’ve briefly introduced the most basic features of Strudel.js in this short example - the rest of guide will cover them in-depth and other advanced features with much finer details, so make sure to read through it all!
