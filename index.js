import XCore from "./core/xcore.js"
import is from "./core/types.js"
import each from "./core/each.js"
import { Extend, Mixin, Mono } from "./core/object.js"

XCore.define("is", is)
XCore.define("each", each)
XCore.define("Extend", Extend)
XCore.define("Mixin", Mixin)
XCore.define("Mono", Mono)

export default XCore