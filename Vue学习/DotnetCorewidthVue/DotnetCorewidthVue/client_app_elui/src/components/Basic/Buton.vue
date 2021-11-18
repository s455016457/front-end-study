<template>
  <h1>Button 按钮</h1>
  <span>常用的操作按钮。</span>

  <hr>
  <h2>基础用法</h2>
  <span>使用 type、plain、round 和 circle 来定义按钮的样式。</span>
  <el-row>
    <el-button>Default</el-button>
    <el-button type="primary" :icon="Search">Primary</el-button>
    <el-button type="primary" :icon="Edit">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
  <el-row>
    <el-button
      v-for="(type,index) in buttonTypeGroups"
      :type="type"
      :key="index"
      @click="buttonClick(index)"
    >{{getButtonDisplay(type)}}</el-button>
  </el-row>
  <el-row>
    <el-button
      v-for="(type,index) in buttonTypeGroups"
      :type="type"
      :key="index"
      plain
      @click="buttonClick(index)"
    >{{getButtonDisplay(type)}}</el-button>
  </el-row>
  <el-row>
    <el-button
      v-for="(type,index) in buttonTypeGroups"
      :type="type"
      :key="index"
      round
      @click="buttonClick(index)"
    >{{getButtonDisplay(type)}}</el-button>
  </el-row>
  <el-row>
    <el-button
      v-for="(icon,index) in buttonIcons"
      type="primary"
      :icon="icon"
      :key="index"
      circle
      @click="buttonClick(index)"
    ></el-button>
  </el-row>
  <el-row>
    <el-button
      v-for="(icon,index) in buttonIcons"
      type="success"
      :icon="getIcon(index)"
      :key="index"
      @click="buttonClick(index)"
    >{{getButtonDisplay(index)}}</el-button>
  </el-row>
  <el-row>
    <el-button v-for="(type,index) in buttonTypeGroups"
      :type="type"
      :icon="getIcon(index)"
      :key="index"
      round
      @click="buttonClick(index)"
    >{{getButtonDisplay(type)}}</el-button>
  </el-row>
  <el-row>
    <el-button
      v-for="(type,index) in buttonTypeGroups"
      :type="type"
      :icon="getIcon(index)"
      :key="index"
      plain
      @click="buttonClick(index)"
    >{{getButtonDisplay(type)}}</el-button>
  </el-row>
  <el-row>
    <el-button
      v-for="(type,index) in buttonTypeGroups"
      :type="type"
      :icon="getIcon(index)"
      :key="index"
      @click="buttonClick(index)"
    >{{getButtonDisplay(type)}}</el-button>
  </el-row>

  <hr>
  <h2>禁用状态</h2>
  <span>你可以使用 disabled 属性来定义按钮是否被禁用。</span>
  <span>使用 disabled 属性来控制按钮是否为禁用状态。 该属性接受一个 Boolean 类型的值。</span>
  <el-row>
    <el-button
      v-for="(type,index) in buttonTypeGroups"
      :type="type"
      :key="index"
      disabled
      @click="buttonClick(index)"
    >{{getButtonDisplay(type)}}</el-button>
  </el-row>
  <el-row>
    <el-button
      v-for="(type,index) in buttonTypeGroups"
      :type="type"
      :key="index"
      plain
      disabled
      @click="buttonClick(index)"
    >{{getButtonDisplay(type)}}</el-button>
  </el-row>

  <hr>
  <h2>文字按钮</h2>
  <span>没有边框和背景色的按钮。</span>
  <div>
    <el-button
      type="text"
      @click="buttonClick('Text Button')"
    >Text Button</el-button>
    <el-button type="text" disabled>Text Button</el-button>
  </div>

  <hr>
  <h2>图标按钮</h2>
  <div><span>使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。</span></div>
  <div><span>使用 icon 属性来为按钮添加图标。 你可以在 Element Plus icon 组件里找到 Element Plus 提供的内置图标。 通过向右方添加 <code>&lt;i&gt;</code> 标签来添加图标， 你也可以使用自定义图标。</span></div>
  <el-button type="primary" :icon="getIcon(1)"></el-button>
  <el-button type="primary" :icon="getIcon(7)"></el-button>
  <el-button type="primary" :icon="getIcon(5)"></el-button>
  <el-button type="primary" :icon="getIcon(0)">Search</el-button>
  <el-button type="primary">
    Upload<el-icon class="el-icon--right"><component :is="getIcon(6)" /></el-icon>
  </el-button>
  <el-button type="primary" :icon="Search">Search</el-button>

  <hr>
  <h2>按钮组</h2>
  <div><span>通过按钮组来组合一系列相似的操作。</span></div>
  <div><span>使用标签 <code> &lt;el-button-group&gt; </code> 来给按钮分组。</span></div>

  <div>
    <el-button-group>
      <el-button type="primary" :icon="getIcon(8)">Previous Page</el-button>
      <el-button type="primary">
        Next Page
        <el-icon class="el-icon-right"><component :is="getIcon(9)" /></el-icon>
      </el-button>
    </el-button-group>
  </div>

  <div>
    <el-button-group>
      <el-button
        v-for="(icon,i) in buttonIcons"
        :key="i"
        type="primary"
        :icon="icon"
      ></el-button>
    </el-button-group>
  </div>

  <div>
    <el-button-group>
      <el-button
        v-for="(icon,i) in buttonIcons"
        :key="i"
        type="primary"
        :icon="icon"
      >{{getButtonDisplay(i)}}</el-button>
    </el-button-group>
  </div>

  <hr>
  <h2>加载中</h2>
  <div><span>点击按钮来加载数据，并向用户反馈加载状态。</span></div>
  <div><span>设置 loading 属性，当设置为 true 时即为加载中。</span></div>
  <el-button
    v-for="(type,index) in buttonTypeGroups"
    :type="type"
    :key="index"
    :loading="true"
    @click="buttonClick(index)"
  >{{getButtonDisplay(type)}}</el-button>

  <h2>各种尺寸的尺寸按钮</h2>
  <div><span>除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。</span></div>
  <div><span>通过设置 size，属性来设置不同的按钮尺寸，可供选择的尺寸有：medium、small、mini。</span></div>
  <el-row>
    <el-button>Default</el-button>
    <el-button size="medium">Medium</el-button>
    <el-button size="small">Small</el-button>
    <el-button size="mini">Mini</el-button>
  </el-row>
  <el-row>
    <el-button>Default</el-button>
    <el-button size="medium" type="primary">Medium</el-button>
    <el-button size="small" type="primary">Small</el-button>
    <el-button size="mini" type="primary">Mini</el-button>
  </el-row>
  <el-row>
    <el-button round>Default</el-button>
    <el-button size="medium" type="primary" round>Medium</el-button>
    <el-button size="small" type="primary" round>Small</el-button>
    <el-button size="mini" type="primary" round>Mini</el-button>
  </el-row>
  <el-row>
    <el-button circle><el-icon><component :is="getIcon(0)" /></el-icon></el-button>
    <el-button size="medium" type="primary" circle><el-icon><component :is="getIcon(0)" /></el-icon></el-button>
    <el-button size="small" type="primary" circle><el-icon><component :is="getIcon(0)" /></el-icon></el-button>
    <el-button size="mini" type="primary" circle><el-icon><component :is="getIcon(0)" /></el-icon></el-button>
  </el-row>
  <el-row>
    <el-button :icon="getIcon(0)" circle></el-button>
    <el-button :icon="getIcon(0)" size="medium" circle></el-button>
    <el-button :icon="getIcon(0)" size="small" circle></el-button>
    <el-button :icon="getIcon(0)" size="mini" circle></el-button>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Search, Edit, Check, Message, Star, Delete, Upload, Share, ArrowLeft, ArrowRight } from '@element-plus/icons'

var buttonBorderGroups = ['', 'plain', 'round']
var buttonIcons = [Search, Edit, Check, Message, Star, Delete, Upload, Share, ArrowLeft, ArrowRight]
var buttonTypeGroups = ['', 'primary', 'success', 'info', 'warning', 'danger']

export default defineComponent({
  data () {
    return {
      buttonBorderGroups: buttonBorderGroups,
      buttonIcons: buttonIcons,
      buttonTypeGroups: buttonTypeGroups
    }
  },
  methods: {
    getButtonDisplay (type:string|number) {
      if ((typeof type) === 'string') {
        return type === '' ? 'Default' : type
      } else if ((typeof type) === 'number') {
        let i:number = type as number
        i = i % this.buttonTypeGroups.length
        return this.buttonTypeGroups[i] === '' ? 'Default' : this.buttonTypeGroups[i]
      }

      return 'Default'
    },
    getIcon (i:number) {
      i = i % this.buttonIcons.length
      return this.buttonIcons[i]
    },
    buttonClick (i:string|number) {
      if ((typeof i) === 'string') {
        console.log(i + ' click', i, this)
      } else if ((typeof i) === 'number') {
        let a:number = i as number
        a = a % this.buttonTypeGroups.length
        console.log(this.buttonTypeGroups[a] + ' click', i, this)
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
