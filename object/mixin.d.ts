declare function mixin<T, U>(target: T, source: U): T & U
declare function mixin<T, U, V>(target: T, source1: U, source2: V): T & U & V
declare function mixin<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W
declare function mixin<T, U, V, W, X>(target: T, source1: U, source2: V, source3: W, source4: X): T & U & V & W & X
declare function mixin(target: any, ...sources: any[]): any

export default mixin
