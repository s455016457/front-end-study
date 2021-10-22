<template>
    <div ref="flowChart" v-resize="onresize" class="flow-chart" :class="{'flow-chart-verticality':isVerticality}">
        <flow-node
          :data="data"
          :node-orientation="chartLineOrientation">
            <template v-slot:body="data">
                <slot name="flowNodeBody" :data="data.data"></slot>
            </template>
        </flow-node>
        <svg v-show="flowChart.showSvg" :style="{width:flowChart.svg.width, height: flowChart.svg.height}">
            <connecting-line v-for="point in flowChart.connectingLinePoints" :key="point.key" :lineStats="point"></connecting-line>
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
        },
        showSvg: false
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

      this._initConnectingLinePoints(this)
      this.flowChart.showSvg = true
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
    /**
     * 初始化连接线
     * 递归遍历所有子组件
     */
    _initConnectingLinePoints (target) {
      for (let i = 0; i < target.$children.length; i++) {
        var children = target.$children[i]
        if (children.refreshConnectingAnchorPoint) {
          children.refreshConnectingAnchorPoint() // 调用子组件的 refreshConnectingAnchorPoint 方法，刷新子组件锚点坐标
        }
        if (children.getConnectionLinePoint) {
          var params = children.getConnectionLinePoint() // 调用子组件的 getConnectionLinePoint 方法，获取连接线坐标
          this.saveConnectingLinePoints(params)
          this._initConnectingLinePoints(children)
        }
      }
    },
    /**
     * 保存节点连接线坐标
     */
    saveConnectingLinePoints (params) {
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
    },
    /**
     * 触发 resize 执行方法
     */
    onresize () {
      const $flowChart = this.$refs.flowChart
      this.flowChart.showSvg = false
      this.flowChart.svg.width = $flowChart.scrollWidth + 'px'
      this.flowChart.svg.height = $flowChart.scrollheight + 'px'

      function refresh (target) {
        for (let i = 0; i < target.$children.length; i++) {
          var children = target.$children[i]

          if (children.refreshConnectingAnchorPoint) {
            children.refreshConnectingAnchorPoint()
          }
          refresh(children)
        }
      }

      if (this.__vueConnectiongLineRefresh) {
        clearInterval(this.__vueConnectiongLineRefresh)
      }

      this.__vueConnectiongLineRefresh = setTimeout(function (target) {
        refresh(target)
        target.flowChart.showSvg = true
      }, 300, this)
    }
  },
  /**
   * 注册容器 resize 事件
   */
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
})
</script>
