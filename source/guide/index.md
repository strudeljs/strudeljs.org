---
title: Introduction
type: guide
order: 2
---

# Introduction

## What is Strudel.js?
Strudel (/ˈstruːd(ə)l/) is a **lightweight component framework**. Declarative API is introduced thanks to Angular-style decorators. Main target for Strudel are interactive websites, not especially web applications, as there are plenty frameworks that solves apps problems nicely (*React*, *Angular*, *Vue*). On the other hand Strudel biggest goal is to provide great way of writing interactive bits on pages like tabs, accordions and carousels in server-side rendered websites. It's time to get rid of *jQuery* and start writing modern and lightweight code.

## Getting started
Strudel is **component** framework so code is organised into components and components are center piece of front-end development.. To create a component you need to simply create a ``class`` and bind it to existing DOM using ``@Component`` decorator as in example below.

```html
<div class="greeter"></div>
```

```js
@Component('.greeter')
class Greeter {
  init() {
    this.$element.html('Hello world!');
  }
}
```
Such a component will be instantiated for every occurrence of element with ``.greeter`` class that will be present on the page. More about components in [Components](http://strudeljs.org/guide/components.html) section.

## Yet another framework?
As there was mentioned in the **Getting started** Strudel goal is not to compete with *React* or *Angular*. If you are looking for Virtual DOM powered, Reactive framework for building complex apps Strudel is not for you. 

<blockquote class="alert">Strudel is not a competition for Angular, React or Vue</blockquote>

However if you need a library for taking care of DOM and Event handling in ECMAScript 2015 flavoured sauce that will help you organise your front-end code then Strudel is for you. 

## Why not Typescript?
Typescript is a great superset of the Javascript language which support decorators out of the box. Adding types however feels a little bit too much for Strudel, as biggest target audience should are developers switching directly from jQuery, so adding Typescript on top of Webpack and Babel would be too much.

## Next steps
Strudel is still currently under heavy development so if you have a great idea for the missing API I would like to contribute into the development of the framework, feel free to navigate to [Community](http://strudeljs.org/community/) subpage. Before version 1.0 expect much more new features. 
