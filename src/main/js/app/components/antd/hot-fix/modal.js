/**
 * Modal destroy hot fix
 * @param origin
 */

import ReactOwner from 'react/lib/ReactOwner'
import invariant from 'fbjs/lib/invariant'

ReactOwner.removeComponentAsRefFrom = function (component, ref, owner) {
  !ReactOwner.isValidOwner(owner) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might ' + 'be removing a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : undefined;
  // Check that `component` is still the current ref because we do not want to
  // detach the ref if another component stole it.
  if (owner.getPublicInstance() && owner.getPublicInstance().refs[ref] === component.getPublicInstance()) {
    owner.detachRef(ref);
  }
};
