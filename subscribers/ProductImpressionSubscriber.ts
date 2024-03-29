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
    let chunkSize = 50;
    let chunks = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      const chunk = products.slice(i, i + chunkSize);
      chunks.push(chunk);
    }

    let chunkMultiple = 0;
    chunks.forEach((chunk) => {
      chunkMultiple++;
      let chunkIndex = chunkSize * chunkMultiple;
      Vue.prototype.$gtag.event('view_item_list', {
        'items': chunk.map((product, index) => createProductData(product, {position: chunkIndex + index}))
      });
    })

  }
  // todo featured carousel impression
})
