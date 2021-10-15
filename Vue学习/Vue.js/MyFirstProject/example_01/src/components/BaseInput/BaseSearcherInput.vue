<template>
    <span>
        <input type="text" v-bind:placeholder="placeholder||'请输入查询条件'" v-on="inputListeners" v-model="val" >
        <button v-on:click="search">{{text||"查询"}}</button>
    </span>
</template>

<script>
export default {
    name:"base-seacher-input",
    data:function name() {
        return {
            val:this.value
        };
    },
    props:{
        value:String,
        text:String,
        placeholder:String,
        onSearch:Function
    },
    methods:{
        search:function(){
            if(this.onSearch&&typeof(this.onSearch)==="function"){
                this.onSearch.call(this,this.$data.val);
            }
        }
    },
    computed:{
        inputListeners:function(){
             // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
            // 我们从父级添加所有的监听器
            this.$listeners);
        }
    }
}
</script>

<style scoped>
    span{
        display: inline-flex;
        width:calc(100% - 10px);
        border: 1px black solid;
        margin:0px 5px;
        border-radius: 5px;
    }

    input{
        flex-grow: 2;
        border:none;
        outline:none;
        padding:6px 5px;
        border-radius:5px 0px 0px 5px ;
    }

    button{
        border:none;
        outline:none;
        border-radius:0 5px 5px 0 ;
    }

    button:focus{
        background-color: rgb(140, 145, 140);
    }

</style>