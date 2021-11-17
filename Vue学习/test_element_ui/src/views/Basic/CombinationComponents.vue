<template>
  <h1>组合组件</h1>
  <hr>
  <h2>输入框弹出窗基组件</h2>
  <lookup
    placeholder="请输入"
    dialogTitle="这是个弹出窗口"
    :style="{ width: '200px' }"
    @onDialogOpen="onDialogOpen"
  >
    <template v-slot:dialogTitle>
      <h2>这里是dialog头</h2>
    </template>
    <template v-slot:dialogBody>
      <div style="width:100%; height:400px;">
        <el-scrollbar>
          <span>
            这里是Body
          </span>
          <br><br><br><br><br><br><br><br><br><br><br><br>
          <span>这里还是Body1</span>
          <br><br><br><br><br><br><br><br><br><br><br><br>
          <span>这里还是Body2</span>
          <br><br><br><br><br><br><br><br><br><br><br><br>
          <span>这里还是Body3</span>
        </el-scrollbar>
      </div>
    </template>
    <template v-slot:dialogFooter>
      <h3>这里是footer</h3>
    </template>
  </lookup>

  <div>
    <grid-lookup
      ref="gridLookup"
      :columnDefs="columnDefs"
      :gridLoadUrl="gridLoadUrl"
      dialogTitle="请选择"
      :inputStyle="{ width: '200px' }"
      @onRowDoubleClicked="onRowDoubleClicked"
    >
    <template v-slot:dialogFooter>
      <el-button
        type="success"
        @click="onSelectedRows"
      >
        <el-icon><Check /></el-icon>
        确认选择
      </el-button>
    </template>
    </grid-lookup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Lookup from '@/components/Basic/BasicLookup.vue'
import GridLookup from '@/components/Basic/GridLookup.vue'
import { RowDoubleClickedEvent } from 'ag-grid-community'
import { Check } from '@element-plus/icons'

export default defineComponent({
  components: {
    Lookup,
    GridLookup,
    Check
  },
  data () {
    return {
      columnDefs: [
        { field: 'athlete', minWidth: 180, pinned: 'left', checkboxSelection: true /** 启用选择框 */ },
        { field: 'age', type: ['numericColumn'] },
        { field: 'country', minWidth: 140 },
        { field: 'year', type: ['numericColumn'] },
        { field: 'date', minWidth: 160, filter: 'agDateColumnFilter' },
        { field: 'sport', minWidth: 160 },
        { field: 'gold', editable: true, type: ['numericColumn', 'numberColumn'] },
        { field: 'silver', editable: true, type: ['numericColumn', 'numberColumn'] },
        { field: 'bronze', editable: true, type: ['numericColumn', 'numberColumn'] },
        { field: 'total', editable: true, type: ['numericColumn', 'numberColumn'], pinned: 'right' }
      ],
      gridLoadUrl: 'https://www.ag-grid.com/example-assets/olympic-winners.json'
    }
  },
  methods: {
    onDialogOpen (value:string) {
      console.log('onDialogOpen is click', value)
    },
    onRowDoubleClicked (params: RowDoubleClickedEvent) {
      console.log('onRowDoubleClicked', params)
      if (this.gridLookup && this.gridLookup.closeDialog) {
        this.gridLookup.closeDialog()
      }
    },
    onSelectedRows () {
      if (this.gridLookup && this.gridLookup.getSelectedRows) {
        var rows = this.gridLookup.getSelectedRows()
        console.log('onSelectedRows', rows)
        if (rows && rows.length) {
          if (this.gridLookup.closeDialog) {
            this.gridLookup.closeDialog()
          }
        }
      }
    }
  },
  setup () {
    const gridLookup = ref()
    return { gridLookup }
  }
})
</script>
