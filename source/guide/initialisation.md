---
title: Initialisation Process
type: guide
order: 11
---

# Component Initialisation

## Component registry

Strudel persists a component registry. Whenever a `@Component` decorator is used, the component is added to a hash map (with selector as a key - hence it needs to be unique) and initialisation queue. This registry is persisted until the page unloads. When component is registered there is no possibility to remove it from registry. There are no limitations where component is registered it can be in the main script, it can be asynchronously added.  

## Linking to DOM

Component initialisation (linking Javascript objects to DOM elements) happens at two key events in DOM:
* initially when the HTML document is ready - the browser triggers `DOMContentLoaded` or the state is ready
* when new HTML was added to a document - `MutationObserver` watches changes and looks for components to initialise


Every component in the initialisation queue is searched for in the HTML and for every found DOM element matching a selctor a new component instance is created.

<blockquote class="alert">DOM element correlated with component receives `strudel-init` class after full component initialization.</blockquote>

## Manually triggering initialisation

If somehow automatic DOM observations fails to instantiate the components, you can manually trigger `content:loaded` DOM event. This special event tells Strudel to walk through entire registry and instantiate all the components found on the page.

To streamline the usage of the event you can use Strudel DOM API to help with that. This might be useful when new Javascript was added to a page, or you are writing own router that changes rendered view.

```js
$(document).trigger('content:loaded');
```