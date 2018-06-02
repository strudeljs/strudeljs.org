---
title: Collapsible
type: examples
order: 2
---

# Collapsible

> Example of interactice component - collapsible panel. This example presents usage of `@Evt` and `@El` decorators with DOM API.

<iframe src="/examples/embed/collapsible.html" width="100%"></iframe>

<div class="tabs">
    <ul role="tablist">
    	<li role="presentation">
    		<a id="index-tab" href="#index" role="tab" aria-controls="foo" aria-selected="true">index.html</a>
    	</li>
    	<li role="presentation">
    		<a id="component-tab" href="#component" role="tab" aria-controls="bar">collapsible.js</a>
    	</li>
    </ul>
    <section id="index" role="tabpanel" aria-labelledby="index-tab">
    ```html
    <div class="collapsible">
        <button class="collapsible__button">TOGGLE</button>
        <section class="collapsible__panel" hidden="true">
            Hello world!
        </section>
    </div>
    ```
    </section>
    <section id="component" role="tabpanel" aria-labelledby="component-tab" hidden>
    ```js
    import { El, Evt, Component } from 'strudel';
    
    @Component('.collapsible')
    class Collapsible {
        @El('.collapsible__panel')
        panel
    
        @Evt('click .collapsible__button')
        toggle() {
            const state = (this.panel.attr('hidden') !== null);
    
            if (state) {
                this.panel.first().removeAttribute('hidden');
            } else {
                this.panel.attr('hidden', 'true');
            }
        }
    }
    ```
    </section>
</div>

