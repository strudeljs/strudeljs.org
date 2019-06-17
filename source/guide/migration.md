---
title: Migration from Strudel 0.x
type: guide
order: 15
---

# Migration from Strudel 0.x

As the 1.0 have been officialy released, there are some breaking changes that were introduced in the Strudel API. There is however no need to worry about, as the changes are very minor. **The API in about 95% is the same and none of the concepts have changed**, so the migration should not take you much of your time. 

## Automatic migration

To help with 

## API changes

### `@Evt` (changed)

When attaching event handlers to components, following code was used

```
@Evt('click .selector', true)
doSomething() {
```