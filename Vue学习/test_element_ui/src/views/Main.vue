<template>
  <el-container style="height: 100%; width: 100%; border: 1px solid #eee">
    <el-header height="80px">
      <el-radio-group v-model="isCollapse" style="margin-bottom:20px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">折叠</el-radio-button>
      </el-radio-group>
    </el-header>
    <el-main>
      <el-scrollbar class="menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <myMenu
            v-for="item in menuData"
            :key="item.id"
            v-bind="item"
            @menuItemClick="handleMenuItemClick"></myMenu>
          <!-- <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-sub-menu index="1-4">
              <template #title>
                <el-icon><location /></el-icon>
                <span>item four</span>
                </template>
              <el-menu-item index="1-4-1">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>item one</span>
                </template>
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu> -->
        </el-menu>
      </el-scrollbar>
      <div :class="contextClass">
        <el-breadcrumb>
          <el-breadcrumb-item v-for="item in routerPath" :key="item">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-scrollbar class="content-body">
          <router-view/>
        </el-scrollbar>
      </div>
    </el-main>
    <el-footer height="40px">
      下边
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import menu from '../components/menu.vue'

const menuData = [{
  id: '0',
  name: 'Home',
  icon: 'location',
  url: '/home'
},
{
  id: '1',
  name: '供应链',
  icon: 'location',
  childs: [
    {
      id: '1-1',
      name: '采购管理',
      icon: 'document',
      childs: [
        {
          id: '1-1-1',
          name: '采购申请单',
          icon: 'document',
          url: ''
        },
        {
          id: '1-1-2',
          name: '采购订单',
          icon: 'document',
          url: ''
        },
        {
          id: '1-1-3',
          name: '采购退货单',
          icon: 'document',
          url: ''
        },
        {
          id: '1-1-4',
          name: '供应商资料',
          icon: 'document',
          url: ''
        }
      ]
    },
    {
      id: '1-2',
      name: '销售管理',
      icon: 'document',
      childs: [
        {
          id: '1-2-1',
          name: '销售报价单',
          icon: 'document',
          url: ''
        },
        {
          id: '1-2-2',
          name: '销售订单',
          icon: 'document',
          url: ''
        },
        {
          id: '1-2-3',
          name: '销售送货单',
          icon: 'document',
          url: ''
        },
        {
          id: '1-2-4',
          name: '客户资料',
          icon: 'document',
          url: ''
        }
      ]
    },
    {
      id: '1-3',
      name: '仓库管理',
      icon: 'document',
      childs: [
        {
          id: '1-3-1',
          name: '库存查询',
          icon: 'document',
          url: ''
        },
        {
          id: '1-3-2',
          name: '采购收货',
          icon: 'document',
          url: ''
        }
      ]
    }
  ]
},
{
  id: '2',
  name: '生产管理',
  icon: 'icon-menu',
  childs: [
    {
      id: '2-1',
      name: '生产管理',
      icon: 'document'
    },
    {
      id: '2-2',
      name: '工程管理',
      icon: 'document'
    }
  ]
},
{
  id: '3',
  name: '成本管理',
  icon: 'document'
},
{
  id: '4',
  name: '系统设置',
  icon: 'setting'
},
{
  id: '5',
  name: '组件',
  icon: 'icon-menu',
  childs: [
    {
      id: '5-1',
      name: 'Basic基础组件',
      icon: 'icon-menu',
      childs: [
        {
          id: '5-1-1',
          name: 'Border边框',
          url: '/Border',
          icon: 'icon-menu'
        },
        {
          id: '5-1-2',
          name: 'Button按钮',
          url: '/Button',
          icon: 'icon-menu'
        }
      ]
    },
    {
      id: '5-2',
      name: '配置组件',
      icon: 'icon-menu'
    }
  ]
},
{
  id: '6',
  name: 'About',
  icon: 'icon-menu',
  url: '/about'
}]

interface routerLinkObject{
  path: string,
  name: string,
  params: never,
  query: never
}

interface MenuItemClickEventParmar {
  id: string,
  name: string,
  icon: string,
  url: routerLinkObject,
  hasChild: boolean,
  hasUrl: boolean
}

export default defineComponent({
  data () {
    return {
      menuData: menuData,
      isCollapse: false,
      selectedMenu: {
        indexPath: []
      }
    }
  },
  components: {
    myMenu: menu
  },
  setup () {
    // const handleOpen = (key: unknown, keyPath: unknown) => {
    //   console.log(key, keyPath)
    // }
    // const handleClose = (key: unknown, keyPath: unknown) => {
    //   console.log(key, keyPath)
    // }
    // return {
    //   handleOpen,
    //   handleClose
    // }
  },
  methods: {
    handleOpen (key: unknown, keyPath: unknown) {
      console.log(key, keyPath)
    },
    handleClose (key: unknown, keyPath: unknown) {
      console.log(key, keyPath)
    },
    handleMenuItemClick (eventParams: any, data: MenuItemClickEventParmar) {
      this.selectedMenu = eventParams
      if (data && data.hasUrl) {
        this.$router.push(data.url)
      }
    }
  },
  mounted () {
    this.$router.push('/home')
  },
  computed: {
    routerPath () {
      var paths = []
      var _data = this.menuData
      for (let i = 0; i < this.selectedMenu.indexPath.length; i++) {
        var _d: any = _data.find(p => p.id === this.selectedMenu.indexPath[i])
        if (_d) {
          _data = _d.childs
          paths.push(_d.name)
        } else {
          break
        }
      }
      if (paths.length === 0) {
        paths = ['Home']
      }
      return paths
    },
    contextClass () {
      console.log(this.$data.isCollapse, this.isCollapse)
      if (this.isCollapse) {
        return 'content content-max'
      }
      // return this.isCollapse ? 'content content-max' : 'content'
      return 'content'
    }
  }
})
</script>

<style lang="scss" scoped>
$headerHeight: 60px;
$asideWidth: 200px;
$elMainPadding: 0px;
$menuPadding: 20px;
$elContainerMarginBottom: 40px;

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  display: inline-flex;
  text-align: start;
  line-height: $headerHeight;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: $asideWidth;
}

.el-main {
  --el-main-padding: $elMainPadding;
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  display: inline-flex;
}

body > .el-container {
  margin-bottom: $elContainerMarginBottom;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  padding: $menuPadding;
}
.el-breadcrumb{
  padding: 0px 20px;
}
.menu {
  height: 100%;
  overflow: overlay;
}
.content {
  height: calc(100% - 20px);
  width: calc(100% - 200px);
  overflow: overlay;
  display: flex;
  flex-direction: column;
}

.content-max{
  width: calc(100% - 64px)
}

.content-body{
  height: 100%;
}
</style>
