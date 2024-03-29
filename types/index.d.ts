interface Class<T = unknown> {
  new(...args: any[]): T
}

export declare namespace is {
  function empty(value: unknown): value is undefined | null
  function null_(value: unknown): value is null
  function undefined(value: unknown): value is undefined
  function defined(value: unknown): value is any
  function nonZeroValue(value: unknown): boolean

  function num(value: unknown): value is number
  function str(value: unknown): value is string
  function bool(value: unknown): value is boolean
  function symbol(value: unknown): value is Symbol
  
  function func(value: unknown): value is Function
  function genFunc(value: unknown): value is GeneratorFunction
  function asyncFunc(value: unknown): value is Promise<unknown>
  
  function obj(value: unknown): value is Object
  function plainObj(value: unknown): boolean
  function args(value: unknown): boolean
  function extensible(value: unknown): boolean
  function class_(value: unknown): value is Class<unknown>
  function error(value: unknown): value is Error
  
  /**
   * If `value` is integer (..., -1, 0, 1, 2, ...) return `true`
   * @param value unknown
   */
  function int(value: unknown): value is number
  /**
   * Return sign of `value`.
   * If `value` greater or equals to zero return `true` and `value` is integer.
   * 
   * Return `(value >= 0) && ((value % 1) === 0)`
   * @param value unknown
   */
  function uint(value: unknown): value is number
  /**
   * If `value` is non-integer (..., -1, 0, 1, 2, ...) return `true`
   * @param value unknown
   */
  function float(value: unknown): value is number
  /**
   * Return sign of `value`.
   * If `value` greater or equals to zero return `true`
   * 
   * Return `value >= 0`
   * @param value unknown
   */
  function unsigned(value: unknown): value is number
  /**
   * Return sign of `value`.
   * If `value` greater than zero return `true`
   * 
   * Return `value > 0`
   * @param value unknown
   */
  function positive(value: unknown): value is number
  /**
   * Return sign of `value`.
   * If `value` less than zero return `true`
   * 
   * Return `value < 0`
   * @param value unknown
   */
  function negative(value: unknown): value is number
  function finite(value: unknown): value is number
  function infinite(value: unknown): boolean
  function safeInt(value: unknown): value is number
  function nan(value: unknown): boolean
  
  function arr<T>(value: unknown): value is T[]
  function array<T>(value: unknown): value is T[]
  function arrayLike<T>(value: unknown): value is T[]
  function iterable<T>(value: unknown): value is Iterable<T>
  function extensible(value: unknown): boolean
  /**
   * Like `is.extensible(value)`
   * @param value unknown
   */
  function ext(value: unknown): boolean
  
  function makeValidator(
    exec: (value: unknown) => boolean,
    onerror: (value: unknown, exec: Function) => TypeError
  ): (value: unknown) => TypeError
  
  function any(
    exec: (value: unknown) => boolean,
    ...list: unknown[]
  ): boolean
}
