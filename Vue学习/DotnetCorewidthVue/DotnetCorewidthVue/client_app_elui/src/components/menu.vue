<template>
  <template v-if="hasChild">
    <el-sub-menu :index="id">
      <template #title>
        <el-icon>
          <component :is="currentMenuIcon"></component>
        </el-icon>
        <span>{{name}}</span>
      </template>
      <myMenu
        v-for="item in childs"
        :key="item.id"
        v-bind="item"
        @menuItemClick="handleClick">
      </myMenu>
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item
      :index="id"
      @click="handleClick">
      <template #title>
        <el-icon>
          <component :is="currentMenuIcon"></component>
        </el-icon>
        <span>{{name}}</span>
        <!-- <template v-if="hasUrl">
          <span><router-link :to="routerLinkUrl">{{name}}</router-link></span>
        </template>
        <template v-else>
          <span>{{name}}</span>
        </template> -->
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting
} from '@element-plus/icons'

export default defineComponent({
  name: 'myMenu',
  components: {
    Location,
    Document,
    Setting,
    IconMenu
  },
  props: {
    id: String,
    name: String,
    icon: String,
    url: String,
    childs: Array
  },
  computed: {
    hasChild () {
      return this.childs && this.childs.length > 0
    },
    hasUrl () {
      return this.url && this.url.length > 0
    },
    currentMenuIcon () {
      return this.icon
    },
    routerLinkUrl () {
      return { path: this.url || '' }
    }
  },
  methods: {
    handleClick (eventParams: unknown, data: any) {
      var self = {
        id: this.id,
        name: this.name,
        icon: this.icon,
        url: { path: this.url || '' },
        hasChild: this.hasChild,
        hasUrl: this.hasUrl
      }
      // 通过 $emit 来想父组件暴露自定义事件
      this.$emit('menuItemClick', eventParams, data || self)
    }
  },
  setup (props) {
    console.log(props)
  }
})
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
