<template>
    <flow-chart
      :data="data"
      :chartLineOrientation="chartLineOrientation">
        <template v-slot:flowNodeBody="data">
          <div>
            <span>{{data.data.name}}</span>
            <span>
              sdljfwoeifww
            </span>
            <span>lksdjfoewifwew</span>
            <!-- <span>
              lksdjfoewifwe
            </span> -->
          </div>
        </template>
      </flow-chart>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FlowChart from './FlowChart2/FlowChart.vue'

var data = {
  name: '节点1',
  nextNode: {
    name: '节点2',
    nextNode: {
      name: '节点3',
      nextNode: {
        name: '节点4'
      }
    },
    childNodes: [{
      name: '节点2_1'
    }, {
      name: '节点2_2'
    }]
  },
  childNodes: [{
    name: '节点1_1',
    nextNode: {
      name: '节点1_2',
      nextNode: {
        name: '节点1_3'
      }
    }
  }, {
    name: '节点2_1',
    nextNode: {
      name: '节点2_2'
    }
  }, {
    name: '节点3_1'
  }]
}
@Component({
  components: {
    'flow-chart': FlowChart
  }
})

export default class TestFlowChart extends Vue {
  @Prop() private msg!: string;
  data () {
    return {
      data: data,
      // chartLineOrientation: 'horizontal'
      chartLineOrientation: 'verticality'
    }
  }
}
</script>
