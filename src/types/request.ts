import { AxiosRequestConfig } from 'axios'

export interface StandardRequestConfig<T = any> extends AxiosRequestConfig<T> {
  // 打开加载全屏遮罩
  openLoading?: boolean
  // 忽略请求成功提示
  ignoreSuccessMsg?: boolean
  // 忽略请求错误提示
  ignoreErrorMsg?: boolean
  // 是否忽略采用标准响应结构的回调处理
  ignoreStandardHandler?: boolean
}

export interface StandardHttpResponse<T = unknown> {
  Code: number
  Success: boolean
  Message: string | number | null | undefined
  Data: T
}
