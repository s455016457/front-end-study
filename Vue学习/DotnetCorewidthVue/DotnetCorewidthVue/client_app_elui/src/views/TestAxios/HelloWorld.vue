
<template>
  <h1>Axios测试</h1>
  <div>
    <span>{{data.message}}</span>
  </div>
  <div>
    <el-button type="primary" @click="Test">
      <el-icon><Search /></el-icon>
      Test
    </el-button>
  </div>
  <hr>
  <div>
     <el-input v-model="data.getValue.inputValue" placeholder="Please input" />
    {{data.getValue.value}}
  </div>
  <div>
    <el-button type="primary" @click="GetValue">
      <el-icon><Search /></el-icon>
      GetValue
    </el-button>
  </div>
  <hr>
  <div>
     <el-input v-model="data.postValue.bodyData" placeholder="Please input" />
    {{data.postValue.value}}
  </div>
  <div>
    <el-button type="primary" @click="PostValue">
      <el-icon><Search /></el-icon>
      PostValue
    </el-button>
  </div>
  <hr>
  <div>
     <el-input v-model="data.putValue.urlParams" placeholder="Please input url Params" />
     <el-input v-model="data.putValue.bodyData" placeholder="Please input body data" />
    {{data.putValue.value}}
  </div>
  <div>
    <el-button type="primary" @click="PutValue">
      <el-icon><Search /></el-icon>
      PutValue
    </el-button>
  </div>
  <hr>
  <div>
     <el-input v-model="data.deleteValue.bodyData" placeholder="Please input" />
    {{data.deleteValue.value}}
  </div>
  <div>
    <el-button type="primary" @click="DeleteValue">
      <el-icon><Search /></el-icon>
      DeleteValue
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ApiServer from '@/utilities/ApiServer'
import { Search } from '@element-plus/icons'
import { AxiosResponse } from 'axios'
import { DeleteValueBodyParams, DeleteValueResult, GetValueParams, GetValueResult, PostValueBodyParams, PostValueResult, PutValueBodyParams, PutValueParams, PutValueResult } from '@/utilities/Config/TestApiConfig'

export default defineComponent({
  setup () {
    //
  },
  data () {
    return {
      data: {
        message: '',
        getValue: {
          inputValue: '',
          value: ''
        },
        postValue: {
          bodyData: '',
          value: ''
        },
        putValue: {
          urlParams: '',
          bodyData: '',
          value: ''
        },
        deleteValue: {
          bodyData: '',
          value: ''
        }
      }
    }
  },
  components: {
    Search
  },
  methods: {
    Test () {
      ApiServer.Test.helloWorld().then((response: AxiosResponse<string, undefined>) => {
        console.log(response)
        this.data.message = response.data
      })
    },
    GetValue () {
      var params: GetValueParams = {
        value: this.data.getValue.inputValue
      }
      ApiServer.Test.getValue(params).then((response: AxiosResponse<GetValueResult, GetValueParams>) => {
        console.log(response)
        this.data.getValue.value = response.data.data
      })
    },
    PostValue () {
      var bodyData : PostValueBodyParams = {
        value: this.data.postValue.bodyData
      }

      ApiServer.Test
        .postValue(bodyData)
        .then((response: AxiosResponse<PostValueResult, PostValueBodyParams>) => {
          console.log(response)
          this.data.postValue.value = response.data.data
        })
        .catch((reason: any) => {
          console.log(reason)
        })
    },
    PutValue () {
      var params : PutValueParams = {
        id: this.data.putValue.urlParams
      }

      var bodyData : PutValueBodyParams = {
        value: this.data.putValue.bodyData
      }

      ApiServer.Test.putValue(params, bodyData).then((response: AxiosResponse<PutValueResult, PutValueBodyParams>) => {
        console.log(response)
        this.data.putValue.value = response.data.data
      })
    },
    DeleteValue () {
      var bodyData : DeleteValueBodyParams = {
        value: this.data.deleteValue.bodyData
      }

      ApiServer.Test.deleteValue(bodyData).then((response: AxiosResponse<DeleteValueResult, DeleteValueBodyParams>) => {
        console.log(response)
        this.data.deleteValue.value = response.data.data
      })
    }
  }
})
</script>
