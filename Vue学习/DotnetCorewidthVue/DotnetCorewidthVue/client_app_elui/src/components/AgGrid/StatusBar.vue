<template>
  <ag-grid-vue
    style="width: 100%; height: 500px;"
    class="ag-theme-alpine-dark"
    id="myGrid"
    :columnDefs="columnDefs"
    @grid-ready="onGridReady"
    :defaultColDef="defaultColDef"
    :defaultColGroupDef="defaultColGroupDef"
    :columnTypes="columnTypes"
    :enableRangeSelection="true"
    :rowSelection="rowSelection"
    :statusBar="statusBar"
    :sideBar="sideBar"
    :localeText="localeText"
    :rowData="rowData"></ag-grid-vue>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import AG_GRID_LOCALE_CN from '@/ag-grid.locale.cn'
import { ColumnApi, GridApi, GridReadyEvent, SideBarDef, StatusPanelDef } from 'ag-grid-community'

class StatusBar implements StatusPanelDef {
}

class SideBar implements SideBarDef {}

export default defineComponent({
  components: {
    AgGridVue
  },
  data () {
    return {
      columnDefs: [
        { field: 'athlete', minWidth: 200 },
        { field: 'age', type: ['rightAligned', 'numberColumn'] },
        { field: 'country', enableRowGroup: true, minWidth: 200 },
        { field: 'year', enableRowGroup: true, type: ['numericColumn'] },
        { field: 'date', minWidth: 180, filter: 'agDateColumnFilter', type: ['dateColumn', 'nonEditableColumn'] },
        { field: 'sport', minWidth: 200 },
        {
          headerName: 'Medals',
          groupId: 'medalsGroup',
          children: [
            { field: 'gold', enableValue: true, type: ['rightAligned', 'numberColumn', 'medalColumn'] },
            { field: 'silver', enableValue: true, type: ['rightAligned', 'numberColumn', 'medalColumn'] },
            { field: 'bronze', enableValue: true, type: ['rightAligned', 'numberColumn', 'medalColumn'] },
            { field: 'total', enableValue: true, type: ['rightAligned', 'numberColumn'] }
          ]
        }
      ],
      gridApi: new GridApi(),
      columnApi: new ColumnApi(),
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        editable: true,
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
        medalColumn: {
          width: 100,
          columnGroupShow: 'open'
        },
        nonEditableColumn: {
          editable: false
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
      },
      rowSelection: '',
      statusBar: new StatusBar(),
      sideBar: new SideBar(),
      rowData: null,
      localeText: {}
    }
  },
  beforeMount () {
    this.rowSelection = 'multiple'
    this.localeText = AG_GRID_LOCALE_CN
    this.statusBar = {
      statusPanels: [
        { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
        { statusPanel: 'agTotalRowCountComponent', align: 'center' },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' }
      ]
    }
    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel'
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel'
        }
      ]
    }
  },
  methods: {
    onGridReady (params:GridReadyEvent) {
      this.gridApi = params.api
      this.columnApi = params.columnApi

      const updateData = (data:any) => {
        this.rowData = data
      }

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data))
    }
  }
})
</script>
