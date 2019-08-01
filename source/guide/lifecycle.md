---
title: Component Lifecycle
type: guide
order: 10
---

# Component lifecycle

## The lifecycle of a web page

There are certain events in the life of a web application. The obvious ones are related to the lifecycle of a page - DOM ready, everything loaded, page aborted. The components on the page needs to fit into this lifecycle, so Strudel provides hooks that allow to react on key events.

## Component lifecycle

Diagram below presents full component lifecycle and what hooks are available in which phase of the life of component. All the hooks are simply methods that when definied in a component under the certain name, will be run at the certain event in the lifecycle.

<img style="display: block; margin: 0 auto; width: 550px;" src="/images/lifecycle.png">

The most useful hooks to use in components are:
* `init` - most commonly used, code will be run when page is ready to use
* `destroy` - code will be run when component is removed from a page or when `$teardown` is explicitly called
