import RouteChangeSubscriber from '../subscribers/custom/RouteChangeSubscriber';
import ProductAddToCartSubscriber from '../subscribers/ProductAddToCartSubscriber';
import ProductRemoveFromCartSubscriber from '../subscribers/ProductRemoveFromCartSubscriber';
import ProductDetailSubscriber from '../subscribers/ProductDetailsSubscriber';
import TransactionSubscriber from '../subscribers/TransactionSubscriber';
import ProductClickSubscriber from '../subscribers/ProductClickSubscriber';
import SourceSubscriber from '../subscribers/custom/SourceSubscriber';
import ProductImpressionSubscriber from '../subscribers/ProductImpressionSubscriber';
import PromotionImpression from '../subscribers/PromotionImpression';
import PromotionClicks from '../subscribers/PromotionClicks';
import CategoryImpressionSubscriber from '../subscribers/custom/CategoryImpressionSubscriber';
import CheckoutFunnelSubscriber from '../subscribers/CheckoutFunnelSubscriber';
import CartStateSubscriber from '../subscribers/custom/CartStateSubscriber';
import { isServer } from '@vue-storefront/core/helpers';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import Vue from 'vue';

declare const window;

function applyClientId (product) {
  window.ga = window.ga || function (func) {};
  window.ga((tracker) => {
    let clientId = tracker.get('clientId');
    let prod = product.product;
    prod.product_option = prod.product_option || {};
    prod.product_option.extension_attributes = prod.product_option.extension_attributes || {};
    prod.product_option.extension_attributes.ga_client_id = clientId
  })
}

export function afterRegistration (appConfig, store) {
  if (appConfig.analytics && appConfig.analytics.id && !isServer) {
    const view = currentStoreView();

    Vue.prototype.$gtag.customMap({ 'dimension1': 'Store Code' });
    Vue.prototype.$gtag.event('store_code_dimension', { 'Store Code': view.storeCode });

    let subscribers = [
      RouteChangeSubscriber,
      CategoryImpressionSubscriber,
      ProductImpressionSubscriber,
      ProductClickSubscriber,
      ProductDetailSubscriber,
      CartStateSubscriber,
      ProductAddToCartSubscriber,
      ProductRemoveFromCartSubscriber,
      CheckoutFunnelSubscriber,
      TransactionSubscriber,
      SourceSubscriber,
      PromotionImpression,
      PromotionClicks
    ];

    subscribers.map(register => register(store));

    EventBus.$on('cart-before-add', product => {
      applyClientId(product)
    });

    EventBus.$on('cart-before-update', product => {
      applyClientId(product)
    })
  }
}
