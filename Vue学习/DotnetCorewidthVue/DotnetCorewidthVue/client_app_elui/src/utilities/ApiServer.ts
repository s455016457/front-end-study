import axios, { AxiosResponse } from 'axios'
import { GetValueParams, GetValueResult, PostValueBodyParams, PostValueResult, PutValueResult, PutValueBodyParams, PutValueParams, DeleteValueBodyParams, DeleteValueResult } from './Config/TestApiConfig'

const ApiServer = {
  Test: {
    /**
     * helloWrold Api
     * @returns 预期的值结果
     */
    helloWorld (): Promise<AxiosResponse<string, undefined>> {
      return axios.get('api/Test/helloWorld')
    },
    /**
     * getValue Api
     * @param params 接口传入参数
     * @returns 预期的值结果
     */
    getValue (params: GetValueParams) : Promise<AxiosResponse<GetValueResult, GetValueParams>> {
      return axios.get('api/Test/getValue', {
        params: params
      })
    },
    /**
     * postValue Api
     * @param data 接口Body传入参数
     * @returns 预期的值结果
     */
    postValue (data: PostValueBodyParams) : Promise<AxiosResponse<PostValueResult, PostValueBodyParams>> {
      return axios.post('api/Test/postValue', data, {})
    },
    /**
     * putValue Api
     * @param params url 传入参数
     * @param data 接口Body传入参数
     * @returns 预期的值结果
     */
    putValue (params: PutValueParams, data: PutValueBodyParams) :Promise<AxiosResponse<PutValueResult, PutValueBodyParams>> {
      return axios.put('api/Test/putValue', data, {
        params: params
      })
    },
    /**
     * deleteValue Api
     * @param data 接口Body传入参数
     * @returns 预期的值结果
     */
    deleteValue (data: DeleteValueBodyParams) : Promise<AxiosResponse<DeleteValueResult, DeleteValueBodyParams>> {
      return axios.delete('api/Test/deleteValue', {
        data: data
      })
    }
  }
}

export default ApiServer
