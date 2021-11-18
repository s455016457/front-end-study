import axios from 'axios';
const ApiServer = {
    Test: {
        /**
         * helloWrold Api
         * @returns 预期的值结果
         */
        helloWorld() {
            return axios.get('api/Test/helloWorld');
        },
        /**
         * getValue Api
         * @param params 接口传入参数
         * @returns 预期的值结果
         */
        getValue(params) {
            return axios.get('api/Test/getValue', {
                params: params
            });
        },
        /**
         * postValue Api
         * @param data 接口Body传入参数
         * @returns 预期的值结果
         */
        postValue(data) {
            return axios.post('api/Test/postValue', data, {});
        },
        /**
         * putValue Api
         * @param params url 传入参数
         * @param data 接口Body传入参数
         * @returns 预期的值结果
         */
        putValue(params, data) {
            return axios.put('api/Test/putValue', data, {
                params: params
            });
        },
        /**
         * deleteValue Api
         * @param data 接口Body传入参数
         * @returns 预期的值结果
         */
        deleteValue(data) {
            return axios.delete('ap/Test/deleteValue', {
                data: data
            });
        }
    }
};
export default ApiServer;
//# sourceMappingURL=ApiServer.js.map