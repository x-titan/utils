declare namespace is {
  // Defined and Undefined types
  function defined(value: unknown): value is any
  function empty(value: unknown): value is (null | undefined)
  function null_(value: unknown): value is null
  function undefined(value: unknown): value is undefined

  // Primitive types
  function num(value: unknown): value is number
  function str(value: unknown): value is string
  function bool(value: unknown): value is boolean
  function func(value: unknown): value is Function
  function obj(value: unknown): value is Object

  // Function types
  function genFunc(value: unknown): value is GeneratorFunction
  function asyncFunc(value: unknown): value is (event: any) => Promise<unknown>
  function args(value: unknown): value is ArrayLike<unknown>

  // Object definitions
  function class_(value: unknown): value is new () => unknown
  function extensible(value: unknown): boolean

  // Iterable types
  function arr(value: unknown): value is unknown[]
  function array(value: unknown): value is unknown[]
  function arrayLike(value: unknown): value is ArrayLike<unknown>
  function iterable(value: unknown): value is Iterable<unknown>

  // Number definitions

  /** If `value` is integer `(..., -1, 0, 1, 2, ...)` then return `true` */
  function int(value: unknown): value is number

  /** If `value` greater or equals to `0` and `value` is integer then return `true`. */
  function uint(value: unknown): value is number

  /** If `value` is float then return `true` */
  function float(value: unknown): value is number

  /** If `value` greater or equals to zero then return `true` */
  function unsigned(value: unknown): value is number

  /** If `value` greater than zero then return `true` */
  function positive(value: unknown): value is number

  /** If `value` less than zero then return `true` */
  function negative(value: unknown): value is number

  function finite(value: unknown): value is number
  function infinite(value: unknown): boolean
  function safeInt(value: unknown): value is number
  function nan(value: unknown): boolean

  // ES6 Features
  function symbol(value: unknown): value is Symbol
  function bigInt(value: unknown): value is BigInt
  function promise(value: unknown): value is Promise<unknown>
  function map(value: unknown): value is Map<unknown, unknown>
  function set(value: unknown): value is Set<unknown>

  // JS Features
  function error(value: unknown): value is Error

  // Unstandard Features
  function buffer(value: unknown): boolean

  // Uncategory Features
  function plainObj(value: unknown): boolean
  function zeroValue(value: unknown): value is (0 | null | undefined | void[] | {})
  function nonZeroValue(value: unknown): boolean

  // TypeOf 
  function any(
    exec: (value: unknown) => boolean,
    ...list: unknown[]
  ): boolean
}

export default is
