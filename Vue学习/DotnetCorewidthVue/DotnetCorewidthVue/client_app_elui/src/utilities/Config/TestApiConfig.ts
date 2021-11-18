/**
 * 通用值传入参数
 */
export interface CommonValueParams {
  value: string
}

/**
 * 通用消息返回结果
 */
export interface BaseResult {
  message: string
  code: number
}

/**
 * getValue Api 传入参数
 */
export interface GetValueParams {
  /**
   * 传入值
   */
  value: string
}

/**
 * getValue Api 返回结果
 */
export interface GetValueResult extends BaseResult {
  /**
   * 返回的数据
   */
  data: string
}

/**
 * PostValue Api 传入参数
 */
export type PostValueBodyParams = CommonValueParams

/**
 * PostValue Api 返回结果
 */
export interface PostValueResult extends BaseResult {
  data: string
}

export interface PutValueParams {
  id: string
}

export type PutValueBodyParams = CommonValueParams
export interface PutValueResult extends BaseResult {
  data: string
}
export type DeleteValueBodyParams = CommonValueParams
export interface DeleteValueResult extends BaseResult {
  data: string
}
