import { is } from "./index.js"

const test = (value, tobe) => {
  if (value !== tobe) throw new Error("Wrong")
}
class A { }
test(is.NaN(NaN), true)
test(is.NaN(0), false)
test(is.NaN(1), false)
test(is.NaN(1.1), false)
test(is.NaN("NaN"), false)
test(is.NaN(Infinity), false)

test(is.plainObj({}), true)
test(is.plainObj({ a: "a" }), true)
test(is.plainObj(new A), false);

function alpha(params) {
  test(is.argument(arguments), true)
  test(is.array(arguments), false)
}
alpha()

test(is.argument([]), false)

test(is.finite(0), true)
test(is.finite(1), true)
test(is.finite(1.1), true)
test(is.finite(Infinity), false)
test(is.finite(NaN), false)

test(is.int(0), true)
test(is.int(1), true)
test(is.int(1.1), false)
test(is.int(NaN), false)
test(is.int(Infinity), false)

test(is.decimal(0), true)
test(is.decimal(1), true)
test(is.decimal(1.1), true)
test(is.decimal(NaN), false)
test(is.decimal(Infinity), false)

test(is.float(0), false)
test(is.float(1), false)
test(is.float(1.1), true)
test(is.float(NaN), false)
test(is.float(Infinity), false)

test(is.class_(A), true)
test(is.class_(alpha), false)

test(is.array([]), true)
test(is.array(alpha), false)
test(is.array({ 0: "", 1: "", 2: "", length: 3 }), false)

test(is.arrayLike([]), true)
test(is.arrayLike({ 0: "", 1: "", 2: "", length: 3 }), true)
test(is.arrayLike(A), false)

test(is.iterable([]), true)
test(is.iterable({ 0: "", 1: "", 2: "", length: 3 }), false)
test(is.iterable(null), false)
test(is.iterable(A), false)

test(is.nonZeroValue(1), true)
test(is.nonZeroValue([0]), true)
test(is.nonZeroValue("0"), true)
test(is.nonZeroValue([]), false)
test(is.nonZeroValue(""), false)
test(is.nonZeroValue(0), false)
test(is.nonZeroValue(null), false)
test(is.nonZeroValue(undefined), false)
test(is.nonZeroValue(void 0), false)

test(is.obj({}), true)
test(is.obj(() => { }), false)
test(is.obj(alpha), false)
test(is.obj(A), false)
test(is.obj(null), false)
test(is.obj(undefined), false)