---
title: Debugging
type: guide
order: 14
---

# Debugging

## Turn on Production Mode
During development, Strudel provides a lot of warnings to help you with common errors and pitfalls. However, these warning strings become useless in production and bloat your app’s payload size.

## With Build Tools
When using a build tool like Webpack, the production mode will be determined by `process.env.NODE_ENV` inside source code, and it will be in `development` mode by default. Webpack provide a way to overwrite this variable to enable production mode, and warnings will be stripped by minifiers during the build. It can be done following way:

#### Webpack 4

```js
module.exports = {
  mode: 'production'
}
```

#### Webpack 3 and earlier

```js
const webpack = require('webpack');

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
```

## Without Build Tools
If you are somehow using the full build, i.e. directly including Strudel via a script tag without a build tool, make sure to use the minified version (strudel.min.js) for production.
