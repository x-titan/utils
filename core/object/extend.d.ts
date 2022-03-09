declare function extend<T, U>(target: T, source: U): T & U
declare function extend<T, U, V>(target: T, source1: U, source2: V): T & U & V
declare function extend<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W
declare function extend<T, U, V, W, X>(target: T, source1: U, source2: V, source3: W, source4: X): T & U & V & W & X
declare function extend(target: any, ...sources: any[]): any
declare namespace extend {
  function pro<T, U>(target: T, source: U): T
  function pro<T, U, V>(target: T, source1: U, source2: V): T
  function pro<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T
  function pro<T, U, V, W, X>(target: T, source1: U, source2: V, source3: W, source4: X): T
  function pro(target: any, ...sources: any[]): any
  function _<T, U>(target: T, source: U): T
  function _<T, U, V>(target: T, source1: U, source2: V): T
  function _<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T
  function _<T, U, V, W, X>(target: T, source1: U, source2: V, source3: W, source4: X): T
  function _(target: any, ...sources: any[]): any
}
export default extend