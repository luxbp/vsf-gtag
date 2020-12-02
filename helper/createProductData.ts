import createProductCategoryName from './createProductCategoryName';
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default (product, opts: Record<string, any> = {}) => {
  const view = currentStoreView();
  return {
    name: product.name,
    id: product.sku,
    price: product.priceInclTax,
    brand: product.brand || view.storeCode,
    category: createProductCategoryName(product),
    list_name: opts.source,
    variant: product.sku.split('-')[1],
    quantity: product.qty || opts.qty,
    list_position: opts.position || 1
  }
}
