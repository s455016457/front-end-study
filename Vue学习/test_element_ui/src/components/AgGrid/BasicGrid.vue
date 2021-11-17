<template>
  <ag-grid-vue style="width: 640px; height: 260px;"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData">
  </ag-grid-vue>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'

export default defineComponent({
  components: {
    AgGridVue
  },
  setup () {
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
      ]
    }
  }
})
</script>
