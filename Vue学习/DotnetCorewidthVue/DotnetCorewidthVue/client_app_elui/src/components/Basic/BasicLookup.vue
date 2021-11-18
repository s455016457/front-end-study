<template>
  <el-input v-model="value" :style="style" :input-style="inputStyle">
    <template #append>
      <el-button size="mini" @click="clickOpen">
        <el-icon><more-filled /></el-icon>
      </el-button>
    </template>
  </el-input>

  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    :width="dialogWidth"
    :show-close="dialogShowClose"
    :before-close="handleDialogClose"
    :center="dialogCenter"
    destroy-on-close
    @open="handleDialogOpen"
  >
    <template v-slot:title>
      <slot name="dialogTitle"></slot>
    </template>
    <slot name="dialogBody"></slot>
    <template v-slot:footer>
      <slot name="dialogFooter"></slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MoreFilled } from '@element-plus/icons'

export default defineComponent({
  components: {
    MoreFilled
  },
  data () {
    return {
      value: '',
      dialogVisible: false
    }
  },
  props: {
    width: Number,
    inputStyle: Object,
    style: Object,
    dialogTitle: String,
    dialogWidth: [String, Number],
    dialogShowClose: {
      type: Boolean,
      default: false
    },
    dialogCenter: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickOpen () {
      this.dialogVisible = true
    },
    handleDialogOpen () {
      console.log('handleDialogOpen', this.value)
      this.$emit('onDialogOpen', this.value)
    },
    handleDialogClose (done: () => void) {
      done()
      this.$emit('onDialogClose')
    },
    close () {
      console.log(this.dialogVisible)
      this.dialogVisible = false
    },
    setValue (value: string) {
      this.value = value
    },
    getValue () {
      return this.value
    }
  },
  setup () {
    //
  }
})
</script>

<style lang="scss" scoped>

</style>
