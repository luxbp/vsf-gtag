import createProductData from '../../helper/createProductData';
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

declare const dataLayer;

/**
 * Product Interaction
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const payload = mutation.payload;
  const currency = currentStoreView().i18n.currencyCode;
  if (type.endsWith('cart/cart/UPD_TOTALS') && payload) { // todo replace with mutation type const
    let items = store.getters['cart/getCartItems']
    dataLayer.push({
      'event': 'cartUpdate',
      'cartState': {
        'currencyCode': currency,
        'products': items.map((product, index) => createProductData(product, {position: index})),
        'totals': store.getters['cart/getTotals']
      }
    });
  }
})
