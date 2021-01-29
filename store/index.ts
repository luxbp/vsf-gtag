import { Module } from 'vuex'
import GtagState from '../types/GtagState'
import { mutations } from './mutations'
import { state } from './state'

export const module: Module<GtagState, any> = {
  namespaced: true,
  mutations,
  state
};
