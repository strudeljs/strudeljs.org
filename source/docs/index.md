---
type: docs
---

# Decorators

## Component

- **Arguments:**
  - `{String} [selector]`
  
- **Usage:**
  ```js
  @Component('.foo')
  class Foo { }
  ```
  
## Evt

- **Arguments:**
  - `{String} [event descriptor]`
  
- **Usage:**
  ```js
  @Evt('click .bar')
  onClick() { }
  ```
## El

- **Arguments:**
  - `{String} [element selector]`
  
- **Usage:**
  ```js
  @El('.bar')
  bar
  ```