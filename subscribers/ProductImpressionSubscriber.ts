import {currentStoreView} from '@vue-storefront/core/lib/multistore'
import createProductData from '../helper/createProductData';
import {
  CATALOG_UPD_PRODUCTS,
  CATALOG_UPD_RELATED
} from '@vue-storefront/core/modules/catalog/store/product/mutation-types';
import Vue from 'vue';


export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const payload = mutation.payload;
  if (type.endsWith(CATALOG_UPD_RELATED)) { // Related Products
    let products = payload.items || [];
    Vue.prototype.$gtag.event('view_item_list', {
      'items': products.map((product, index) => createProductData(product, {position: index}))
    });
  }

  if (type.endsWith(CATALOG_UPD_PRODUCTS)) { // Category Pages
    let products = payload.products.items || [];
    Vue.prototype.$gtag.event('view_item_list', {
      'items': products.map((product, index) => createProductData(product, {position: index}))
    });
  }
  // todo featured carousel impression
})
