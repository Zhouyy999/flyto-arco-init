import { StandardHttpResponse } from '@types'
import debug from './env'

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  if (mock !== false && debug) {
    setup()
  }
}

export const successResponseWrap = (data: unknown): StandardHttpResponse => {
  return {
    Data: data,
    Success: true,
    Message: '请求成功',
    Code: 0,
  }
}

export const failResponseWrap = (
  data: unknown,
  msg: string,
  code = 1,
): StandardHttpResponse => {
  return {
    Data: data,
    Success: false,
    Message: msg || '请求失败',
    Code: code || 1,
  }
}
