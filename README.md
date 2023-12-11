# Utils

XTitan_Utils is a JavaScript library for quick functions.

## Features

- Support Chrome, Safary, Opera browsers
- Type kind parameters with `types`
- The ability to use the function `Random` and `UUID` functionals
- `Mixin` objects
- Advanced `Math` functions

## Usage

Adding script an core html file.

```html
<script src="https://x-titan.github.io/utils/index.js" type="module" defer></script>
```

Import all functions

```javascript
import * from "https://x-titan.github.io/utils/index.js"
```

### Type definition

```javascript
is.str(value)       // String
is.num(value)       // Number
is.obj(value)       // Object
is.bool(value)      // Boolean
is.symbol(value)    // Symbol
is.null(value)      // null
is.defined(value)   // any
is.undefined(value) // undefined
// And more usability methods of type functions
```

## Example

Using `is` for kind type arguments 

```javascript
import { is } from "https://x-titan.github.io/utils/index.js"

function fizz (a) {
    if(is.str(a)){
        // typeof a === "string"
    }

    if(is.num(a)){
        // typeof a === "number"
    }

        // ...
}
```

```javascript
var angle = radianToDegree(Math.PI * 2)
```

```javascript
var result = minmax(value, min, max)
var contraints_ = minmax(min, min, max)
```