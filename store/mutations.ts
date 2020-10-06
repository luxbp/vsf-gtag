import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import GtagState from '../types/GtagState';

export const mutations: MutationTree<GtagState> = {
  [types.SET_STATUS] (state, status) {
    state.registered = status
  },
  [types.SET_SOURCE] (state, source) {
    state.last_source = state.source;
    state.source = source
  },
  [types.SET_UNSUBSCRIBERS] (state, unsubscribers) {
    state.unsubscribers = unsubscribers
  }
};
