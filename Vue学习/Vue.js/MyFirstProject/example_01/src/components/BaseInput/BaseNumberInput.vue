<template>
    <input type="text" v-model="val" v-on="inputListeners">
</template>

<script>
export default {
    name:'base-number-input',
    data:function(){
        return {
            val:this.value||0
        };
    },
    props:{
        value:Number
    },
    computed:{
        inputListeners:function(){
            var vm = this;
            console.log(this.$listeners);
             // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
            // 我们从父级添加所有的监听器
            this.$listeners,
            // 然后我们添加自定义监听器，
            // 或覆写一些监听器的行为
            {
                input:function(){
                    var v = vm.$data.val;
                    v = v.replace(/[^0-9.,]/ig,"");
                    vm.$data.val=v;
                    vm.$emit('input');
                }
            });
        }
    }
}
</script>

<style lang="css" scoped>

</style>