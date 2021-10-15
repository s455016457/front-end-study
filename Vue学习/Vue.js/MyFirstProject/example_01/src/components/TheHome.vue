<template>
    <div class="hello">
      <p>
        获取有关如何配置/自定义此项目的指南和配方,<br>
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli 文档</a>.
      </p>
      <h3>已安装的 CLI 插件</h3>
      <ul>
        <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
        <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      </ul>
      <h3>必要的连接</h3>
      <ul>
        <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
        <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
        <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
        <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
      </ul>
      <h3>生态系统</h3>
      <ul>
        <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
        <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
        <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
        <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
        <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
      </ul>
    </div>    
</template>

<script>
export default {
    name:'home'    
}
</script>
<!-- 添加 "scoped" 属性指定CSS只能用于改组件 -->
<style scoped>
.main h3 {
  margin: 40px 0 0;
}
.main ul {
  list-style-type: none;
  padding: 0;
}
.main li {
  display: inline-block;
  margin: 0 10px;
}
.main a {
  color: #42b983;
}
</style>