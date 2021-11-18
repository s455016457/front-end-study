
<template>
  <lookup ref="lookup" :style="inputStyle">
    <template v-slot:dialogTitle>
      <slot name="dialogTitle"></slot>
    </template>
    <template v-slot:dialogBody>
      <ag-grid-vue
        :style="{width: '100%', height: gridHeight+ 'px' }"
        class="ag-theme-alpine"
        id="lookupGrid"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        :defaultColDef="gridOptions.defaultColDef"
        :defaultColGroupDef="gridOptions.defaultColGroupDef"
        :columnTypes="gridOptions.columnTypes"
        :enableRangeSelection="true"
        :singleClickEdit="true"
        :stopEditingWhenCellsLoseFocus="true"
        :rowSelection="rowSelection"
        :localeText="localeText"
        @rowDoubleClicked="handleRowDoubleClicked"
        :rowData="rowData"></ag-grid-vue>

        <!--
           :singleClickEdit="true" 启用单击编辑
           :stopEditingWhenCellsLoseFocus="true" 失去焦点停止编辑
         -->
    </template>
    <template v-slot:dialogFooter>
      <slot name="dialogFooter"></slot>
    </template>
  </lookup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import AG_GRID_LOCALE_CN from '@/ag-grid.locale.cn'
import { ColumnApi, GridApi, GridReadyEvent, RowDoubleClickedEvent } from 'ag-grid-community'
import Lookup from '@/components/Basic/BasicLookup.vue'

export default defineComponent({
  props: {
    columnDefs: [],
    gridHeight: {
      type: Number,
      default: 500
    },
    gridLoadUrl: {
      type: String,
      required: true,
      default: ''
    },
    inputWidth: {
      type: Number,
      default: 200
    },
    inputStyle: Object,
    defaultColDef: Object,
    defaultColGroupDef: Object,
    columnTypes: Object
  },
  emits: {
    onRowDoubleClicked: (params: RowDoubleClickedEvent) : boolean => {
      return params !== null
    }
  },
  setup () {
    const lookup = ref()

    return {
      lookup
    }
  },
  components: {
    Lookup,
    AgGridVue
  },
  data () {
    return {
      gridApi: new GridApi(),
      columnApi: new ColumnApi(),
      rowSelection: '',
      rowData: null,
      localeText: {},
      gridOptions: {
        defaultColDef: {
          flex: 1,
          minWidth: 100,
          filter: 'agTextColumnFilter',
          floatingFilter: true,
          // editable: true,
          resizable: true
        },
        defaultColGroupDef: {
          marryChildren: true
        },
        columnTypes: {
          numberColumn: {
            width: 130,
            filter: 'agNumberColumnFilter'
          },
          dateColumn: {
            filter: 'agDateColumnFilter',
            filterParams: {
              comparator: (filterLocalDateAtMidnight:Date, cellValue:string) => {
                var dateParts = cellValue.split('/')
                var day = Number(dateParts[0])
                var month = Number(dateParts[1]) - 1
                var year = Number(dateParts[2])
                var cellDate = new Date(year, month, day)
                if (cellDate < filterLocalDateAtMidnight) {
                  return -1
                } else if (cellDate > filterLocalDateAtMidnight) {
                  return 1
                } else {
                  return 0
                }
              }
            }
          }
        }
      }
    }
  },
  beforeMount () {
    this.rowSelection = 'multiple'
    this.localeText = AG_GRID_LOCALE_CN
    if (this.defaultColDef) {
      this.gridOptions.defaultColDef = this.defaultColDef as any
    }
    if (this.defaultColGroupDef) {
      this.gridOptions.defaultColGroupDef = this.defaultColGroupDef as any
    }
    if (this.columnTypes) {
      this.gridOptions.columnTypes = this.columnTypes as any
    }
  },
  methods: {
    onGridReady (params:GridReadyEvent) {
      this.gridApi = params.api
      this.columnApi = params.columnApi

      const updateData = (data: any) => {
        this.rowData = data
      }

      fetch(this.gridLoadUrl)
        .then((resp) => resp.json())
        .then((data) => updateData(data))
    },
    handleRowDoubleClicked (params: RowDoubleClickedEvent) {
      this.$emit('onRowDoubleClicked', params)
    },
    closeDialog () {
      if (this.lookup && this.lookup.close) {
        this.lookup.close()
      }
    },
    getSelectedRows () {
      return this.gridApi.getSelectedRows()
    },
    setValue (value: string) {
      if (this.lookup && this.lookup.setValue) {
        this.lookup.setValue(value)
      }
    },
    getValue () {
      if (this.lookup && this.lookup.getValue) {
        return this.lookup.getValue()
      }
    }
  }
})
</script>
