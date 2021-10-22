
<template>
    <div ref="flowChart" v-resize="onresize" class="flow-chart" :class="{'flow-chart-verticality':isVerticality}">
        <flow-node
          :data="data"
          :node-orientation="chartLineOrientation">
            <template v-slot:body="data">
                <slot name="flowNodeBody" :data="data.data"></slot>
            </template>
        </flow-node>
        <svg :style="{width:flowChart.svg.width, height: flowChart.svg.height}">
            <connecting-line v-for="point in flowChart.connectingLinePoints" :key="point.key" :stats="point"></connecting-line>
        </svg>
    </div>
</template>
<style>
    .flow-chart {
        display: flex;
        position: relative;
    }

    .flow-chart-multi-line{
        flex-wrap: nowrap;
    }

    .flow-chart-verticality{
        flex-direction: column;
        align-content: center;
        justify-content: center;
        align-items: center;
    }

    svg {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import FlowNode from './FlowNode.vue'
import ConnectionLine from './ConnectionLine.vue'
export default Vue.extend({
  props: {
    data: Object,
    chartLineOrientation: String// 图表方向 "horizontal" 或 "verticality"
  },
  data () {
    return {
      flowChart: {
        data: this.data,
        connectingLinePoints: [],
        chartLineOrientation: this.chartLineOrientation,
        svg: {
          width: '100%',
          height: '100%'
        }
      }
    }
  },
  components: {
    'flow-node': FlowNode,
    'connecting-line': ConnectionLine
  },
  mounted () {
    this.$nextTick(function () {
      // 仅在整个视图都被渲染之后才会运行的代码

      const $flowChart = this.$refs.flowChart

      this.flowChart.svg.width = $flowChart.scrollWidth + 'px'
      this.flowChart.svg.height = $flowChart.scrollheight + 'px'
      console.log('mounted', this, this.$children)

      // let maxX = 0
      // let maxY = 0
      // for (var i = 0; i < this.flowChart.connectingLinePoints.length; i++) {
      //   var points = this.flowChart.connectingLinePoints[i]
      //   if (points.endPoint.X > maxX) {
      //     maxX = points.endPoint.X
      //   }
      //   if (points.beginPoint.X > maxX) {
      //     maxX = points.beginPoint.X
      //   }
      //   if (points.endPoint.Y > maxY) {
      //     maxY = points.endPoint.Y
      //   }
      //   if (points.beginPoint.Y > maxY) {
      //     maxY = points.beginPoint.Y
      //   }
      // }

      // if (maxX > 0) {
      //   this.flowChart.svg.width = maxX + 20 + 'px'
      // }
      // if (maxY > 0) {
      //   this.flowChart.svg.height = maxY + 20 + 'px'
      // }
    })
  },
  computed: {
    isVerticality () {
      return this.flowChart.chartLineOrientation === 'verticality'
    },
    isHorizontal () {
      return this.flowChart.chartLineOrientation === 'horizontal'
    }
  },
  methods: {
    saveChildNodePoint (params) {
      if (!this.flowChart.connectingLinePoints) return
      if (params.prefixNode) {
        if (this.isHorizontal) {
          this.flowChart.connectingLinePoints.push({
            key: params.prefixNode.data.name + '=>' + params.data.name,
            beginPoint: params.prefixNode.nodeContent.connectingAnchorPoint.right,
            endPoint: params.nodeContent.connectingAnchorPoint.left,
            lineOrientation: 'horizontal',
            hasEndArrows: true
          })
        }
        if (this.isVerticality) {
          this.flowChart.connectingLinePoints.push({
            key: params.prefixNode.data.name + '=>' + params.data.name,
            beginPoint: params.prefixNode.nodeContent.connectingAnchorPoint.bottom,
            endPoint: params.nodeContent.connectingAnchorPoint.top,
            lineOrientation: 'verticality',
            hasEndArrows: true
          })
        }
      } else {
        if (params.parentNode) {
          if (this.isHorizontal) {
            this.flowChart.connectingLinePoints.push({
              key: params.parentNode.data.name + '=>' + params.data.name,
              beginPoint: params.parentNode.nodeContent.connectingAnchorPoint.bottom,
              endPoint: params.nodeContent.connectingAnchorPoint.top,
              lineOrientation: 'verticality',
              hasEndArrows: true
            })
          }

          if (this.isVerticality) {
            this.flowChart.connectingLinePoints.push({
              key: params.parentNode.data.name + '=>' + params.data.name,
              beginPoint: params.parentNode.nodeContent.connectingAnchorPoint.right,
              endPoint: params.nodeContent.connectingAnchorPoint.left,
              lineOrientation: 'horizontal',
              hasEndArrows: true
            })
          }
        }
      }
      console.log('saveChildNodePoint', this, params)
    },
    onresize () {
      console.log('onresize', this, this.$children)
      const $flowChart = this.$refs.flowChart

      this.flowChart.svg.width = $flowChart.scrollWidth + 'px'
      this.flowChart.svg.height = $flowChart.scrollheight + 'px'

      function refresh (self) {
        for (let i = 0; i < self.$children.length; i++) {
          var children = self.$children[i]

          if (children.refreshConnectingAnchorPoint) {
            children.refreshConnectingAnchorPoint()
          }
        }
      }

      if (this.__vueConnectiongLineRefresh) {
        clearInterval(this.__vueConnectiongLineRefresh)
      }

      this.__vueConnectiongLineRefresh = setTimeout(refresh, 300, this)
    }
  },
  directives: { // 局部注册指令
    resize: { // 指令名称
      bind (el :any, binding :any) { // el 为绑定的元素，binding为绑定给指定的对象
        let width = ''
        let height = ''
        console.log('begin resize')
        function isReize () {
          const style = document.defaultView.getComputedStyle(el)
          if (width !== style.width || height !== style.height) {
            console.log('resize', el, binding, width, height)
            binding.value() // 关键
          }
          width = style.width
          height = style.height
        }
        el.__vueSetInterval__ = setInterval(isReize, 300)
      },
      unbind (el : any) {
        clearInterval(el.__vueSetInterval__)
      }
    }
  }
  // ,
  // template: `
  //   <div class="flow-chart">
  //       <flow-node :data="data">
  //           <template v-slot:body="data">
  //               <slot name="flowNodeBody" :data="data"></slot>
  //           </template>
  //       </flow-node>
  //       <svg>
  //           <connecting-line v-for="point in connectingLinePoints" :stats="point"></connecting-line>
  //       </svg>
  //   </div>`
})
</script>
