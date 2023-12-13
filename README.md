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


## Examples

### Type definition

Function `is`  

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

Using `is` for kind type arguments.

```javascript
import { is } from "https://x-titan.github.io/utils/index.js"

function fizz (a) {
    if(is.str(a)){
        // typeof a === "string"
    }

    if(is.num(a)){
        // typeof a === "number"
    }
}
```

### Math

```javascript
import { radianToDegree, degreeToRadian } from "https://x-titan.github.io/utils/index.js"

var angle = radianToDegree(Math.PI / 2) // return: 90
var radian = degreeToRadian(180)        // return: 3.14 (Math.PI)
```

`clamp` and `map`

```javascript
import { clamp, map } from "https://x-titan.github.io/utils/index.js"

var result_1 = clamp(value, min, max)
var result_2 = map(value, fromLow, fromHigh, toLow, toHigh)
```

`gcd` - greatest common divisor

```javascript
import { gcd } from "https://x-titan.github.io/utils/index.js"

var result_1 = gcd(a,b)
```

### Random


```javascript
import "https://x-titan.github.io/utils/index.js"

var result = Math.random(min, max)
var int = Math.randInt(min, max)
```

Create new random function

```javascript
var rand = Math.newRandom(seed)

rand()
rand(min)
rand(min, max)
```

### Object mixins


```javascript
import { mixin, extend } from "https://x-titan.github.io/utils/index.js"

var obj = mixin(...objects)

var result = extend(obj, ...objects) // result === obj
```

### Mono


```javascript
import { Mono } from "https://x-titan.github.io/utils/index.js"

class A extends Mono(...objects) {
    constructor(){
        super()
    }
}

class B {
    constructor(){
        Mono.mixin(this)
    }
}

const C = Mono.extend(class C { })
```


