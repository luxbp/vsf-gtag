import createProductData from '../helper/createProductData';
import rootStore from '@vue-storefront/core/store'
import { KEY } from '../index';
import Vue from 'vue';

declare const dataLayer;

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith('recently-viewed/recently-viewed/ADD')) {
    Vue.prototype.$gtag.event('view_item', {
      'items': [createProductData(mutation.payload.product, {
        source: rootStore.state[KEY].source || null
      })]
    });
  }
})
