<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    console.log('"app.vue')
  }
})
</script>

<style lang="scss">
  @import "~ag-grid-community/src/styles/ag-grid.scss";
  @import "~ag-grid-community/src/styles/ag-theme-alpine-dark/sass/ag-theme-alpine-dark.scss";
  @import "~ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine.scss";

html, body{
  height: 100%;
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
