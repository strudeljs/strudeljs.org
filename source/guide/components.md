---
title: Components
type: guide
order: 3
---

# Components

## Making components interactive
Of course things like tabs, accordions and carousels need to be interactive - respond to user clicks and change their state. Strudel achieves 

```html
<div class="collapsible">
    <div class="collapsible__trigger">Click me</div>
    <div class="collapsible__content">
        Hello there!
    </div>
</div>
```

```js
@Component('.collapsible')
class Collapsible {
  @El('.collapsible__content')
  content;
	
  @Evt('click .collapsible__trigger')
  toggle() {
    this.content.toggleClass('is-expanded');
  }
}
```