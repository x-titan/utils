import { assign } from '../include.js'

/**
 * @param {unknown} obj
 * @param  {...unknown} sources
 * @return {{} & obj & ...sources}
 */
export default function mixin(obj, ...sources) {
  return assign({}, obj, ...sources)
}
