---
title: Defining a Component
type: guide
order: 3
---

# Defining a Component

## Components, components everywhere

Never heard about components? That's highly unlikely, but if so, you need to understand that components are centerpiece of modern web (not only) development. Dividing websites into components makes it not only easier to grasp and manage via cleaner code architecture, but also makes easier to talk with designer or business. Components are reusable, encapsulated pieces of website functionality - think about carousels, navigations, tabs, accordions, forms. 

Strudel implements a component architecture, so everything interactive on a page needs to be a component. Let's see how a component can be created in Strudel.

## Defining a component with `@Component`

Creating a component is straightforward. The API relies on JavaScript decorators - experimental API. Thanks to that to declare new component there is only one thing required - you need a piece of HTML coming from the back-end to be able to attach a component.

If that requirement is met you need to write a JavaScript class and wrap it with a `@Component` decorator, providing CSS selector as a parameter. Strudel will find all the instances of HTML element and instantiate a component for them, even if they are dynamically added to pages. 

```html
<div class="example"></div>
```
```js
@Component('.example') 
class Example {	
    init() {
        alert('Instantiated!');
    }
}
```
<blockquote class="alert">Don't use `constructor` in your component class, it will be simply ignored as Strudel uses it to introduce own logic.</blockquote>

With current implementation a single DOM node can have only single Component attached, trying to add more will result in warning. If you would like to share functionality across different components have a look at [Composition](http://strudeljs.org/guide/composition.html).

You can learn more about  `@Component` decorator in the [API](http://strudeljs.org/api/#Component) reference.

## Lifecycle hooks

Components are instantiated when page is fully loaded - on `DOMContentLoaded` browser event. If you want to run a code when component is instantiated there are certain hooks that can be used.

If you want to run some code when component is created you can use `init` hook in your code.

```js
@Component('.example')
class Example {	
    init() {
        this.$element.text('Hello');
    }
}
```

Find out more about lifecycle hooks in the dedicated chapter [API](http://strudeljs.org/guide/lifecycle.html).

## Nested components

It's not an uncommon case to want to dynamically add components to a page. Either by triggering action from user, or by completing the Ajax request. Strudel is also able to handle such cases, so dynamically added components (nested inside other or outside) are detected and initialised the same way as static HTML that is present on a page when JavaScript is loaded.

<iframe src="https://codesandbox.io/embed/hello-world-fmsst?fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

**Note:** Strudel doesn't provide any parent - child communication, so the parent component is not aware of any of it's children. There are different ways for handling communication between components.