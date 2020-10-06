import Vue from 'vue'
import {NOT_YET_IMPLEMENTED} from '../store/mutation-types';

declare const dataLayer;

/**
 * Order Placed
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith(NOT_YET_IMPLEMENTED)) {
    Vue.prototype.$gtag.event('begin_checkout', {
      'actionField': {'step': 1, 'option': 'Visa'},
      'products': [{
        'name': 'Triblend Android T-Shirt',
        'id': '12345',
        'price': '15.25',
        'brand': 'Google',
        'category': 'Apparel',
        'variant': 'Gray',
        'quantity': 1
      }]
    })
  }
})
