import rootStore from '@vue-storefront/core/store'
import {SET_SOURCE} from '../../store/mutation-types';
import {KEY} from '../../index';
import * as categoryTypes from '@vue-storefront/core/modules/catalog/store/category/mutation-types';

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const payload = mutation.payload;

  const setSource = source => rootStore.commit(KEY + '/' + SET_SOURCE, source);

  if (type.endsWith('ui/setSearchpanel') && payload) {
    setSource('Search')
  }

  if (type.endsWith('ui/setSearchpanel') && !payload) {
    setSource(store.state['vsf-gtag'].last_source)
  }

  if (type.endsWith('route/ROUTE_CHANGED')) {
    if (payload.to.path === '/') {
      setSource('Category Page')
    }
  }

  if (type.endsWith(categoryTypes.CATEGORY_UPD_CURRENT_CATEGORY)) {
    setSource('Category Page')
  }
})
