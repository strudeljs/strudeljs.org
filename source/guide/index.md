---
title: Introduction
type: guide
order: 2
---

# Introduction

## What is Strudel.js?
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis id erat nec viverra. Ut odio neque, gravida et risus sit amet, tempus interdum justo. Pellentesque at sapien ligula. Phasellus ut nibh porttitor, aliquam leo sit amet, ultricies enim. Suspendisse dignissim placerat felis, et efficitur tortor pellentesque at. Curabitur tempor ipsum metus, nec porta turpis tincidunt sit amet. Vivamus sagittis et augue ac accumsan. Maecenas sem metus, cursus eget maximus ac, fermentum quis leo. Phasellus ac quam ac lacus ullamcorper porttitor id a nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla vel pretium est.

## Getting started
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis id erat nec viverra. Ut odio neque, gravida et risus sit amet, tempus interdum justo. Pellentesque at sapien ligula. Phasellus ut nibh porttitor, aliquam leo sit amet, ultricies enim. Suspendisse dignissim placerat felis, et efficitur tortor pellentesque at. Curabitur tempor ipsum metus, nec porta turpis tincidunt sit amet. Vivamus sagittis et augue ac accumsan. Maecenas sem metus, cursus eget maximus ac, fermentum quis leo. Phasellus ac quam ac lacus ullamcorper porttitor id a nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla vel pretium est.

```html
<div class="greeter"></div>
```

```js
@Component('.greeter')
class Greeter {
  init() {
    this.element.html('Hello world!');
  }
}
```

## Making stuff dynamic
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis id erat nec viverra. Ut odio neque, gravida et risus sit amet, tempus interdum justo. Pellentesque at sapien ligula. Phasellus ut nibh porttitor, aliquam leo sit amet, ultricies enim. Suspendisse dignissim placerat felis, et efficitur tortor pellentesque at. Curabitur tempor ipsum metus, nec porta turpis tincidunt sit amet. Vivamus sagittis et augue ac accumsan. Maecenas sem metus, cursus eget maximus ac, fermentum quis leo. Phasellus ac quam ac lacus ullamcorper porttitor id a nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla vel pretium est.

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

## Yet another framework?
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis id erat nec viverra. Ut odio neque, gravida et risus sit amet, tempus interdum justo. Pellentesque at sapien ligula. Phasellus ut nibh porttitor, aliquam leo sit amet, ultricies enim. Suspendisse dignissim placerat felis, et efficitur tortor pellentesque at. Curabitur tempor ipsum metus, nec porta turpis tincidunt sit amet. Vivamus sagittis et augue ac accumsan. Maecenas sem metus, cursus eget maximus ac, fermentum quis leo. Phasellus ac quam ac lacus ullamcorper porttitor id a nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla vel pretium est.

## Why not Typescript then?
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis id erat nec viverra. Ut odio neque, gravida et risus sit amet, tempus interdum justo. Pellentesque at sapien ligula. Phasellus ut nibh porttitor, aliquam leo sit amet, ultricies enim. Suspendisse dignissim placerat felis, et efficitur tortor pellentesque at. Curabitur tempor ipsum metus, nec porta turpis tincidunt sit amet. Vivamus sagittis et augue ac accumsan. Maecenas sem metus, cursus eget maximus ac, fermentum quis leo. Phasellus ac quam ac lacus ullamcorper porttitor id a nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla vel pretium est.

## Next steps
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis id erat nec viverra. Ut odio neque, gravida et risus sit amet, tempus interdum justo. Pellentesque at sapien ligula. Phasellus ut nibh porttitor, aliquam leo sit amet, ultricies enim. Suspendisse dignissim placerat felis, et efficitur tortor pellentesque at. Curabitur tempor ipsum metus, nec porta turpis tincidunt sit amet. Vivamus sagittis et augue ac accumsan. Maecenas sem metus, cursus eget maximus ac, fermentum quis leo. 