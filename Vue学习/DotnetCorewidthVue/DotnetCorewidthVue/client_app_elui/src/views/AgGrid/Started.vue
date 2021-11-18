<template>
  <h1><a href="https://www.ag-grid.com/vue-data-grid/vue3/">开始使用Ag-Grid</a></h1>
  <h2>添加 Ag Grid 到项目</h2>
  <h3>安装 Vue 手脚架</h3>
  <span>执行以下命令安装Vue手脚架</span>
  <code>npm install -g @vue/cli</code>

  <h3>创建项目</h3>
  <el-row><code>vue create my-project</code></el-row>
  <el-row><span>选择"Manually select features"，接下来，选择Babel和CSS Pre-processors，vue 选择3.x版本。选择Sass/SCSS(with dart-sass)作为CSS Pre-processor</span></el-row>

  <h3>安装 Ag Grid </h3>
  <span>执行命令<code>npm install ag-grid-vue3 ag-grid-community vue-class-component@next</code>完成安装</span>

  <hr>
  <span>基本的Ag Grid</span>
  <basic-grid />

  <hr>
  <span>远程访问的Ag Grid</span>
  <remote-data />

  <hr>
  <span>分组</span>
  <br />
  <span>需要启用 ag 网格的企业功能。安装附加包：<code>npm install --save ag-grid-enterprise</code></span>
  <br />
  <span>然后，将导入添加到：src/main.js</span>
  <br />
  <code>import 'ag-grid-enterprise'</code>
  <group />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasicGrid from '@/components/AgGrid/BasicGrid.vue'
import RemoteData from '@/components/AgGrid/RemoteData.vue'
import Group from '@/components/AgGrid/Group.vue'

export default defineComponent({
  components: {
    BasicGrid,
    RemoteData,
    Group
  }
})
</script>
