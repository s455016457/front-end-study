<template>
    <div class="menu-item" v-bind:class="{'menu-item-selected':item.selected}" v-on="itemListeners">
        <div>
            <img v-bind:src="icon">
        </div>
        <div>
            <span v-bind:title="descr">{{title}}</span>
        </div>
        <div>
            <div class="rightIcon" style="width:20pd;height:20px"></div>
        </div>
    </div>
</template>

<script lang="ts">
export default{
    name:'menu-item',
    data:function(){
        return {
            icon:this.item.icon||'',
            title:this.item.title||'',
            descr:this.item.descr||''
        };
    },
    props:{
        item:{
            icon:String,
            title:String,
            descr:String,
            selected:Boolean
        }
    },
    computed:{
        itemListeners:function(){
            var vm = this;
             // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
            // 我们从父级添加所有的监听器
            this.$listeners,
            // 然后我们添加自定义监听器，
            // 或覆写一些监听器的行为
            {
                click:function(event){
                    vm.$emit('click',event);
                }
            });
        }
    }
}
</script>

<style scoped>
.menu-item{
    height :30px;
    display :grid;
    grid-template-columns :30px calc(100% - 40px) 10px;
    grid-template-rows :30px;
    justify-items:flex-start;
    align-items: center;
    color: whitesmoke;
    cursor: pointer;
    background-color:#34495e;
    width:initial;
    padding: 10px 0px 10px 10px;
    margin: 0px;
    overflow: hidden;
}

.menu-item:hover{
    background-color:#2c3e50;
}

.menu-item-selected{
    background-color:#2c3e50;
}

.menu-item-selected .rightIcon{
    background-color: white;
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
}
</style>