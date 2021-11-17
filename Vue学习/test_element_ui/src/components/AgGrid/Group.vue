<template>
  <ag-grid-vue style="width: 640px; height: 260px;"
      class="ag-theme-alpine-dark"
      :columnDefs= "columnDefs"
      :rowData= "rowData"
      rowSelection="multiple"
      :autoGroupColumnDef= "autoGroupColumnDef"
      :rowAnimation= "true"
      :pagination= "true"
      @grid-ready= "onGridReady" >
  </ag-grid-vue>
  <!--
    rowSelection="multiple" 启用多行选择
    @grid-read="onGridReady" 绑定 grid-read 事件，获取 GridApi 和 ColumnApi
    :pagination= "true" 启用分页
   -->
   <button @click="getSelectedRows">Get Selected Rows</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community'

export default defineComponent({
  components: {
    AgGridVue
  },
  data () {
    return {
      columnDefs: [
        { field: 'make', sortable: true, filter: true, checkboxSelection: true /** 启用选择框 */, rowGroup: true /** 分组 */ },
        { field: 'model', sortable: true, filter: true },
        { field: 'price', sortable: true, filter: true }
      ],
      rowData: [],
      autoGroupColumnDef: { // 自动分组配置
        headerName: 'Model',
        field: 'model',
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
          checkbox: false
        }
      },
      gridApi: new GridApi(),
      columnApi: new ColumnApi()
    }
  },
  mounted () {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(remoteRowData => (this.rowData = remoteRowData))
  },
  methods: {
    getSelectedRows () {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ')
      alert(`Selected nodes: ${selectedDataStringPresentation}`)
    },
    onGridReady (params: GridReadyEvent) {
      this.gridApi = params.api
      this.columnApi = params.columnApi
      console.log('onGridReady', this.gridApi, this.columnApi, params.api, params.columnApi)
    }
  }
})
</script>
