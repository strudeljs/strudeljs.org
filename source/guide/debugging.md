---
title: Debugging
type: guide
order: 12
---

# Debugging

## Development mode

To help during development of application, Strudel introduces internal error handling that in development mode will result in messages being logged to a browser console. These messages will warn you when doing unsupported operations to reduce reduntant code.

![Debug mode](/images/guide/debug.png)

All the errors that would break the execution of a code are catched and reported, so the application will continue to work. Development mode can be disabled with configuration of the build tool - this is covered in the [Deployment](/guide/deployment.html) guide.

## Official developer tools

To understand better the connection between JavaScript logic and DOM, Strudel provides official developer tools for Google Chrome. Check out the [official GitHub page](https://github.com/strudeljs/strudel-devtools).

![Chrome Devtools](/images/guide/devtools.png)

Full features of Strudel Developer Tools:

* Component tree
* DOM inspector
* Component property inspector - elements, properties
* Event debugger

## Download Strudel Dev Tools

If you are interested in using the developer tools, please download and install the extension from Chrome Web Store:
<div style="text-align:center">
[![Chrome Web Store](https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_206x58.png)](https://chrome.google.com/webstore/detail/strudel-devtools/akafkoceecgepokmamadojdimijcpnkl)
</div>