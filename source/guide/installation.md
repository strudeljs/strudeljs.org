---
title: Installation
type: guide
order: 1
---

# Installation

## Dependency on decorators
Strudel API depends heavily on decorators which are experimental ECMAScript API (not standard part of ECMAScript spec yet - (decorators spec is a [TC39 proposal in stage 2](https://github.com/tc39/proposal-decorators)). ) so they are not natively supported by browser vendors 

To be able to use Strudel you need a transpiler like _Babel_ configured to use plugins that allows the usage of decorators and also class properties:
* `@babel/plugin-proposal-decorators` (with `legacy` set to `true`)
* `@babel/plugin-proposal-class-properties`
<br>

<blockquote class="upgrade">It's recommended to use dedicated *Babel* preset for streamlined setup - take a look at [babel-preset-strudel](https://www.npmjs.com/package/babel-preset-strudel).
</blockquote>

## Browser support
Without polyfills Strudel supports all the modern browsers, but also Internet Explorer 11. It's DOM API relies on DOM 4 spec. If lower browser support is required please use great tools like [polyfills.io](http://polyfills.io) or other source of polyfills.

## Starting project using CLI
CLI is recommended way of setting up a new Strudel project. It's a dedicated tool that can quickly scaffold a project structure provisioning required *Babel* and *Webpack* configurations. New project can be created with few simple steps:

```bash
$ npm install --global strudel-cli
$ strudel new webpack my-project
$ cd my-project
$ npm install
```

You can read more about CLI in dedicated [guide](/guide/cli.html).

## Starting from scratch
If none of the templates available for the CLI fits your purpose or you would simply like to start from scratch you can just use npm (or yarn) to install Strudel.
```bash
$ npm install strudel --save
```
Please mind though that after this step you are on your own and you will need to take care about *Babel* (you can use the official preset) and *Webpack* configuration.
