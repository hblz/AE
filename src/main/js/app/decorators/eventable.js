
/**
 * @module eventemitter decorator
 * @author vnot <weinotme@gmail.com>
 */

import EventEmitter from 'eventemitter2';

/**
 * add EventEmitter capacity to the given class
 * @param classz
 */
export default function eventable(classz) {
  Object.assign(classz.prototype, EventEmitter.prototype);
}

