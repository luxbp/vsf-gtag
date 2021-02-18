import createProductData from '../helper/createProductData';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import Vue from 'vue';
import { ORDER_LAST_ORDER_WITH_CONFIRMATION } from '@vue-storefront/core/modules/order/store/mutation-types'

/**
 * Order Placed
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const payload = mutation.payload;

  if (type.endsWith(ORDER_LAST_ORDER_WITH_CONFIRMATION)) {
    const cartHistory = Object.assign({}, state.cart);
    const orderId = payload.confirmation.backendOrderId;
    const products = payload.order.products.map((product, index) => createProductData(product, { position: index }));
    store.dispatch(
      'user/getOrdersHistory',
      { refresh: true, useCache: false }
    ).then(() => {
      const orderHistory = state.user.orders_history;

      // in the event this is empty, tag manager should pull order and tax from CartStateSubscriber
      if (!orderHistory && cartHistory.platformTotals) {
        Vue.prototype.$gtag.event('purchase', {
          'transaction_id': payload.confirmation.orderNumber || orderId,
          'value': cartHistory.platformTotals.subtotal - Math.abs((cartHistory.platformTotals.base_discount_amount || 0)),
          'affiliation': payload.order.affiliation || currentStoreView().storeCode,
          'currency': 'USD',
          'tax': cartHistory.platformTotals.tax_amount,
          'shipping': cartHistory.platformTotals.shipping_amount,
          'coupon': cartHistory.platformTotals.coupon_code,
          'items': products
        });
        return;
      }

      const order = orderHistory.items.find((order) => (order['entity_id'] || '').toString() === orderId);
      if (order) {
        Vue.prototype.$gtag.event('purchase', {
          'transaction_id': payload.confirmation.orderNumber || orderId,
          'affiliation': payload.order.affiliation || currentStoreView().storeCode || order.store_name,
          'value': order.subtotal - Math.abs((order.base_discount_amount || 0)),
          'currency': 'USD',
          'tax': order.tax_amount,
          'shipping': order.shipping_amount,
          'coupon': order.coupon_code,
          'items': products
        });
      }
    })
  }
})
