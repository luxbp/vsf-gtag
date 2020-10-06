import createProductData from '../helper/createProductData';
import Vue from 'vue';

/**
 * Product Interaction
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith('cart/cart/DEL')) { // todo replace with mutation type const
    Vue.prototype.$gtag.event('remove_from_cart', {
      'items': [createProductData(mutation.payload.product)]
    });
  }
})
