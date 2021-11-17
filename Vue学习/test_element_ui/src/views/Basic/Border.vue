<template>
  <div>
    <my-border />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import border from '@/components/Basic/Border.vue'

export default defineComponent({
  components: {
    'my-border': border
  }
})
</script>
