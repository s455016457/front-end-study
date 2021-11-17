<template>
  <h2>Border边框</h2>
  <span>
    我们对边框进行统一规范，可用于按钮、卡片、弹窗等组件里。
  </span>

  <h3>
    边框样式
  </h3>

  <span>我们提供了以下几种边框样式，以供选择</span>

  <table>
    <thead>
      <th>
        Name
      </th>
      <th>
        Thickness
      </th>
      <th class="demo">
        Demo
      </th>
    </thead>
    <tbody>
      <tr>
        <th>Solid</th>
        <td>1px</td>
        <td class="line">
          <div></div>
        </td>
      </tr>
      <tr>
        <th>Dashed</th>
        <td>2px</td>
        <td class="line">
          <div class="dashed"></div>
        </td>
      </tr>
    </tbody>
  </table>

  <hr>
  <h3>
    圆角
  </h3>

  <span>我们提供了以下几种边框样式，以供选择</span>

  <el-row :gutter="12" class="demo-radius">
    <el-col
    v-for="(radius,i) in radiusGroup"
    :key="i"
    :span="6"
    :xs="{span: 12}"
    >
      <div class="title">{{radius.name}}</div>
      <div class="value">
        <code>
          border-radiues: {{getBorderRadiuesValue(radius.type) || '0px'}}
        </code>
      </div>
      <div
        class="radius"
        :style="{
          borderRadius: radius.type
            ? `var(--el-border-radius-${radius.type})`
            : '',
        }"
        ></div>
    </el-col>
  </el-row>

  <hr>

  <h2>阴影</h2>
  <span>我们提供了以下几种投影样式，以供选择。</span>
  <template v-for="(shadow,i) in shadowGroup" :key="i">
    <div
    class="demo-shadow"
    :style="{boxShadow: `var(--el-box-shadow-${shadow.type})`}"
    ></div>
    <span class="demo-shadow">
      {{shadow.name}}
      <code>
        box-shadow:{{getShadowValue(shadow.type)}}
      </code>
    </span>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

var radiusData = [
  {
    name: 'No Radius',
    type: ''
  },
  {
    name: 'Small Radius',
    type: 'small'
  },
  {
    name: 'Large Radius',
    type: 'base'
  },
  {
    name: 'Round Radius',
    type: 'round'
  }
]

var shadowGroup = [
  {
    name: 'Basic Shadow',
    type: 'base'
  },
  {
    name: 'Light Shadow',
    type: 'light'
  }
]

export default defineComponent({
  data () {
    return {
      radiusGroup: radiusData,
      shadowGroup: shadowGroup
    }
  },
  methods: {
    getBorderRadiuesValue (type:unknown) {
      const getCssVarValue = (prefix:unknown, type:unknown) =>
        getComputedStyle(document.documentElement).getPropertyValue(`--el-${prefix}-${type}`)
      return getCssVarValue('border-radius', type)
    },
    getShadowValue (type:unknown) {
      const getCssVarValue = (prefix:unknown, type:unknown) =>
        getComputedStyle(document.documentElement).getPropertyValue(`--el-${prefix}-${type}`)
      return getCssVarValue('box-shadow', type)
    }
  }
})
</script>

<style lang="scss" scoped>
th, td{
  padding:5px;
}

th.demo{
  width:400px;
}

.line div{
  width: 100%;
  height: 1px;
  border-top: 1px solid  var(--el-border-color-base);
  border-color: var(--el-text-color-regular);
}

.line .dashed{
  border-top: 2px dashed var(--el-border-color-base);
  border-color: var(--el-text-color-regular);
}

.demo-radius .title {
  color: var(--el-text-color-regular);
  font-size: 18px;
  margin: 10px 0;
}
.demo-radius .value {
  color: var(--el-text-color-primary);
  font-size: 16px;
  margin: 10px 0;
}
.demo-radius .radius{
  height: 40px;
  width: 70%;
  border: 1px solid var(--el-border-color-base);
  border-color: var(--el-text-color-regular);
  border-radius: 0;
  margin: 20px;
}

.demo-shadow {
  height: 100px;
  width: 50%;
  // background-color: var(--el-text-color-regular);
}
.demo-shadow-text {
  line-height: 50px;
  color: var(--el-text-color-regular);
  font-size: 14px;
}
</style>
