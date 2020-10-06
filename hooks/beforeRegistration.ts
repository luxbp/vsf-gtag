import { router } from '@vue-storefront/core/app'
import VueGtag from 'vue-gtag';
import VueGtm from 'vue-gtm';
import { Logger } from '@vue-storefront/core/lib/logger'
import { once } from '@vue-storefront/core/helpers'

export function beforeRegistration ({ Vue, config, store, isServer }) {
  if (config.analytics.id && !isServer) {
    once('__VUE_GTAG_VSF__', () => {
      Vue.use(VueGtag, {
        config: {id: config.analytics.id}
      });
    })
  } else {
    Logger.warn(
      'GTag extension is not working. Ensure Google Analytics account ID is defined in config',
      'GA'
    )()
  }

  if (config.googleTagManager.id && !isServer) {
    once('__VUE_GTM_VSF__', () => {
      Vue.use(VueGtm, {
        id: config.googleTagManager.id,
        enabled: true,
        debug: config.googleTagManager.debug,
        vueRouter: router
      });
    });
  } else {
    Logger.warn('Google Tag Manager extensions is not working. Ensure Google Tag Manager container ID is defined in config', 'GTM')()
  }
}
