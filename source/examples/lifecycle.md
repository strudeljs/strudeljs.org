---
title: Lifecycle
type: examples
order: 4
---

# Lifecycle

> Usage of component lifecycle hooks. This example presents initialization and destroying components with hooks - `beforeInit`, `beforeDestroy`, `destroy`.

<iframe src="/examples/embed/lifecycle.html" width="100%"></iframe>

<div class="tabs">
    <ul role="tablist">
    	<li role="presentation">
    		<a id="index-tab" href="#index" role="tab" aria-controls="index" aria-selected="true">index.html</a>
    	</li>
    	<li role="presentation">
    		<a id="counter-tab" href="#counter" role="tab" aria-controls="counter">couter.js</a>
    	</li>
        <li role="presentation">
            <a id="adder-tab" href="#adder" role="tab" aria-controls="adder">adder.js</a>
        </li>
    </ul>
    <section id="index" role="tabpanel" aria-labelledby="index-tab">
    ```html
    <strong>Counter is destroyed when count >= 5</strong>
    <div class="counter"></div>
    <button class="adder">+1</div>
    ```
    </section>
    <section id="counter" role="tabpanel" aria-labelledby="counter-tab" hidden>
    ```js
    import { Component } from 'strudel';
    
    @Component('.counter')
    class Counter {
        count = 0;
    
        beforeInit() {
            this.$on('add', () => {
                this.count++;
                if (this.count >= 5) {
                    this.$teardown();
                } else {
                    this.render();
                }
            });
        }
    
        init() {
            this.render();
        }
    
        beforeDestroy() {
            this.$element.remove();
        }
    
        destroy() {
            this.$off('add');
            this.$emit('destroyed');
        }
    
        render() {
            this.$element.text(this.count);
        }
    }
    ```
    </section>
    <section id="adder" role="tabpanel" aria-labelledby="adder-tab" hidden>
    ```js
    import { Component, Evt } from 'strudel';
    
    @Component('.adder')
    class Adder {
        beforeInit() {
            this.$on('destroyed', () => this.$teardown());
        }
    
        beforeDestroy() {
            this.$element.remove();
        }
    
        @Evt('click')
        onClick() {
            this.$emit('add');
        }
    }
    ```
    </section>
</div>