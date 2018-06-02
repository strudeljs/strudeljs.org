---
title: Events
type: examples
order: 2
---

# Events

> Event handling between components in pub-sub manner. This example presents usage of `EventEmitter` class with `$on` and `$emit` functions.


<iframe src="/examples/embed/events.html" width="100%"></iframe>

<div class="tabs">
    <ul role="tablist">
    	<li role="presentation">
    		<a id="index-tab" href="#index" role="tab" aria-controls="foo" aria-selected="true">index.html</a>
    	</li>
    	<li role="presentation">
    		<a id="publish-tab" href="#publish" role="tab" aria-controls="bar">publish.js</a>
    	</li>
        <li role="presentation">
            <a id="subscribe-tab" href="#subscribe" role="tab" aria-controls="bar">subscribe.js</a>
        </li>
    </ul>
    <section id="index" role="tabpanel" aria-labelledby="index-tab">
    ```html
    <div class="publish">
        <input class="publish__message" type="text"/>
        <button class="publish__button">SEND</button>
    </div>
    <ul class="subscribe"></ul>
    ```
    </section>
    <section id="publish" role="tabpanel" aria-labelledby="publish-tab" hidden>
    ```js
    import { El, Evt, Component } from 'strudel';
    
    @Component('.publish')
    class Publish {
        @El('.publish__message')
        message
    
        @Evt('click .publish__button')
        sendMessage() {
            this.$emit('publish:msg', {
                message: this.message.prop('value')
            });
            this.message.prop('value', '');
        }
    }
    ```
    </section>
    <section id="subscribe" role="tabpanel" aria-labelledby="subscribe-tab" hidden>
    ```js
    import { Component } from 'strudel';
    
    @Component('.subscribe')
    class Subscribe {
        init() {
            this.$on('publish:msg', (data) => {
                this.$element.append(`<li>${data.message}<li>`);
            });
        }
    }
    ```
    </section>
</div>