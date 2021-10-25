<template>
  <g class="connection-line">
    <polygon
        v-if="lineStats.hasBeginArrows"
        :points="beginArrowsPoints"
        class="child-node-arrows"></polygon>
    <polyline
        :points="linePoints"
        stroke-dasharray
        class="child-node-line">
    </polyline>
    <polygon
        v-if="lineStats.hasEndArrows"
        :points="endArrowsPoints"
        class="child-node-arrows"></polygon>
  </g>
</template>

<style>
  .child-node-line {
    fill: none;
    stroke-width: 2;
    stroke-linejoin:round;
    stroke-linecap:round;
    stroke-dasharray: 0, 2370;
    animation: lineMove 4s ease;
    animation-fill-mode: forwards;
  }

  .child-node-arrows {
    stroke-width: 1;
    stroke: rgba(0, 0, 0,0);
    fill: rgba(0, 0, 0,0);
    animation: arrowsShow 1s ease;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
  }

  .prefix-node-arrows {
    stroke-width: 1;
    stroke: rgba(0, 0, 0,0);
    fill: rgba(0, 0, 0,0);
    animation: arrowsShow 1s ease;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
  }

  .connection-line {
    stroke: rgb(255, 0, 0);
    fill: rgb(255, 0, 0);
  }

  @keyframes arrowsShow {
    from {
      stroke: rgba(0, 0, 0,0);
      fill: rgba(0, 0, 0,0);
    }
    to {
      stroke: rgb(255, 0, 0);
      fill: rgb(255, 0, 0);
    }
  }

  @keyframes lineMove {
    0%{
      /* stroke: rgba(0, 0, 0, 0); */
      stroke-dasharray: 0, 2000;
    }
    100%{
      /* stroke: red; */
      stroke-dasharray: 2000, 0;
    }
}
</style>

<script lang="ts">
import Vue from 'vue'

// interface points{
//   X: Number
//   Y: Number
// }

// interface lineStats{
//   hasBeginArrows: Boolean
//   hasEndArrows: Boolean
//   beginPoint: Object
//   endPoint: Object
//   lineOrientation: String //  horizontal 水平方向    verticality 垂直方向
// }

export default Vue.extend({
  name: 'connectionLine',
  props: {
    lineStats: Object
  },
  computed: {
    isHorizontal () :boolean { // 连接线是水平方向
      return this.lineStats.lineOrientation && this.lineStats.lineOrientation === 'horizontal'
    },
    isVerticality () :boolean { // 连接线是垂直方向
      return this.lineStats.lineOrientation && this.lineStats.lineOrientation === 'verticality'
    },
    linePoints () :string {
      let beginX = this.lineStats.beginPoint.X
      let beginY = this.lineStats.beginPoint.Y
      let endX = this.lineStats.endPoint.X
      let endY = this.lineStats.endPoint.Y

      if (this.isHorizontal) {
        if (this.lineStats.hasBeginArrows) {
          beginX += 10
        }
        if (this.lineStats.hasEndArrows) {
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
        if (this.lineStats.hasBeginArrows) {
          beginY += 10
        }
        if (this.lineStats.hasEndArrows) {
          endY -= 10
        }

        const x1 = beginX
        const x2 = endX
        const y1 = (beginY + endY) / 2
        const y2 = y1

        return beginX + ',' + beginY + ' ' + x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + endX + ',' + endY
      } else {
        throw new Error('未知方向' + this.lineStats.lineOrientation)
      }
    },
    beginArrowsPoints () :string {
      const beginX = this.lineStats.beginPoint.X
      const beginY = this.lineStats.beginPoint.Y
      if (this.isHorizontal) {
        return beginX + ',' + beginY + ' ' + (beginX + 10) + ',' + (beginY - 4) + ' ' + (beginX + 10) + ',' + (beginY + 4)
      } else if (this.isVerticality) {
        return beginX + ',' + beginY + ' ' + (beginX - 4) + ',' + (beginY + 10) + ' ' + (beginX + 4) + ',' + (beginY + 10)
      } else {
        throw new Error('未知方向' + this.lineStats.lineOrientation)
      }
    },
    endArrowsPoints () :string {
      const endX = this.lineStats.endPoint.X
      const endY = this.lineStats.endPoint.Y
      if (this.isHorizontal) {
        return endX + ',' + endY + ' ' + (endX - 10) + ',' + (endY - 4) + ' ' + (endX - 10) + ',' + (endY + 4)
      } else if (this.isVerticality) {
        return endX + ',' + endY + ' ' + (endX - 4) + ',' + (endY - 10) + ' ' + (endX + 4) + ',' + (endY - 10)
      } else {
        throw new Error('未知方向' + this.lineStats.lineOrientation)
      }
    }
  }
})
</script>
