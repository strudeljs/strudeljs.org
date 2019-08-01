---
title: Property Decorators
type: guide
order: 4
---

# Property Decorators

## Staying declarative 

Many frameworks to allow declarative binding of JavaScript logic with DOM tree require modification of HTML with special on component level attributes. This approach however makes markup very specific to a framework, making it hard to reuse and also, most importantly, it assumes that markup can be changed, which is not often a case when you are working with different systems. 

Strudel uses JavaScript experimental API of property decorators to provide declarative API without the need of HTML modification. Let's walk through what's available with the API.

## Example - a carousel

For the purpose of understanding property decorators let's imagine we are writing an interactive carousel component which has following markup:

```html
<div class="carousel">
  <div class="carousel__wrapper">
    <img class="carousel__item" src="https://via.placeholder.com/500x200.png?text=Slide+1">
    <img class="carousel__item" src="https://via.placeholder.com/500x200.png?text=Slide+2">
    <img class="carousel__item" src="https://via.placeholder.com/500x200.png?text=Slide+3">
  </div>
  <div class="carousel__nav">
    <button class="carousel__nav-item--prev">&lt;</button>
    <button class="carousel__nav-item--next">&gt;</button>
  </div>  
</div>  
```

## Binding DOM elements with `@El`

The first thing that is required when writing interactive parts of pages is the access to DOM. Strudel provides access to the component DOM element, but probably you would like to access a button or certain nested element. With `@El` decorator the element can be bound to a class property. 

In our carousel we would like to collect all the slides coming from server, so we can simply use `@El` decorator and provide a CSS selector as parameter.

```js
@Component('.carousel')
class Carousel {
  @El('.carousel__item') items
}
```

`@El` decorators are evaluated when component is initialised, so if a node is dynamically added to the HTML contents of a component the value of class property won't be updated.

## Adding event handlers with `@Evt`

The second common operation is to attach events to certain DOM elements - we want interactive bits to be clicked and make our code react to it. Strudel provides `@Evt` which binds the method with the DOM event. 

In our carousel example there are certain events like clicking the previous / next arrows that we would like to handle. This can be simply achieved by using the `@Evt` and providing event name as a first parameter. The second parameter can be used for event delegation, so we can easily bind the events exactly on the elements we need.

```js
@Component('.carousel')
class Carousel {
  @Evt('mouseover')
  stop() { }

  @Evt('mouseout')
  start() { }

  @Evt('click', '.carousel__nav-item--prev')
  prev() { }

  @Evt('click', '.carousel__nav-item--next')
  next() { }
}
```

Events bound with `@Evt` are by default delegated, so any change do HTML will be provided with events working.

## Initialising with `OnInit` decorator

We've already covered that components have certain hooks like `init` that allow to run code at key page events (like for example on page load). There are sometimes cases when you would like a method to be run on an event hook. Calling explicitly init from a component, is not a good practice. So to avoid such scenarios, another available decorator is `OnInit` allowing to decorate a method which should run when component initializes.

In our carousel example we can decorate `start` method, to make it run on initialisation.

```js
@Component('.carousel')
class Carousel {
  @OnInit
  start() { }
}
```

<iframe src="https://codesandbox.io/embed/carousel-4504i?fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## Is that all?

For now yes, if you would like to implement own decorators navigate to the [Custom Decorators - Guide](https://strudeljs.org/guide/custom-decorators.html).