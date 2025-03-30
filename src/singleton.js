export default class Singleton {
  constructor() {
    if (new.target.__singleton__) {
      return new.target.__singleton__
    }
    new.target.__singleton__ = this
  }

  /**
   * @type {Singleton}
   * @private
   */
  static __singleton__
}
