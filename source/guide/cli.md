---
title: CLI
type: guide
order: 14
---

# CLI

## Introduction

As Strudel requires _Babel_ to work and _Webpack_ is often used in building the code in project, there are some manual steps involved in configuring this tools for development. To simplify the process Strudel comes with a CLI (_Command Line Interface_) which shortens the setup the process and provides a zero configuration option for kicking off new Strudel based projects. 

<br>
<blockquote class="upgrade">Check out the [Github page](https://github.com/strudeljs/strudel-cli) of Strudel CLI.
</blockquote>


## Getting started

To install the CLI you simply need to have **Node.js >= 6.10** installed and run following command in your command line terminal.
```bash
$ npm install -g strudel-cli
```
It should make `strudel` application available and ready to be used.

## Showcase

As you accomplished the installation you can simply **generate** new project scaffolding by running `new` command:

```bash
$ strudel new webpack demo
```

<a href="https://asciinema.org/a/F1ZFSMp085bXyMmwwIRvEphJZ" target="_blank"><img src="https://asciinema.org/a/F1ZFSMp085bXyMmwwIRvEphJZ.png" /></a>

## Available Templates

CLI comes with a set of predefined templates, that should fit different kind of projects and scenarios, currently the available templates are:

* **Webpack** - standard project implementation using Babel and Webpack
* **Clientlib** - setup for Adobe Experience Manager (CMS) implementation
* **Theme** - setup for Zen Garden (Adobe Experience Module module) implementation

Please refer to official GitHub page for more documentation.