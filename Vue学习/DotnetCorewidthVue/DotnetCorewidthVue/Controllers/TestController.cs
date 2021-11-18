using DotnetCoreWidthVue.Models.RequestParams;
using DotnetCoreWidthVue.Models.ResponseResult;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotnetCoreWidthVue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        [Route("helloWorld")]
        public string Test()
        {
            return "hello world";
        }

        /// <summary>
        /// 测试get请求获取值
        /// </summary>
        /// <param name="value">传入参数</param>
        /// <returns></returns>
        [HttpGet]
        [Route("getValue")]
        public MessageResultModel GetValue(string value)
        {
            return new MessageResultModel
            {
                Data = $"server return post value:{value} {DateTime.Now.ToLongTimeString()}",
                Code = ResultCode.Ok,
                Message = "请求成功"
            };
        }
        /// <summary>
        /// 测试post请求
        /// </summary>
        /// <param name="valueParams">传入参数</param>
        /// <returns></returns>
        [HttpPost]
        [Route("postValue")]
        public MessageResultModel PostValue([FromBody] CommonValueParams valueParams)
        {
            return new MessageResultModel
            {
                Data = $"server return post value:{valueParams.Value} {DateTime.Now.ToLongTimeString()}",
                Code = ResultCode.Ok,
                Message = "请求成功"
            };
        }
        /// <summary>
        /// 测试put请求
        /// </summary>
        /// <param name="id">id</param>
        /// <param name="valueParams">valueParams</param>
        /// <returns></returns>
        [HttpPut]
        [Route("putValue")]
        public MessageResultModel PutValue([FromQuery]string id, [FromBody] CommonValueParams valueParams)
        {
            return new MessageResultModel
            {
                Data = $"server return put id:{id}  value:{valueParams.Value} {DateTime.Now.ToLongTimeString()}",
                Code = ResultCode.Ok,
                Message = "请求成功"
            };
        }
        /// <summary>
        /// 测试delete请求
        /// </summary>
        /// <param name="valueParams">传入参数</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("deleteValue")]
        public MessageResultModel DeleteValue([FromBody] CommonValueParams valueParams)
        {
            return new MessageResultModel
            {
                Data = $"server return post value:{valueParams.Value} {DateTime.Now.ToLongTimeString()}",
                Code = ResultCode.Ok,
                Message = "请求成功"
            };
        }
    }
}
