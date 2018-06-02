---
title: Dynamic Initialization
type: examples
order: 3
---

# Dynamic Initialization

> Initializing components on demand. This example shows how to dynamically initialize components by triggering `contentloaded` event.

<iframe src="/examples/embed/dynamic-init.html" width="100%"></iframe>

<div class="tabs">
    <ul role="tablist">
    	<li role="presentation">
    		<a id="index-tab" href="#index" role="tab" aria-controls="index" aria-selected="true">index.html</a>
    	</li>
    	<li role="presentation">
    		<a id="generator-tab" href="#generator" role="tab" aria-controls="generator">generator.js</a>
    	</li>
        <li role="presentation">
            <a id="alert-tab" href="#alert" role="tab" aria-controls="alert">alert.js</a>
        </li>
    </ul>
    <section id="index" role="tabpanel" aria-labelledby="index-tab">
    ```html
    <div class="generator">
        <button class="generator__trigger">Generate alert</button>
    </div>
    ```
    </section>
    <section id="generator" role="tabpanel" aria-labelledby="generator-tab" hidden>
    ```js
    import { Component, Evt } from 'strudel';
    
    @Component('.generator')
    class Generator {
        @Evt('click .generator__trigger')
        onTrigger() {
            this.$element.prepend(`<div class="alert"></div>`);
            this.$element.trigger('contentloaded');
        }
    }
    ```
    </section>
    <section id="alert" role="tabpanel" aria-labelledby="alert-tab" hidden>
    ```js
    import { Component, Evt } from 'strudel';
    
    @Component('.alert')
    class Alert {
        @Evt('click .alert__dismiss')
        dismiss() {
            this.$element.remove();
        }
    
        init() {
            this.$element.html(`Alert! <button class="alert__dismiss">X</button>`);
    
            setTimeout(() => {
                this.dismiss();
            }, 2000);
        }
    }
    ```
    </section>
</div>