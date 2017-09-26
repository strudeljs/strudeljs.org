---
title: Initialization
type: guide
order: 6
---

# Component Initialization

## Linking to DOM

Although components can be defined in any moment of the website runtime - you can attach them in `<head>`, middle of the `<body>` or before the `<body>` end. What's important is when these components are **initialized** and **linked to DOM**. In Strudel linking and initialization happend when document has stopped loading - when browser triggers `DOMContentLoaded` event. It's best to have all the markup inplace before that event occurs.

## Lazy initialization
There is a way of initializing components that were added to the DOM after that moment in time. Strudel parses the DOM in search of components. To trigger that search after the DOM ready event `CustomEvent` named `contentloaded` needs to be triggered.

Framework will receive event, start search for components in scope of element triggering the event and finally initialize components. 

<blockquote class="alert">`Element.trigger` can be used for easier triggering of the `contentloaded` event </blockquote>


```js
const ERROR = `<div data-msg="Unexpected error" class="error"></div>`;

@Component('loader')
class Loader() {
  init() {
     this.$element.append(ERROR);
     this.$element.trigger('contentloaded');
  }	
}

@Component('error')
class Error {
  init() {
    this.$element.html(this.$data.msg);
  }
}



```