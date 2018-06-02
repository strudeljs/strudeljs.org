---
title: Examples
type: examples
order: 1
---

# Hello world

> Simplest example of a component displaying *Hello world* text. This example shows component registration, `init` function and access to related DOM element.

<iframe src="/examples/embed/hello-world.html" width="100%"></iframe>

<div class="tabs">
    <ul role="tablist">
    	<li role="presentation">
    		<a id="index-tab" href="#index" role="tab" aria-controls="foo" aria-selected="true">index.html</a>
    	</li>
    	<li role="presentation">
    		<a id="component-tab" href="#component" role="tab" aria-controls="bar">greeter.js</a>
    	</li>
    </ul>
    <section id="index" role="tabpanel" aria-labelledby="index-tab">
    ```html
    <div class="greeter"></div>
    ```
    </section>
    <section id="component" role="tabpanel" aria-labelledby="component-tab" hidden>
    ```js
    import { Component } from 'strudel';
    
    @Component('.greeter')
    class Greeter {
        init() {
            this.$element.html(`Hello world!`);
        }
    }
    ```
    </section>
</div>