using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotnetCoreWidthVue.Models.ResponseResult
{
    /// <summary>
    /// 返回Model基类
    /// </summary>
    public abstract class BaseResultModel<T>
    {
        /// <summary>
        /// 数据
        /// </summary>
        public T Data { get; set; }
        /// <summary>
        /// 返回代码
        /// </summary>
        public ResultCode Code { get; set; }
        /// <summary>
        /// 消息
        /// </summary>
        public string Message { get; set; }
    }
    /// <summary>
    /// 返回代码
    /// </summary>
    public enum ResultCode
    {
        /// <summary>
        /// 请求成功
        /// </summary>
        Ok=200,
        /// <summary>
        /// 业务失败
        /// </summary>
        Failure=401,
        /// <summary>
        /// 没有授权
        /// </summary>
        Untrusted=403,
        /// <summary>
        /// 服务端错误
        /// </summary>
        ServerError = 500
    }
}
