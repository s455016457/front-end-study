<template>
  <div class="main">
    <div class="top"><h3>{{ msg }}</h3></div>
    <div class="body">
    <div class="left">
      <div>
        <h4>菜单</h4>
      </div>
      <Menu v-on:menumItemSelectedChange="menumItemSelectedChange" />
    </div>
    <div class="center">
     <home class="body" name="Home" v-bind:class="{'body-show':selectCenter === 'Home'}" />
     <the-base-input class="body" name="BaseInput" v-bind:class="{'body-show':selectCenter === 'BaseInput'}" />
    </div>
    </div>
  </div>
</template>

<script>
import Menu from './TheMenu.vue';
import Home from './TheHome.vue';
import TheBaseInput from './TheBaseInput.vue';

export default {
  name: 'HelloWorld',
  data:function(){
    return {
      selectCenter:'Home'
    };
  },
  components: {
    Menu,
    Home,
    TheBaseInput
  },
  props: {
    msg: String
  },
  methods:{
    menumItemSelectedChange:function(event,item){
      console.log(this,event,item);
      this.$data.selectCenter=item.id;
    }
  }
}
</script>

<!-- 添加 "scoped" 属性指定CSS只能用于改组件 -->
<style scoped>
.main{
  width:100%;
  height: 100%;
  margin: 0px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 50px calc(100% - 50px);
}

.top{
  grid-column-start:span 2;
  color: #ecf0f1;
  background-color: #2c3e50;
  align-items: center;
  display: inline-flex;
}

.top h3{
  margin: 0px 10px;
}

.body{
  width:100%;
  height: 100%;
  margin: 0px;
  display: grid;
  grid-template-columns: 240px calc(100% - 240px);
}

.left{
  background-color: #34495e;
}

.left h4{
  margin: 5px;
  color: #ecf0f1;
}
.center{
  overflow: hidden;
}
.center .body{
  display:none;
}

.center .body-show{
  display: block;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
