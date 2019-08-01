---
title: Migration from Strudel 0.x
type: guide
order: 15
---

# Migration from Strudel 0.x

As the 1.0 have been officialy released, there are some breaking changes that were introduced in the Strudel API. There is however no need to worry about, as the changes are very minor. **The API in about 95% is the same and none of the concepts have changed**, so the migration should not take you much of your time. 

## Automatic migration

To help with the migration, where applicable, breaking changes come with automatic codemod scripts that will migrate your codebase. We've prepared a [strudel-codemod](https://github.com/strudeljs/strudel-codemod) - tool that should steamline the migration process by running some scripts. Take a look at the README file to get better understanding how to use it.

## API changes

### `@Evt` (changed)

When attaching event handlers to components classes using dedidcated property decorator, following code was needed to be written:

```js
@Evt('click')
doSomething { }

@Evt('click .selector', true) // Prevents default
doSomething() { }
```
The decorator had one mandatory parameter and second optional one that would automatically prevent default for an event handler. Now `@Evt` accepts **only two parameters** - first for event descriptor, second (optional) for selector. The prevent default option has been removed. Take a look at example below.
```js
@Evt('click')
doSomething { }

@Evt('click', '.selector')
doSomething(e) { 
    e.preventDefault();
}
```

<blockquote class="upgrade">**Upgrade Path**
Run the [codemod](https://github.com/strudeljs/strudel-codemod) script called `evt-new-syntax`.
Note that if you used the optional parameter you will need now to update the contents of the event handler with `evt.preventDefault`.
</blockquote>