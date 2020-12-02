import * as types from '@vue-storefront/core/modules/catalog/store/product/mutation-types';
import createProductData from '../helper/createProductData';
import rootStore from '@vue-storefront/core/store'
import {KEY} from '../index';
import Vue from 'vue';

/**
 * Product Interaction
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith(types.PRODUCT_SET_CURRENT)) {
    Vue.prototype.$gtag.event('select_content', {
      'content_type': 'product',
      'items': [createProductData(mutation.payload, {
        source: rootStore.state[KEY].source || null
      })]
    });
  }
})
