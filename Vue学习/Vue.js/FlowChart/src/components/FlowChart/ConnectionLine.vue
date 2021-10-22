<template>
  <fragment>
    <polygon
        v-if="stats.hasBeginArrows"
        :points="beginArrowsPoints"
        class="child-node-arrows"></polygon>
    <polyline
        :points="linePoints"
        stroke-dasharray
        class="child-node-line"></polyline>
    <polygon
        v-if="stats.hasEndArrows"
        :points="endArrowsPoints"
        class="child-node-arrows"></polygon>
  </fragment>
</template>

<style>
  .child-node-line {
    fill:none;
    stroke: rgb(255, 0, 0);
    stroke-width: 2;
  }

  .prefix-node-line {
    fill: none;
    stroke: rgb(255, 0, 0);
    stroke-width: 2;
  }

  .child-node-arrows {
    fill: rgb(255, 0, 0);
    stroke: rgb(255, 0, 0);
    stroke-width: 1;
  }

  .prefix-node-arrows {
    fill: rgb(255, 0, 0);
    stroke: rgb(255, 0, 0);
    stroke-width: 1;
  }
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Plugin } from 'vue-fragment'// 可以使用无根组件 https://github.com/Thunberg087/vue-fragment

Vue.use(Plugin)

export default Vue.extend({
  props: {
    stats: Object
  },
  computed: {
    isHorizontal () :boolean { // 连接线是水平方向
      return this.stats.lineOrientation && this.stats.lineOrientation === 'horizontal'
    },
    isVerticality () :boolean { // 连接线是垂直方向
      return this.stats.lineOrientation && this.stats.lineOrientation === 'verticality'
    },
    linePoints () :string {
      let beginX = this.stats.beginPoint.X
      let beginY = this.stats.beginPoint.Y
      let endX = this.stats.endPoint.X
      let endY = this.stats.endPoint.Y

      if (this.isHorizontal) {
        if (this.stats.hasBeginArrows) {
          beginX += 10
        }
        if (this.stats.hasEndArrows) {
          endX -= 10
        }
        if (endX < beginX) {
          const x1 = beginX + 10
          const x2 = x1
          const x3 = endX - 10
          const x4 = x3
          const y1 = beginY
          const y2 = (beginY + endY) * 3 / 5
          const y3 = y2
          const y4 = endY

          return beginX + ',' + beginY + ' ' + x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + x3 + ',' + y3 + ' ' + x4 + ',' + y4 + ' ' + endX + ',' + endY
        } else {
          const x1 = (beginX + endX) / 2
          const x2 = x1
          const y1 = beginY
          const y2 = endY
          return beginX + ',' + beginY + ' ' + x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + endX + ',' + endY
        }
      } else if (this.isVerticality) {
        if (this.stats.hasBeginArrows) {
          beginY += 10
        }
        if (this.stats.hasEndArrows) {
          endY -= 10
        }

        const x1 = beginX
        const x2 = endX
        const y1 = (beginY + endY) / 2
        const y2 = y1

        return beginX + ',' + beginY + ' ' + x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + endX + ',' + endY
      } else {
        throw new Error('未知方向' + this.stats.lineOrientation)
      }
    },
    beginArrowsPoints () :string {
      const beginX = this.stats.beginPoint.X
      const beginY = this.stats.beginPoint.Y
      if (this.isHorizontal) {
        return beginX + ',' + beginY + ' ' + (beginX + 10) + ',' + (beginY - 4) + ' ' + (beginX + 10) + ',' + (beginY + 4)
      } else if (this.isVerticality) {
        return beginX + ',' + beginY + ' ' + (beginX - 4) + ',' + (beginY + 10) + ' ' + (beginX + 4) + ',' + (beginY + 10)
      } else {
        throw new Error('未知方向' + this.stats.lineOrientation)
      }
    },
    endArrowsPoints () :string {
      const endX = this.stats.endPoint.X
      const endY = this.stats.endPoint.Y
      if (this.isHorizontal) {
        return endX + ',' + endY + ' ' + (endX - 10) + ',' + (endY - 4) + ' ' + (endX - 10) + ',' + (endY + 4)
      } else if (this.isVerticality) {
        return endX + ',' + endY + ' ' + (endX - 4) + ',' + (endY - 10) + ' ' + (endX + 4) + ',' + (endY - 10)
      } else {
        throw new Error('未知方向' + this.stats.lineOrientation)
      }
    }
  }
  // ,
  // template: `
  //   <polygon
  //       v-if="stats.hasBeginArrows"
  //       :points="beginArrowsPoints"
  //       class="child-node-arrows"></polygon>
  //   <polyline
  //       :points="linePoints"
  //       stroke-dasharray
  //       class="child-node-line"></polyline>
  //   <polygon
  //       v-if="stats.hasEndArrows"
  //       :points="endArrowsPoints"
  //       class="child-node-arrows"></polygon>
  //   `
})
</script>
