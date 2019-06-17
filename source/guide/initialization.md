---
title: Initialization Process
type: guide
order: 10
---

# Component Initialization

## Linking to DOM

Although components can be defined in any moment of the website runtime - you can attach them in `<head>`, middle of the `<body>` or before the `<body>` end. What's important is when these components are **initialized** and **linked to DOM**. In Strudel linking and initialization happens when when browser triggers `DOMContentLoaded` event. It's best to have all the markup in-place before that event occurs.

## Dynamic initialization

However if you would like to dynamically generate HTML that will components, Strudel is also capable of handling such situations. Strudel observes any DOM Changes and every update search for elements that match registered Component selectors. This way all dynamically components will be instantiated same way as the ones' loaded from server.

```js
const ERROR = `<div data-msg="Unexpected error" class="error"></div>`;

@Component('loader')
class Loader() {
  init() {
     this.$element.append(ERROR);
  }	
}

@Component('error')
class Error {
  init() {
    this.$element.html(this.$data.msg);
  }
}
```

If somehow automatic DOM observations fails to instantiate the dynamic components you can manually trigger `content:loaded` event.


<blockquote class="alert">`Element.trigger` can be used for easier triggering of the `content:loaded` event </blockquote>
