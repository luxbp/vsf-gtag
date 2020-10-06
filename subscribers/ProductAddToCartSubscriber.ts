import createProductData from '../helper/createProductData';
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import Vue from 'vue';

declare const dataLayer;

/**
 * Product Interaction
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const currency = currentStoreView().i18n.currencyCode;
  if (type.endsWith('cart/cart/ADD')) { // todo replace with mutation type const
    Vue.prototype.$gtag.event('add_to_cart', {
      'items': [createProductData(mutation.payload.product)]
    });
  }
})
