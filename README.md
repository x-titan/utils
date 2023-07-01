# Utils

## Features

- Support Chrome, Safary, Opera browsers
- Type kind parameters with `types.js`
- The ability to use the function `Random` and `UUID` functionals
- `Mixin` objects
- Advanced `Math` functions

## Import/Link

Adding script an core html file.
```html
<script src="https://x-titan.github.io/utils/index.js" type="module" defer></script>
```

## Usage

Import all functions
```js
import * from "https://x-titan.github.io/utils/index.js"
```

### Types

```js
is.str(value)
is.num(value)
is.obj(value)
is.bool(value)
is.symbol(value)
is.null(value)
is.defined(value)
is.undefined(value)
// And more usability methods of type functions
```


```js
import { is } from "https://x-titan.github.io/utils/index.js"

function fizz (a) {
    if(is.str(a)){
        // typeof a === "string"
    }
    
    if(is.num(a)){
        // typeof a === "number"
    }
    
     // Another codes
}
```