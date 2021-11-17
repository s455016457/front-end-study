<template>
  <h1>Color 色彩</h1>
  <div>
    <span>Element Plus 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。</span>
  </div>
  <hr>
  <h2>主色</h2>
  <div><span>Element Plus 默认的主题色是明亮、友好的蓝色。</span></div>
  <el-row>
    <div class="el-col el-col-10 el-col-xs-12 is-guttered" style="padding-left: 6px; padding-right: 6px">
      <div class="demo-color-box" style="background:#409EFF">
        Brand color
        <div class="value">#409EFF</div>
        <div class="bg-color-sub" style="background:#ECF5FF">
          <div class="bg-blue-sub-item" style="background:#66B1FF"></div>
          <div class="bg-blue-sub-item" style="background:#79BBFF"></div>
          <div class="bg-blue-sub-item" style="background:#83C5FF"></div>
          <div class="bg-blue-sub-item" style="background:#96CFFF"></div>
          <div class="bg-blue-sub-item" style="background:#A9CAFF"></div>
          <div class="bg-blue-sub-item" style="background:#BCD4FF"></div>
          <div class="bg-blue-sub-item" style="background:#CFDEFF"></div>
          <div class="bg-blue-sub-item" style="background:#D3E8FF"></div>
          <div class="bg-blue-sub-item" style="background:#E6F6FF"></div>
        </div>
      </div>
    </div>
  </el-row>

  <hr>
  <h2>辅助色</h2>
  <div><span>除了主颜色外，您需要在不同的场景中使用不同的场景颜色 (例如，危险的颜色表示危险的操作)</span></div>
  <el-row>
    <div class="el-col el-col-6 el-col-xs-12 is-guttered" style="padding-left: 6px; padding-right: 6px">
      <div class="demo-color-box" style="background: rgb(103, 194, 58);">
        Success
        <div class="value">#67C23A</div>
        <div class="bg-color-sub">
          <div class="bg-secondary-sub-item" style="background: rgb(225, 243, 216);"></div>
          <div class="bg-secondary-sub-item" style="background: rgb(240, 249, 235);"></div>
        </div>
      </div>
    </div>
    <div class="el-col el-col-6 el-col-xs-12 is-guttered" style="padding-left: 6px; padding-right: 6px">
      <div class="demo-color-box" style="background: rgb(230, 162, 60);">
        Warning
        <div class="value"># #E6A23C</div>
        <div class="bg-color-sub">
          <div class="bg-secondary-sub-item" style="background: rgb(250, 236, 216);"></div>
          <div class="bg-secondary-sub-item" style="background: rgb(253, 246, 236);"></div>
        </div>
      </div>
    </div>
    <div class="el-col el-col-6 el-col-xs-12 is-guttered" style="padding-left: 6px; padding-right: 6px">
      <div class="demo-color-box" style="background: rgb(245, 108, 108);">
        Danger
        <div class="value"> #F56C6C</div>
        <div class="bg-color-sub">
          <div class="bg-secondary-sub-item" style="background: rgb(253, 226, 226);"></div>
          <div class="bg-secondary-sub-item" style="background: rgb(254, 240, 240);"></div>
        </div>
      </div>
    </div>
    <div class="el-col el-col-6 el-col-xs-12 is-guttered" style="padding-left: 6px; padding-right: 6px">
      <div class="demo-color-box" style="background: rgb(144, 147, 153);">
        Info
        <div class="value"> #909399</div>
        <div class="bg-color-sub">
          <div class="bg-secondary-sub-item" style="background: rgb(233, 233, 235);"></div>
          <div class="bg-secondary-sub-item" style="background: rgb(244, 244, 245);"></div>
        </div>
      </div>
    </div>
  </el-row>

  <hr>
  <h2>中性色</h2>
  <div><span>中性色用于文本、背景和边框颜色。 通过运用不同的中性色，来表现层次结构。</span></div>
  <el-row>
    <div class="el-col el-col-6 el-col-xs-12 is-guttered" style="padding-left: 6px; padding-right: 6px;">
      <div class="demo-color-box-group">
        <div class="demo-color-box demo-color-box-other" style="background: var(--el-text-color-primary);">
          Primary Text
          <div class="value"> #303133</div>
        </div>
        <div class="demo-color-box demo-color-box-other" style="background: var(--el-text-color-regular);">
          Regular Text
          <div class="value"> #606266</div>
        </div>
        <div class="demo-color-box demo-color-box-other" style="background: var(--el-text-color-secondary);">
          Secondary Text
          <div class="value"> #909399</div>
        </div>
        <div class="demo-color-box demo-color-box-other" style="background: var(--el-text-color-placeholder);">
          Placeholder Text
          <div class="value"> #C0C4CC</div>
        </div>
      </div>
    </div>
    <div class="el-col el-col-6 el-col-xs-12 is-guttered" style="padding-left: 6px; padding-right: 6px;">
      <div class="demo-color-box-group">
        <div class="demo-color-box demo-color-box-other demo-color-box-lite" style="background: var(--el-border-color-base);">
          Base Border
          <div class="value"> #DCDFE6</div>
        </div>
        <div class="demo-color-box demo-color-box-other demo-color-box-lite" style="background: var(--el-border-color-light);">
          Light Border
          <div class="value"> #E4E7ED</div>
        </div>
        <div class="demo-color-box demo-color-box-other demo-color-box-lite" style="background: var(--el-border-color-lighter);">
          Lighter Border
          <div class="value"> #EBEEF5</div>
        </div>
        <div class="demo-color-box demo-color-box-other demo-color-box-lite" style="background: var(--el-border-color-extra-light);">
          Extra Light Border
          <div class="value"> #F2F6FC</div>
        </div>
      </div>
    </div>
    <div class="el-col el-col-6 el-col-xs-12 is-guttered" style="padding-left: 6px; padding-right: 6px;">
      <div class="demo-color-box-group">
        <div class="demo-color-box demo-color-box-other" style="background: rgb(0, 0, 0);">
          Basic Black
          <div class="value">#000000</div>
        </div>
        <div class="demo-color-box demo-color-box-other" style="background: rgb(255, 255, 255); color: rgb(48, 49, 51); border: 1px solid rgb(238, 238, 238);">
          Basic White
          <div class="value">#FFFFFF</div>
        </div>
        <div class="demo-color-box demo-color-box-other bg-transparent">
          Transparent
          <div class="value">Transparent</div>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>

<style lang="scss" scoped>
.demo-color-box {
    position: relative;
    border-radius: 4px;
    padding: 20px;
    margin: 5px 0;
    height: 114px;
    box-sizing: border-box;
    color: var(--el-color-white);
    font-size: 14px;
}
.demo-color-box .bg-color-sub {
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    position: absolute;
}

.demo-color-box .bg-color-sub .bg-blue-sub-item:first-child {
    border-radius: 0 0 0 var(--el-border-radius-base);
}

.demo-color-box .bg-color-sub .bg-blue-sub-item {
    width: 11.1111111%;
    height: 100%;
    display: inline-block;
}

.demo-color-box .bg-color-sub .bg-secondary-sub-item:first-child {
    border-radius: 0 0 0 var(--el-border-radius-base);
}

.demo-color-box .bg-color-sub .bg-secondary-sub-item {
    width: 50%;
    height: 100%;
    display: inline-block;
}

.demo-color-box-lite {
    color: var(--el-text-color-primary);
}

.demo-color-box-lite .value {
    font-size: 12px;
    opacity: .69;
    line-height: 24px;
}

.bg-transparent {
    color: var(--el-text-color-primary);
    background-image: linear-gradient(45deg,#f9f9fa 25%,transparent 25%),
      linear-gradient(135deg,#f9f9fa 25%,transparent 25%),
      linear-gradient(45deg,transparent 75%,#f9f9fa 75%),
      linear-gradient(135deg,transparent 75%,#f9f9fa 75%);
    background-size: 20px 20px;
    background-position: 0px 0px,10px 0px,10px -10px,0px 10px;
}
</style>
