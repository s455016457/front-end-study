<template>
  <el-row class="buttons">
    <span>顶部固定行：</span>
    <el-select
      v-model="rowTopCount"
      placeholder="请选择"
      @change="onPinnedRowTopCount"
    >
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>

    <span>底部固定行：</span>
    <el-select
      v-model="rowBottomCount"
      placeholder="请选择"
      @change="onPinnedRowBottomCount"
    >
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
  </el-row>

  <ag-grid-vue
    class="ag-theme-alpine-dark ag-grid-vue"
    :columnDefs="ColumnDefs"
    @grid-ready="onGridReady"
    :defaultColDef="defaultColDef"
    :rowData="rowData"
    :getRowStyle="getRowStyle"
    :pinnedTopRowData="pinnedTopRowData"
    :pinnedBottomRowData="pinnedBottomRowData"
    :localeText="localeText"
    :animateRows="true"
    :rowDragManaged="true"
  >
  </ag-grid-vue>
  <!-- :pinnedTopRowData="pinnedTopRowData" 顶部冻结行 -->
  <!-- :pinnedBottomRowData="pinnedBottomRowData" 底部冻结行 -->
</template>

<script lang="ts">
import AG_GRID_LOCALE_CN from '@/ag-grid.locale.cn'
import { CellRendererSelectorResult, ColumnApi, GridApi, GridReadyEvent, ICellRendererParams, RowClassParams } from 'ag-grid-community'
import { defineComponent } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import CustomPinnedRowRenderer from '@/components/AgGrid/CustomPinnedRowRendererVue.vue'

export default defineComponent({
  components: {
    AgGridVue,
    // eslint-disable-next-line vue/no-unused-components
    customPinnedRowRenderer: CustomPinnedRowRenderer
  },
  data () {
    return {
      options: [0, 1, 2, 3, 4],
      ColumnDefs: [
        {
          field: 'athlete',
          cellRendererSelector: athleteCellRendererSelector
        },
        {
          field: 'age',
          cellRendererSelector: (params: ICellRendererParams) => {
            if (params.node.rowPinned) {
              return {
                component: 'customPinnedRowRenderer',
                params: { style: { 'font-style': 'italic' } }
              }
            } else {
              return undefined
            }
          }
        },
        { field: 'country', rowDrag: true },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' }
      ],
      rowData: new Array<Record<string, unknown>>(),
      defaultColDef: {
        width: 200,
        sortable: true,
        filter: true,
        resizable: true
      },
      getRowStyle: (params: RowClassParams) => {
        if (params.node.rowPinned) {
          return { 'font-weight': 'bold' }
        }
      },
      pinnedTopRowData: new Array<Record<string, unknown>>(),
      pinnedBottomRowData: new Array<Record<string, unknown>>(),
      gridApi: new GridApi(),
      gridColumnApi: new ColumnApi(),
      localeText: {},
      rowTopCount: 1,
      rowBottomCount: 1
    }
  },
  beforeMount () {
    this.localeText = AG_GRID_LOCALE_CN
    this.pinnedTopRowData = createPinnedData(this.rowTopCount, 'Top')
    this.pinnedBottomRowData = createPinnedData(this.rowBottomCount, 'Bottom')
  },
  methods: {
    onPinnedRowTopCount (value :number) {
      var rows = createPinnedData(value, 'Top')
      this.gridApi.setPinnedTopRowData(rows)
    },
    onPinnedRowBottomCount (value :number) {
      console.log('onPinnedRowBottomCount', value)
      var rows = createPinnedData(value, 'Bottom')
      this.gridApi.setPinnedBottomRowData(rows)
    },
    onGridReady (params:GridReadyEvent) {
      console.log('onGridReady')
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi

      const updateData = (data:any) => {
        console.log('updateData', data)
        this.rowData = data
      }

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data))
    }
  }
})

const createPinnedData = (count:number, prefix:string): Array<Record<string, string>> => {
  var result = new Array<Record<string, string>>()
  for (var i = 0; i < count; i++) {
    result.push({
      athlete: prefix + ' Athlete ' + i,
      age: prefix + ' Age ' + i,
      country: prefix + ' Country ' + i,
      year: prefix + ' Year ' + i,
      date: prefix + ' Date ' + i,
      sport: prefix + ' Sport ' + i
    })
  }
  return result
}

const athleteCellRendererSelector = (params: ICellRendererParams): CellRendererSelectorResult|undefined => {
  if (params.node.rowPinned) {
    return {
      component: 'customPinnedRowRenderer',
      params: { style: { color: 'blue' } }
    }
  } else {
    return undefined
  }
}
</script>

<style lang="scss" scoped>
$buttonsHeight: 40px;

.buttons{
  height: $buttonsHeight;
}
.ag-grid-vue{
  height: 520px;
  width: 100%;
}
</style>
