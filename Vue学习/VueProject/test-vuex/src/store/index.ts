import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import RootStateTypes, { AllStateTypes } from './interface'
import testModule from './modules/test'

export default createStore<RootStateTypes>({
  state: {
    test: 'testStore.state'
  },
  getters: {},
  mutations: {
  },
  actions: {
  },
  modules: {
    testModule
  }
})

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')

export function useStore<T = AllStateTypes> () {
  return baseUseStore<T>(key)
}
