<template>
  <fragment>
    <div ref="nodeBox" class="node" :class="{'node-verticality':isVerticality}">
      <div class="node-content">
        <div class="node-content-title">
          <slot name="header" :data="data">{{data.name}}</slot>
        </div>
        <div class="node-content-body">
          <slot name="body" :data="data"></slot>
        </div>
      </div>
      <div v-if="hasChildNode" ref="childNodes" class="node-childs" :class="{'node-childs-verticality':isVerticality}">
        <flowNode
          v-for="childNode in data.childNodes"
          :key="childNode.id"
          :data="childNode"
          :parent-node="node"
          :node-orientation="nodeOrientation">
          <template v-slot:body="childNode">
            <slot name="body" :data="childNode.data"></slot>
          </template>
        </flowNode>
      </div>
    </div>
    <flowNode
      v-if="hasNextNode"
      :data="data.nextNode"
      :parent-node="data.parentNode"
      :node-orientation="nodeOrientation"
      :prefix-node="node">
      <template v-slot:body="bodyData">
        <slot name="body" :data="bodyData.data"></slot>
      </template>
    </flowNode>
  </fragment>
</template>

<style>
  .node {
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .node-verticality{
    flex-direction: row;
  }

  .node-content {
    width: auto;
    margin: 20px;
    padding: 10px;
    border-width: 1px;
    border-style: solid;
    transition: circle;
    border-radius: 10px;
  }

  .node-childs {
    display: flex;
    flex-direction: row;
  }

  .node-childs-verticality {
    flex-direction: column;
  }
</style>

<script lang="ts">
import Vue from 'vue'
import { Plugin } from 'vue-fragment'// 可以使用无根组件 https://github.com/Thunberg087/vue-fragment

Vue.use(Plugin)
// interface flowNodeData{
//   name: String,
//   nextNode: flowNodeData,
//   childrenNode: Array<flowNodeData>
// }

export default Vue.extend({
  name: 'flowNode',
  props: {
    data: Object,
    parentNode: Object,
    prefixNode: Object,
    nodeOrientation: String// 图表方向 "horizontal" 或 "verticality"
  },
  data () {
    return {
      node: {
        data: this.data,
        nodeContent: {
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          connectingAnchorPoint: {
            top: {
              X: 0,
              Y: 0
            },
            bottom: {
              X: 0,
              Y: 0
            },
            left: {
              X: 0,
              Y: 0
            },
            right: {
              X: 0,
              Y: 0
            }
          }
        }
      }
    }
  },
  computed: {
    isVerticality () :boolean {
      return this.nodeOrientation === 'verticality'
    },
    hasNextNode () :boolean {
      return this.data.nextNode && this.data.nextNode.name
    },
    hasChildNode () :boolean {
      return this.data.childNodes && this.data.childNodes.length > 0
    },
    hasPrentNode () :boolean {
      return this.parentNode !== undefined && this.parentNode !== null
    },
    hasPrefixNode () :boolean {
      return this.prefixNode !== undefined && this.prefixNode !== null
    }
  },
  methods: {
    /**
     *获取连接线左边
     */
    getConnectionLinePoint () {
      return {
        data: this.node.data,
        nodeContent: this.node.nodeContent,
        parentNode: this.parentNode,
        prefixNode: this.prefixNode
      }
    },
    /**
     * 刷新连接线锚点坐标
     */
    refreshConnectingAnchorPoint () {
      const $node = this.$refs.nodeBox
      const $nodeContent = $node.querySelector('.node-content')
      this.node.nodeContent.left = $nodeContent.offsetLeft
      this.node.nodeContent.top = $nodeContent.offsetTop
      this.node.nodeContent.width = $nodeContent.offsetWidth
      this.node.nodeContent.height = $nodeContent.offsetHeight

      this.node.nodeContent.connectingAnchorPoint.top.X = this.node.nodeContent.left + this.node.nodeContent.width / 2
      this.node.nodeContent.connectingAnchorPoint.top.Y = this.node.nodeContent.top

      this.node.nodeContent.connectingAnchorPoint.bottom.X = this.node.nodeContent.left + this.node.nodeContent.width / 2
      this.node.nodeContent.connectingAnchorPoint.bottom.Y = this.node.nodeContent.top + this.node.nodeContent.height

      this.node.nodeContent.connectingAnchorPoint.left.X = this.node.nodeContent.left
      this.node.nodeContent.connectingAnchorPoint.left.Y = this.node.nodeContent.top + this.node.nodeContent.height / 2

      this.node.nodeContent.connectingAnchorPoint.right.X = this.node.nodeContent.left + this.node.nodeContent.width
      this.node.nodeContent.connectingAnchorPoint.right.Y = this.node.nodeContent.top + this.node.nodeContent.height / 2
    }
  }
})
</script>
