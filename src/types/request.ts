import { AxiosRequestConfig } from 'axios'

export interface StandardRequestConfig extends AxiosRequestConfig {
  // 打开加载全屏遮罩
  openLoading?: boolean
  // 忽略请求成功提示
  ignoreSuccessMsg?: boolean
  // 忽略请求错误提示
  ignoreErrorMsg?: boolean
}

export interface StandardHttpResponse<T = unknown> {
  Code: number
  Success: boolean
  Message: string | number | null | undefined
  Data: T
}
