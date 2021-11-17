<template>
  <h1>状态栏</h1>
  <status-bar />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StatusBar from '@/components/AgGrid/StatusBar.vue'

export default defineComponent({
  components: {
    StatusBar
  }
})
</script>
