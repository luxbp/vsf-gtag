import { afterRegistration } from './hooks/afterRegistration'
import { beforeRegistration } from './hooks/beforeRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { module } from './store'

export const KEY = 'vsf-gtag'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  beforeRegistration,
  afterRegistration,
  store: { modules: [{ key: KEY, module }] }
}

export const VsfGtag = new VueStorefrontModule(moduleConfig)
