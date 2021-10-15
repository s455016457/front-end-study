# [Vue.js](https://cn.vuejs.org/v2/guide/index.html)

Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

## [Vue调试工具](https://github.com/vuejs/vue-devtools#vue-devtools)

[Chrome扩展](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)/（[测试版频道](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)）

[获取独立的Electron应用程序（可在任何环境下使用！）](https://github.com/vuejs/vue-devtools/blob/dev/packages/shell-electron/README.md)

### 强制启动devtools

``` javascript
// 在创建App之前
Vue.config.devtools = process.env.NODE_ENV === 'development'

// 在创建App之后
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor

// 然后在./store.js中添加
Vue.config.devtools = process.env.NODE_ENV === 'development'
```

## [Vue CLI](https://cli.vuejs.org/zh/guide/)

Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供：

* 通过`@vue/cli`实现的交互式的项目脚手架。
* 通过 `@vue/cli` + `@vue/cli-service-global` 实现的零配置原型开发。
* 一个运行时依赖 (`@vue/cli-service`)，该依赖：
  * 可升级；
  * 基于 webpack 构建，并带有合理的默认配置；
  * 可以通过项目内的配置文件进行配置；
  * 可以通过插件进行扩展。
* 一个丰富的官方插件集合，集成了前端生态中最好的工具。
* 一套完全图形化的创建和管理 Vue.js 项目的用户界面。

### CLI

CLI (`@vue/cli`) 是一个全局安装的 npm 包，提供了终端里的 `vue` 命令。它可以通过 `vue create` 快速搭建一个新项目，或者直接通过 `vue serve` 构建新想法的原型。你也可以通过 `vue ui` 通过一套图形化界面管理你的所有项目。我们会在接下来的指南中逐章节深入介绍。

## 安装Vue CLI

可以使用下列任一命令安装这个新的包：

```sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

你还可以用这个命令来检查其版本是否正确：

```sh
vue --version
```

> 原npm地址
>
> ```sh
> npm config set registry http://registry.npmjs.org
> ```
>
> 设置国内镜像
>
> ```sh
> npm config set registry https://registry.npm.taobao.org
> ```
>