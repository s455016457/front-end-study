<template>
    <div class="menu">
        <div v-for="item in items" :key="item.title">
            <MenuItem v-bind:item="item" v-on:click="itemClick" />
        </div>
    </div>
</template>

<script>
    import MenuItem from './TheMenuItem.vue'
    export default {
        name:'myMenu',
        components: {
            MenuItem
        },
        data:function(){
            return {
                items:[{
                    id:'Home',
                    icon:'',
                    title:'家',
                    descr:'Home Descr',
                    selected:true
                },{
                    id:'BaseInput',
                    icon:'',
                    title:'输入框组件',
                    descr:'输入框组件 Descr',
                    selected:false
                }]
            };
        },
        methods:{
            itemClick:function(event){
                var vm = this;
                if(event){
                    var text = event.currentTarget.textContent;
                    var seletedItem = this.$data.items.filter(function(item){return item.selected===true;});
                    var item = this.$data.items.filter(function(item){return item.title===text});
                    if(seletedItem!=item){
                        if(seletedItem.length>0)
                        seletedItem[0].selected=false;
                        item[0].selected=true;

                        vm.$emit('menumItemSelectedChange',event,item[0]);
                    }
                }
            }
        }
    }
</script>

<style scoped>
.menu{
    padding: 10px 0px;
}
</style>