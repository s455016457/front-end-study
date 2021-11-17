/**
 * 自定义冻结航渲染
 */

 <template>
   <span :style="params.style">{{ params.value }}</span>
 </template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    params: Object
  }
})
</script>
