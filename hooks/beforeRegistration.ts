import Vue from 'vue'
import { router } from '@vue-storefront/core/app'
import VueGtag from 'vue-gtag';
import VueGtm from 'vue-gtm';
import { Logger } from '@vue-storefront/core/lib/logger'
import { once, isServer } from '@vue-storefront/core/helpers'

export function beforeRegistration (appConfig, store) {
  if (appConfig.analytics.id && !isServer) {
    once('__VUE_GTAG_VSF__', () => {
      Vue.use(VueGtag, {
        config: {
          id: appConfig.analytics.id,
          appName: 'Storefront',
          pageTrackerScreenviewEnabled: true
        }
      }, router);
    })
  } else {
    Logger.warn(
      'GTag extension is not working. Ensure Google Analytics account ID is defined in config',
      'GA'
    )()
  }

  if (appConfig.googleTagManager.id && !isServer) {
    once('__VUE_GTM_VSF__', () => {
      Vue.use(VueGtm, {
        id: appConfig.googleTagManager.id,
        enabled: true,
        debug: appConfig.googleTagManager.debug,
        vueRouter: router
      });
    });
  } else {
    Logger.warn('Google Tag Manager extensions is not working. Ensure Google Tag Manager container ID is defined in config', 'GTM')()
  }
}
