import rootStore from '@vue-storefront/core/store';
import { KEY } from '../index';

export default (product): string => {
  if (product.external_category) {
    return product.external_category
  }

  let currentCategory = null;
  if (rootStore.state.category) {
    currentCategory = rootStore.state.category.current || false;
    if (!product.category) {
      return currentCategory ? currentCategory.name : null
    }

    for (let category of product.category) {
      if (category.category_id === currentCategory.id) { // Not 'Wszystkie produkty'
        return category.name
      }
    }
  }

  return rootStore.state[KEY].source || null
}
