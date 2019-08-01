---
title: Style Guide
type: guide
order: 16
---

# Style guide

This is official style guide for Strudel-specific code. If you use a Strudel in a project, it's a great reference to avoid errors and anti-patterns. Of course depending on your needs or project you may want to deviate from the style guide based on your experience, tech stack or just personal opinion.

<br>
<blockquote class="upgrade">Check out the official **Eslint plugin** for Strudel to automate enforcing of the rules mentioned in this style guide. Go to [Github page](https://github.com/strudeljs/eslint-plugin-strudel).
</blockquote>

## Rules

### Importing DOM API as $

**Enforces not using element export directly. Suggested approach is to import $ from Strudel or reassign your import to $.**

Alasing makes DOM API more resembling jQuery API.
<br>
<blockquote class="bad">Bad
```js
import { element } from "strudel";
```
</blockquote>
<blockquote class="good">Good
```js
import { element as $ } from "strudel";
```
```js
import { $ } from "strudel";
```
</blockquote>

### `@El` property decorator on top of class

**Enforces properties decorated with @El to be placed on top of the class. This takes precendence over all methods and properties.**

This makes component classes easier to navigate as they follow specific structure.
<br>
<blockquote class="bad">Bad
```js
@Component('asdf')
class Test {
    init() {}

    @El('selector') property
}
```
</blockquote>
<blockquote class="good">Good
```js
@Component('test')
class Test {
    @El('.selector') property
    @El('.selector2') property2 

    init() {}
}
```
</blockquote>

### `@OnInit` method as first in class

**Enforces methods decorated with @OnInit to be first methods of class. Exception to this rule is init() method that if present should be always first method.**

This makes component classes easier to navigate as they follow specific structure.
<br>
<blockquote class="bad">Bad
```js
@Component('asdf')
class Test {
    method() {}
    
    @OnInit
    render() {}
}
```
</blockquote>
<blockquote class="good">Good
```js
@Component('test')
class Test {
    @OnInit
    render() {}

    method() {}
}
```
</blockquote>

### `init`  as first method in class

**Enforces init method being first method of class if used.**

This makes component classes easier to navigate as they follow specific structure.
<br>
<blockquote class="bad">Bad
```js
@Component('test')
class Test {
    render() {}

    init() {}
}
```
</blockquote>
<blockquote class="good">Good
```js
@Component('test')
class Test {
    @El('.selector') $property
    init() {}
}
```
```js
@Component('test')
class Test {
    init() {}
    render() {}
}
```
</blockquote>

### `init` used together with `@OnInit`

**Enforces not using useless init method that can be replaced by using @OnInit decorator on appropriate method calls. It also prevents from leaving empty init method in class body.**

This simplifies the code by pointing out the hook that could be written in more clear way instead of defining redundant method.
<br>
<blockquote class="bad">Bad
```js
@Component('test-component')
class Test {
    init() {
        this.render();
    }
}
```
```js
@Component('test-component')
class Test {
    init() {}
}
```
</blockquote>
<blockquote class="good">Good
```js
@Component('test')
class Test {
    init() {
        const props = this.$data.props;
        this.render();
    }
}
```
```js
@Component('test')
class Test {
    @OnInit
    render() {}
}
```
</blockquote>

### `@El` declaration in single line with decorated variable

**Enforces using @El decorator in single line with decorated property for best readability.**

Higly opinionated, but increases the readability making the components more concise.
<br>
<blockquote class="bad">Bad
```js
class TestClass {
    @El('selector')
    property
}
```
</blockquote>
<blockquote class="good">Good
```js
class TestClass {
    @El('selector') property
}
```
</blockquote>
