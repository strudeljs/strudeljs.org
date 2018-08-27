---
title: CLI
type: guide
order: 10
---

# Usage of CLI

## Introduction

As Strudel requires Babel and Webpack to fully maximize it's declarative syntax there are some manual steps involved in configuring this tools for development and build. CLI shortens the process and provides a zero configuration option for kicking off new Strudel based projects. 

CLI is extensible so as the project grows [templates](/guide/templates.html) will be available, covering regular needs.

## Installation

To install the CLI you simply need to have **Node.js >= 6.10** installed and run following command in your command line terminal.
```bash
$ npm install -g strudel-cli
```
It should make `strudel` application available and ready to be used.

## Example

As you accomplished the installation you can simply **generate** new project scaffolding by running `new` command:

```bash
$ strudel new webpack demo
```

<a href="https://asciinema.org/a/F1ZFSMp085bXyMmwwIRvEphJZ" target="_blank"><img src="https://asciinema.org/a/F1ZFSMp085bXyMmwwIRvEphJZ.png" /></a>
