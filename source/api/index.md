---
type: api
title: API
hideInSidebar: true
---

# Core API

## Class Decorators

### @Component

- **Type**: `Decorator`

- **Arguments:**
  - `{String} CSS selector`

- **Details:**

  Registers new component that will be instantiated for all occurrences of selector on a page. When a new HTML is added to a page new occurences will be found.

- **Usage:**
  ```js
  @Component('.foo')
  class Foo { }
  ```

## Utilities

### createDecorator

- **Type:** `Function`

- **Arguments:**
  - `{*} any (optional)`

- **Details:**

  Creates a custom decorator that can be used for both classes and properties.


  Custom decorators are run during component initialisation so they can extend the component capability.

- **Usage:**

  ```js
  const Decorator = createDecorator((component, property) => {
    /* Decorator logic */
  });

  const DecoratorWithNoParams = createDecorator((component, property) =>  { 
    /* Decorator logic */
  })();

  @Decorator('argument')
  method() {}

  @DecoratorWithNoParams
  otherMethod() {}
  ```

### EventEmitter

- **Type:** `Object`

- **Details:**

  Utility class that extending allows to communicate any module with Strudel event system.

- **Usage:**

  ```js
  import { EventEmitter } from 'strudel';

  class Notifier extends EventEmitter {
      constructor() {
          this.$emit('notify');
      }
  }
  ```

## Constants

### INIT_CLASS

- **Type**: `String`

- **Default**: `strudel-init`

- **Details:**

  Provides the value of class that is added to an element when Strudel initializes.

- **Usage:**
  ```js
  import { INIT_CLASS } from 'strudel';
  ```
### INIT_SELECTOR

- **Type**: `String`

- **Default**: `.strudel-init`

- **Details:**

  Provides the value of a selector that can be used to select elements that have been initialized.

- **Usage:**
  ```js
  import { INIT_SELECTOR } from 'strudel';
  ```

### VERSION

- **Type**: `String`

- **Details:**

  Provides the used version of Strudel as string.

- **Usage:**
  ```js
  import { VERSION } from 'strudel';

  const version = Number(VERSION.split('.')[0]);
  
  if (version === 1) {
    // Version v1.x.x
  } else {
    // Version v0.x.x
  }
  ```

# Component API

## Property Decorators
  
### @OnInit

- **Type**: `Decorator`

- **Details:**

  Runs decorated class method on Component [init](#init) lifecycle hook 
  
- **Usage:**
  ```js
  @OnInit
  render() { }
  ```

### @Evt

- **Type**: `Decorator`

- **Arguments:**
  - `{String} event descriptor`
  - `{String} CSS selector (optional)`

- **Details:**

   Adds DOM event handler (using [.on()](#on-1) from DOM API) for specific descriptor and makes decorated class method a callback. Second parameter can be provided to delegate the event to a descendant element by selector.

- **Usage:**
  ```js
  @Evt('click')
  onElementClick() { }

  @Evt('click', '.bar')
  onChildClick() { }
  ```
  
### @El

- **Type**: `Decorator`

- **Arguments:**
  - `{String} CSS selector`

- **Details:**

  Finds element by selector (like [.find()](#find) from DOM API) on component initialisation and substitute for variable. Searched for within component DOM tree.

- **Usage:**

  ```js
  @El('.bar')
  bar
  ```

## Properties / DOM

### $element

- **Type:** `Element`

- **Details:**

  Gets the DOM element correlated with the component instance.

- **Usage:**
  ```js
  init() {
    this.$element.text('Hello world')
  }
  ```

### $data

- **Type:** `Object`

- **Details:**

  Reference to the `data` attributes map for DOM element correlated with component instance.

- **Usage:**
  ```js
  init() {
    console.log(this.$data.attribute);
  }
  ```

## Properties / Composition

### mixins

- **Type:** `Array<Object>`

- **Details:**

  The `mixins` options accepts an array of mixin objects. These mixin objects can contain methods and properties and they will be merged against the component.

  Mixins can have `init` method specificied which will be called before the component own `init`.

- **Usage:**
  ```js
  const mixin = {
    init() { console.log(1) }
  }

  class Component {
    mixins: [mixin]
    init() { console.log(2) }
  }

  // => 1
  // => 2
  ```
## Methods / Lifecycle

### $teardown

- **Type**: `Function`

- **Details:**

  Triggers destroy of the component - unbinds event listeners and binding to DOM

- **Usage:**
  ```js
  this.$teardown()
  ```

## Methods / Events

<blockquote class="alert">Instance events are handled by `EventEmitter` custom event implementation not using DOM events.</blockquote>

### $emit

- **Type**: `Function`

- **Arguments:**
  - `{String} event descriptor`

- **Details:**

  Emits event with provided descriptor and invokes all the handlers registered under that descriptor.

- **Usage:**
  ```js
  this.$emit('eventName');
  ```

### $on

- **Type**: `Function`

- **Arguments:**
  - `{String} event descriptor`
  - `{Function} callback`

- **Details:**

  Registers `callback` which will fire when event with matching `event descriptor` is emitted.

- **Usage:**
  ```js
  this.$on('eventName', function (data) {
    console.log(data);
  });
  ```

### $off

- **Type**: `Function`

- **Arguments:**
  - `{String} event descriptor`
  - `{Function} callback`

- **Details:**

  Unregisters `callback` registered for provided `event descriptor`.

- **Usage:**
  ```js
  this.$off('eventName', callback);
  ```

## Lifecycle Hooks

### beforeInit

- **Type:** `Function`

- **Details:**

  Called synchronously before the `init` and binding of events and elements. This can be used to fetch the data or manipulate the dom.

### init

- **Type:** `Function`

- **Details:**

  Called synchronously after `DOMContentLoaded` event or when new component is discovered.

### beforeDestroy

- **Type:** `Function`

- **Details:**

  Called synchronously after `$teardown()` function is invoked on component instance before event listeners and DOM detach.

### destroy

- **Type:** `Function`

- **Details:**

  Called synchronously after `$teardown()` function is invoked on component instance when everything is destroyed.

# DOM API

<blockquote class="alert">Note: Element is internal class for handling DOM manipulation that reimplements jQuery API. In components `this.$element` and all elements found using `@El` property decorator are Element instances.</blockquote>

### Element

- **Type:** `Object`

- **Arguments:**
  - `{String} CSS selector`
  - `{Node} context`

- **Details:**

    Creates instance of `Element` class for the `selector`, can also have context being provided to find elements within Node.

- **Usage:**
  ```js
    Element('div');
    Element('.list-item', document.querySelector('ul'));
  ```

## Traversing

### find
- **Type:** `Function`

- **Arguments:**
  - `{String} CSS selector`

- **Details:**

  Finds element specified by selector in the element context

- **Usage:**
  ```js
  Element('body').find('.className');
  ```

### children
- **Type:** `Function`

- **Arguments:**
  - `{String} CSS selector (optional)`

- **Details:**

  Get the direct children of all of the nodes with an optional filter

- **Usage:**
  ```js
  Element('body').children();
  Element('body').children('<div>');
  ```

### closest
- **Type:** `Function`

- **Arguments:**
  - `{String} CSS selector (optional)`

- **Details:**

  Find first ancestor that matches the selector

- **Usage:**
    ```js
    Element('a').closest();
    ```

### parent
- **Type:** `Function`

- **Arguments:**
  - `{String} CSS selector (optional)`

- **Details:**

  Travel the matched elements one node up.

- **Usage:**
  ```js
  Element('a').parent();
  ```

### eq
- **Type:** `Function`

- **Arguments:**
  - `{number} index`

- **Details:**

  Reduce the set of matched elements to the one at the specified index.

- **Usage:**
  ```js
  Element('.list-items').eq(3);
  ```

### first
- **Type:** `Function`

- **Details:**

  Reduce the set of matched elements to the first in the set. **Returns native HTML Element.**

- **Usage:**
  ```js
  Element('body').find('.className').first();
  ```

### get
- **Type:** `Function`

- **Arguments:**
  - `{number} index (optional)`

- **Details:**

  Reduce the set of matched elements to the item at specified index. **Returns native HTML Element.**

- **Usage:**
  ```js
  Element('body').find('.className').get();
  Element('body').find('.className').get(0); // Same as first
  ```

### array
- **Type:** `Function`

- **Arguments:**
  - `{Function} callback (optional)`

- **Details:**

  Extracts structured data from the DOM. Can have callback passed to return different format of data.

- **Usage:**
  ```js
  Element('ul li').array();
  // ['Item 1', 'Item 2', 'Item 3']
  ```

## Filtering

### filter
- **Type:** `Function`

- **Arguments:**
  - `{string|Element|Function} filter`

- **Details:**

  Remove all the nodes that doesn't match the criteria.

- **Usage:**
  ```js
  Element('ul').filter('li')
  Element('nav').filter(Element('a'))
  Element('nav').filter((node) => Element(node).is('a'))
  ```

### map
- **Type:** `Function`

- **Arguments:**
  - `{Function} callback`

- **Details:**

  Change the content of the current instance by looping each element

- **Usage:**
  ```js
  Element('ul li').map((node, i) => '<a>' + Element(node).text() + '</a>');
  ```

### each
- **Type:** `Function`

- **Arguments:**
  - `{Function} callback`

- **Details:**

  Loop through all of the nodes and execute a callback for each

- **Usage:**
  ```js
  Element('ul li').each((node, i) => Element(node).attr('href', '#'));
  ```

### is
- **Type:** `Function`

- **Arguments:**
  - `{string|Element|Function} filter`

- **Details:**

  Check whether any of the nodes matches the selector

- **Usage:**
  ```js
  Element('nav').is('.is-active');
  ```

## Manipulation

### clone
- **Type:** `Function`

- **Details:**

  Clone element with all it's attributes and descendants

- **Usage:**
  ```js
  Element("ul").clone();
  ```

### append
- **Type:** `Function`

- **Arguments:**
  - `{string|Element} html`

- **Details:**

  Insert content, specified by the argument, to the end of each element in the set of matched elements. Additional data can be provided, which will be used for populating the html

- **Usage:**
  ```js
  Element("ul").append("<li>Item 1</li>");
  ```

### prepend
- **Type:** `Function`

- **Arguments:**
    - `{string|Element} html`

- **Details:**

Insert content, specified by the argument, to the beginning of each element in the set of matched elements. Additional data can be provided, which will be used for populating the html

- **Usage:**
```js
Element("ul").prepend("<li>Item 1</li>");
```

### remove
- **Type:** `Function`

- **Details:**

  Remove the set of matched elements from the DOM.

- **Usage:**
  ```js
  Element("ul").remove();
  ```

### text
- **Type:** `Function`

- **Arguments:**
  - `{string} text (optional)`

- **Details:**

   Gets the text contents of the first element in a set. When argument is provided set the text contents of each element in the set.

- **Usage:**
  ```js
  Element("span").text();
  Element("span").text("Hello world!");
  ```

### html
- **Type:** `Function`

- **Arguments:**
  - `{string} htmlString (optional)`

- **Details:**

  Gets the HTML contents of the first element in a set. When argument is provided set the HTML contents of each element in the set.

- **Usage:**
  ```js
  Element("div").html();
  Element("div").html("<span>Hello world!</span>");
  ```

### attr
- **Type:** `Function`

- **Arguments:**
  - `{string|object} attrName`
  - `{string|null} value`

- **Details:**

  Gets the value of an attribute of the first element in the set. When second argument is provided sets the attributes contents of each element in the set.

- **Usage:**
  ```js
  Element("a").attr("href");
  Element("a").attr("href", "#");
  Element("a").attr({"href": "#", "target": "_blank"});
  Element("a").attr("href", null); // Remove attribute
  ```

### prop
- **Type:** `Function`

- **Arguments:**
  - `{string|object} propName`
  - `{string} value`

- **Details:**

  Gets the value of a property for the each element in the set of matched elements or set one or more properties for every matched element.

- **Usage:**
  ```js
  Element("input[type='checkbox']").prop("checked");
  Element("input[type='text']").prop("value", "5");
  ```

### data
- **Type:** `Function`

- **Arguments:**
  - `{string|object} attrName`
  - `{string} value`

- **Details:**

  Gets the value of an data attribute for the each element in the set of matched elements or set one or more attributes for every matched element.

- **Usage:**
  ```js
  Element("div").data().msg;
  Element("div").data("msg");
  Element("div").data("msg", "Hello world!");
  Element("div").data({"msg": "Hello world!", "value": "200"});
  ```

### addClass
- **Type:** `Function`

- **Arguments:**

  - `{...String} class(es)
  `
- **Details:**

  Adds the specified class(es) to each element in the set of matched elements.

- **Usage:**
  ```js
  Element('.button').addClass('is-active');
  ```
### removeClass
- **Type:** `Function`

- **Arguments:**

  - `{...String} class(es)`
- **Details:**

  Remove the specified class(es) to each element in the set of matched elements.

- **Usage:**
  ```js
  Element('.modal').removeClass('is-visible');
  ```
### toggleClass
- **Type:** `Function`

- **Arguments:**
  - `{...String} class(es)`
- **Details:**

  Toggles the specified class(es) to each element in the set of matched elements.

- **Usage:**
  ```js
  Element('.main-nav').toggleClass('is-expanded');
  ```
## Events

### trigger
- **Type:** `Function`

- **Arguments:**
  - `{String} events`

- **Details:**

  Execute all handlers attached to the event type.

- **Usage:**
  ```js
  Element('button').trigger('click');
  ```

### on
- **Type:** `Function`

- **Arguments:**
  - `{String} event`
  - `{string|Function} CSS selector or listener`
  - `{Function} listener (only when selector provided)`

- **Details:**

  Attach DOM event handlers to element or element descendants.

- **Usage:**
  ```js
  Element('button').on('click', callback);
  Element('div').on('click', 'button', callback);
  ```

### off
- **Type:** `Function`

- **Arguments:**
  - `{String|[String]} events`
  - `{Function} callback`

- **Details:**

  Remove DOM event handler(s) from element.

- **Usage:**
  ```js
  Element('button').off(); // Removes all handlers from element
  Element('button').off('click'); // Removes all handlers from element's click event
  Element('button').off('click', callback); // Removes callback from element's click event
  ```
## Miscellaneous

### index
- **Type:** `Function`

- **Arguments:**
  - `{Element|HTML Element} node`

- **Details:**

  Get an integer indicating the position of the passed element relative to parent.

- **Usage:**
  ```js
  Element('nav').index(Element('a.is-active'));
  Element('ul').index(Element('li.is-hidden').first());
  ```
