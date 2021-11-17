
<template>
  <h2>列状态</h2>
  <ul>
    <li><code>columnApi.getColumnState()</code> 获取列状态</li>
    <li><code>columnApi.applyColumnState()</code> 应用列状态</li>
    <li><code>columnApi.resetColumnState()</code> 重置列状态</li>
  </ul>
  <column-state />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnState from '@/components/AgGrid/ColumnState.vue'

export default defineComponent({
  components: {
    ColumnState
  }
})
</script>
