---
type: docs
---

# Decorators

## Component

- **Arguments:**
  - `{String} [selector]`
  
- **Usage:**

  Register new component within ``Registry``
  ```js
  @Component('.foo')
  class Foo { }
  ```
  
## Evt

- **Arguments:**
  - `{String} [event descriptor]`
  
- **Usage:**

  Add DOM event handler for specific descriptor and make decorated function a callback
  ```js
  @Evt('click .bar')
  onClick() { }
  ```
## El

- **Arguments:**
  - `{String} [element selector]`
  
- **Usage:**
  
  Find element by selector on component initialisation and substitute for variable
  ```js
  @El('.bar')
  bar
  ```

# Instance Properties
  
## data

## element

## parent

# Instance Methods / Events

## emit

## broadcast

## on
  
# Instance Methods / Lifecycle

## beforeInit

## init

## beforeDestroy

## destroy
  
# Element API

## find

## addClass

## removeClass

## on

## off

## trigger

## html

## text