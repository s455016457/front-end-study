<template>
  <ag-grid-vue style="width: 640px; height: 260px;"
      class="ag-theme-alpine"
      @grid-ready="onGridReady"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :multiSortKey="multiSortKey"
      :animateRows="animateRows">
  </ag-grid-vue>
  <!--
    :multiSortKey="multiSortKey" 定义多列排序
    :animateRows="animateRows" 排序动画
     -->
  <button @click="saveColumnState">保存列状态</button>
  <button @click="restoreColumnState">恢复列状态</button>
  <button @click="resetColumnState">重置列状态</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { ColumnApi, ColumnState, GridApi, GridReadyEvent } from 'ag-grid-community'

export default defineComponent({
  components: {
    AgGridVue
  },
  data () {
    return {
      columnDefs: [
        { headerName: 'Make', field: 'make', sortable: true, filter: true },
        { headerName: 'Model', field: 'model', sortable: true, filter: true },
        { headerName: 'Price', field: 'price', sortable: true, filter: true }
      ],
      rowData: [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
      ],
      gridColumnApi: new ColumnApi(),
      gridApi: new GridApi(),
      columnState: Array<ColumnState>(),
      multiSortKey: 'ctrl', // 列排序键
      animateRows: true
    }
  },
  methods: {
    saveColumnState () {
      const state = this.gridColumnApi.getColumnState()
      this.columnState = state
    },
    restoreColumnState () {
      if (!this.columnState || this.columnState.length === 1) {
        console.log('no columns state to restore by, you must save state first')
        return
      }
      this.gridColumnApi.applyColumnState({
        state: this.columnState,
        applyOrder: true
      })
    },
    resetColumnState () {
      this.gridColumnApi.resetColumnState()
    },
    onGridReady (params:GridReadyEvent) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
    }
  }
})
</script>
