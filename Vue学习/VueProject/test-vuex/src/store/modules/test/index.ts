import RootStateTypes from '@/store/interface'
import { Module } from 'vuex'
import TestModuleTypes from './interface'

const testModule: Module<TestModuleTypes, RootStateTypes> = {
  namespaced: process.env.NODE_ENV !== 'production',
  state: {
    name: 'test-module',
    count: 0
  },
  mutations: {
    ADD_COUNT (state) {
      state.count += 1
    }
  },
  actions: {
    addCount (): Promise<void> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.commit('testModule/ADD_COUNT')
          resolve()
        }, 1000)
      })
    }
  }
}

export default testModule
