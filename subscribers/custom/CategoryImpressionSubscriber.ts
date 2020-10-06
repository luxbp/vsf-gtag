import * as types from '@vue-storefront/core/modules/catalog/store/category/mutation-types';

declare const dataLayer;

/**
 * Category View
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith(types.CATEGORY_UPD_CURRENT_CATEGORY)) {
    dataLayer.push({
      event: 'categoryImpression',
      ecommerce: {
        impression: mutation.payload
      }
    })
  }
})
