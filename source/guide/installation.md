---
title: Installation
type: guide
order: 1
---

# Installation

## Compatibility

**Strudel** declarative syntax depends heavily on decorators which are not part of ECMAScript spec, so they are not natively supported by browser vendors (decorators spec is a [TC39 proposal in stage 2](https://github.com/tc39/proposal-decorators)). Transpiler like Babel is required and ``transform-decorators-legacy`` plugin. For optional components syntax also ``transform-class-properties`` is recommended.


<blockquote class="alert">Strudel could be used without the decorators, but such an approach is not recommended as it loses one of core principles.</blockquote>

## Browser support
Without polyfills Strudel supports IE11, as it using DOM 4 spec. If lower browser support is required please use great tools like [polyfills.io](http://polyfills.io).

## CLI
CLI is recommended way of setting up new Strudel project

```bash
$ npm install --global strudel-cli
$ strudel init webpack my-project
$ cd my-project
$ npm install
```

You can read more about CLI in dedicated [guide](/guide/usage.html).

## NPM
If you feel like configuring build on your own you can use npm to install Strudel.
```bash
$ npm install strudel --save
```
Then however you need to take care about Babel and Webpack configuration.