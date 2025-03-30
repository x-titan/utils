"use strict"

export default function inherit(Child, Parent, proto) {
  Child.prototype.__proto__ = Parent.prototype
  Child.__proto__ = Parent

  if (proto != null) {
    Object.assign(Child.prototype, proto)
  }
  return inherit.createSuper(Parent)
}

/**
 * @template P
 * @param {new P} Parent
 * @return { <T>(target: T, ...args: unknown[]) => T & P }
 */
inherit.createSuper = function (Parent) {
  return function (target, ...args) {
    return Object.assign(target, new Parent(...args))
  }
}
