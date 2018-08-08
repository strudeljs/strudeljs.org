---
title: Lifecycle
type: guide
order: 8
---

# Component lifecycle

## Instance lifecycle hooks

Each component instantiated goes through a series of steps, for example it needs to bind events and elements from decorators to the DOM. Through the process every component runs functions called **lifecycle hooks**, giving users opportunity to provide code in each step of lifecycle.

<blockquote class="alert">DOM element correlated with component receives `strudel-init` class after full component initialization.</blockquote>

For example `init` runs when component is initialized.


```js
@Component('video')
class Video {
  init() {
    this.player = videojs(this.$data.player);
  	
    this.player.ready(() => {
      this.player.play();
    });
  }	
  
  destroy() {
    this.player.dispose();
  }
}
```

There are more hooks in different phases of component life as `destroy`.

## Lifecycle Diagram

Diagram below presents full component lifecycle and what hooks are available in which phase of the life of component.

<img style="display: block; margin: 0 auto; width: 550px;" src="/images/lifecycle.png">
