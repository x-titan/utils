interface Class<T = unknown> {
  new(...args: any[]): T
}

/**
 * Сhecks whether this item is in the list and returns the result.
 * After checking, it is added to the list.
 *
 * If the item is in the list returns `false`. So it's okay.
 *
 * Else `true`. This means that the item is present in the list.
 */
export default class Mono {
  constructor(onerror: ?() => throw)
  /**
   * Сhecks whether this item is in the list and returns the result.
   * After checking, it is added to the list.
   *
   * If the item is in the list returns `false`. So it's okay.
   *
   * Else `true`. This means that the item is present in the list.
   * @throws {Error}
   */
  static mixin<T>(target: T, onerror: ?() => throw): T
  static extend<T>(target: Class<T>, onerror: ?() => throw): Class<T>
  static has<T>(target: Class<T>): boolean
}
