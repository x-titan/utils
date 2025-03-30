import { assign } from '../include.js'

/**
 * @param  {unknown} sources
 * @return {{} & sources}
 */
export default function mixin(...sources) {
  return assign({}, ...sources)
}
