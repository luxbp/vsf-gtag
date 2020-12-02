import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { afterRegistration } from './hooks/afterRegistration';
import { beforeRegistration } from './hooks/beforeRegistration';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { module } from './store';

export const KEY = 'vsf-gtag'

export const GtagModule: StorefrontModule = function ({ store, router, appConfig }) {
  StorageManager.init(KEY)
  beforeRegistration(appConfig, store)
  afterRegistration(appConfig, store)
  store.registerModule(KEY, module)
}
