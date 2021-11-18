<template>
<div class="main">
  <div class="header">
    <h1>固定行</h1>
  </div>
  <div class="body">
    <pinned-row />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pinnedRow from '@/components/AgGrid/RowPinning.vue'

export default defineComponent({
  components: {
    pinnedRow
  }
})
</script>

<style lang="scss" scoped>
$headerHight: 60px;
.main{
  height: 100%;
}
.header{
  height: $headerHight;
}

.body{
  height: calc(100% - $headerHight);
  width: 100%;
}

h1{
  margin: 0px;
}
</style>
