import Vue from 'vue'
import createProductData from '../helper/createProductData';
import rootStore from '@vue-storefront/core/store'

/**
 * Order Placed
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith('route/ROUTE_CHANGED')) {
    const data = mutation.payload.to;

    if (data.name !== 'checkout') return;

    let cart = rootStore.state.cart
    let totals = (cart.platformTotals || {})

    if (data.hash.length === 0) {
      setTimeout(() => {
        Vue.prototype.$gtag.event('begin_checkout', {
          'coupon': totals.coupon_code,
          'currency': totals.base_currency_code,
          'items': Object.assign([], cart.cartItems).map((product, index) => createProductData(product, { position: index })),
          'value': totals.subtotal - Math.abs((totals.base_discount_amount || 0))
        });
      }, 2000)
    }

    // when on order review submit payment info
    if (data.hash === '#orderReview') {
      Vue.prototype.$gtag.event('add_payment_info', {
        'coupon': totals.coupon_code,
        'currency': totals.base_currency_code,
        'items': Object.assign([], cart.cartItems).map((product, index) => createProductData(product, { position: index })),
        'value': totals.subtotal - Math.abs((totals.base_discount_amount || 0))
      });
    }

    // when on payment submit shipping selection
    if (data.hash === '#payment') {
      Vue.prototype.$gtag.event('add_shipping_info', {
        'coupon': totals.coupon_code,
        'currency': totals.base_currency_code,
        'items': Object.assign([], cart.cartItems).map((product, index) => createProductData(product, { position: index })),
        'value': totals.subtotal - Math.abs((totals.base_discount_amount || 0))
      });
    }
  }
})
