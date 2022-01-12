<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ test }}
    <hr>
    <h2>Test Module</h2>
    {{ testModule.name }}
    {{ testModule.count }}
    <button @click="addCount">add count</button>
    <button @click="addCount2">add count2</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store, { useStore } from '@/store/index'

export default defineComponent({
  setup () {
    //
  },
  data () {
    var store = useStore()
    console.log(store)
    return {
      test: store.state.test,
      testModule: store.state.testModule
    }
  },
  methods: {
    addCount () {
      store.commit('testModule/ADD_COUNT')
    },
    addCount2 () {
      store.dispatch('testModule/addCount')
    }
  }
})
</script>
