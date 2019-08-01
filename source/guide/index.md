---
title: Introduction
type: guide
order: 2
---

# Introduction

## What is Strudel
Strudel (yup, exactly like a delicious layered pastry 😋) is a lightweight component framework dedicated for back-end powered multi-page websites. Opposite to the frameworks that are oriented for building *Single Page Applications* Strudel is all about providing modern and lightweight way of providing interactivity to static HTML that is provided from a back-end. 

## ... So yet another framework?
Kinda. The goal of Strudel is to not compete with React, Vue or Angular, but to provide a much modern approach to writing things like tabs, accordions on carousels then jQuery offers. So if you are looking for virtual DOM powered, reactive powerhouse you rather won't find anything what you look for in Strudel. 

However if you need a library for taking care of DOM nicer than the native API and that will help you organise your front-end code in your CMS-powered site or  blog then you should definitely take a look at Strudel.

## Getting started
Strudel is meant to be a component framework so to start let's as an introduction create a first component. As it was stated above, Strudel relies on markup being provided by the server - it can be hand coded, provided from a static site generator, or even CMS like Wordpress. So first we need some HTML, something simple, just like this one:

```html
<div class="greeter"></div>
```

Let's now make our HTML interactive with JavaScript, first nothing exciting make it write **Hello world**. Nothing really excessive for starters. Strudel is a component-based framework so every HTML found on a page, can become a component with it's own interactive feats and JS logic.

To define a component you simply need to create a `class` and wrap it with `@Component` decorator. With that single line we bound our JavaScript object with DOM.

```js
@Component('.greeter')
class Greeter {
}
```

## Lifecycle 

Every component has some lifecycle hooks that allows running logic when they are initialised or destroyed. To run code when the page has been loaded we need to implement `init` hook. Also Strudel implements it's own DOM API similar to jQuery (but much more lightweight), so displaying "Hello world" message is pretty simple using `.html()` method:

```js
@Component('.greeter')
class Greeter {
  init() {
    this.$element.html('Hello world!');
  }
}
```

<iframe src="https://codesandbox.io/embed/51p95?fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Communicating with DOM

Let's now add some more interactivity to our HTML. Simple component that takes the text from the user and displays uppercase version of it. First let's expand our component's HTML to have an additional input and a div element that we will use for output. Something like:

```html
<div class="greeter">
  <input type="text" class="greeter__input">
  <div class="greeter__output"></div>
</div>
```

Now our interactive bit would need to react to text being written. In Strudel easiest way to attach logic to DOM is via property decorators. There are two basic decorators - `@El` and `@Evt` for biding class methods to DOM elements and events. We would need to modify the code of our component to look like below.

```js
@Component('.greeter')
class Greeter {
  @El('.greeter__output') output
  @El('.greeter__input') input

  @Evt('keyup .greeter__input')
  onKeyUp() {
    this.output.html(this.input.prop('value').toUpperCase());
  }
}
```

<iframe src="https://codesandbox.io/embed/e66ty?fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Next steps
We’ve briefly introduced the most basic features of Strudel.js - the rest of guide will cover them and other advanced features with much finer details, so make sure to read through it all!