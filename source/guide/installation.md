---
title: Installation
type: guide
order: 1
---

# Installation

## Compatibility

Strudel depends heavily on decorators which are not part of ECMAScript 2015 spec. Currently to be able to use it transpiler like Babel is required. For usage Strudel **requires** ``transform-decorators-legacy`` Babel plugin. For optional components syntax also ``transform-class-properties`` is recommended. 

## Browser support
Without polyfills Strudel supports IE11, as it using DOM 4 spec. If lower browser support is required please use great tools like polyfills.io

## CLI
CLI is recommended way of setting up new Strudel project

```bash
$ npm install --global strudel-cli
$ strudel init webpack my-project
$ cd my-project
$ npm install
```

## NPM
If you feel like configuring build on your own you can use npm to install Strudel.
```bash
$ npm install strudel --save
```