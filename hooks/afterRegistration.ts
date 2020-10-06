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

export function afterRegistration ({Vue, config, store, isServer}) {
  if (config.analytics.id && !isServer) {
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
  }
}
