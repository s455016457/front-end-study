<template>
    <div>
        <h3>基础输入框示例</h3>
        <h5>数字输入框</h5>
        <number-input v-bind:value="123" />
        <br>
        <h5>查询输入框</h5>
        <searcher-input v-bind:onSearch="search" />
    </div>
</template>

<script>

import NumberInput from './BaseInput/BaseNumberInput.vue'
import SearcherInput from './BaseInput/BaseSearcherInput'

export default {
    name:'theBaseInput',
    components:{
        NumberInput,
        SearcherInput
    },
    methods:{
        search:function(value){
            console.log("base input search:","search【"+value+"】");
        }
    }
}
</script>

<style lang="css" scoped>

</style>