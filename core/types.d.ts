export interface Class<T = unknown> {
  new(...args: any[]): T;
}
export declare const enum TypeName {
  null = "null",
  boolean = "boolean",
  undefined = "undefined",
  string = "string",
  number = "number",
  symbol = "symbol",
  Function = "Function",
  Array = "Array",
  Object = "Object"
}
// declare function is(value: unknown): TypeName;
declare namespace is {
  function empty(value: unknown): value is undefined | null
  function undefined(value: unknown): value is undefined
  function null_(value: unknown): value is null
  function nonZeroValue(value: unknown): boolean
  function num(value: unknown): value is number
  function str(value: unknown): value is string
  function func(value: unknown): value is Function
  function bool(value: unknown): value is boolean
  function symbol(value: unknown): value is Symbol
  function obj(value: unknown): value is Object
  function class_(value: unknown): value is Class<unknown>
  /** @deprecated {0.0.4} */
  function notClass(value: unknown): boolean
  function plainObj(value: unknown): boolean
  function array(value: any): value is any[]
  function arrayLike(value: any): value is any[]
  function iterable(value: unknown): value is Iterable
  function nan(value: unknown): boolean
  function NaN(value: unknown): boolean
  function int(value: unknown): value is number
  function safeInt(value: unknown): value is number
  function infinite(value: unknown): boolean
}
export default is