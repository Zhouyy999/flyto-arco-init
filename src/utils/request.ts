import { h } from 'vue'
import {
  Modal,
  type ModalReturn,
  Message,
  ButtonProps,
} from '@arco-design/web-vue'
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { StandardHttpResponse, StandardRequestConfig } from '@types'
import { openFullLoading } from '@/utils/common'

const SUCCESS_CODE = 0

const DEFAULT_AXIOS_CONFIG: AxiosRequestConfig = {
  timeout: 1000 * 60 * 2,
  method: 'post',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8',
  },
}
const instance = axios.create(DEFAULT_AXIOS_CONFIG)

// 全局遮罩层处理
let loadingIns: ModalReturn | null
let tiemerId: NodeJS.Timer
const closeLoading = () => {
  // 遮罩延迟50毫秒关闭
  // 如果有两个连续的请求，这样动画就不会中断，体验感会比较好
  tiemerId = setTimeout(() => {
    loadingIns?.close?.()
    loadingIns = null
  }, 50)
}
// 显示错误提示
function showErrTips(errMsg: string, type: 'then' | 'catch') {
  // 消息长度大于500，并且包含exception关键词，不直接提示详情
  // 此类错误一般都是后端的代码方法的错误提示，一般不直接展示给到用户显示
  const isLongMsg = errMsg.length > 500 && errMsg.indexOf('exception') !== -1
  const typeLable = type === 'then' ? '错误' : '系统错误'

  const tipsVNode = h(
    'div',
    isLongMsg
      ? [
          h('p', `${typeLable}，请联系相关人员`),
          h(
            'p',
            { class: 'err-tips-desc' },
            '可点击[查看详细]查看报错详细信息',
          ),
        ]
      : h('p', errMsg),
  )
  const confirmBtnProps: ButtonProps = {
    status: 'danger',
  }

  Modal.error({
    title: `${typeLable}提示`,
    content: () => tipsVNode,
    okText: '确认',
    okButtonProps: confirmBtnProps,
    cancelText: '查看详细',
    maskClosable: false,
    escToClose: false,
    modalClass: 'req-error-modal',
    hideCancel: !isLongMsg,
    onCancel: () => {
      Modal.error({
        title: `${typeLable}提示`,
        content: errMsg,
        okText: '确认',
        okButtonProps: confirmBtnProps,
        maskClosable: false,
        escToClose: false,
        modalClass: 'req-error-modal',
      })
    },
  })
}

// 在发送请求之前做些什么 (后期可以对请求参数进行处理)
instance.interceptors.request.use((config: StandardRequestConfig) => {
  // 合并默认值
  Object.assign(config, {
    openLoading: config.openLoading ?? true,
    method: config.method ?? 'POST',
  })

  // 打开遮罩
  if (config.openLoading) {
    // 如果下一个请求马上进来了，则清除掉计时器
    clearTimeout(tiemerId)
    loadingIns = loadingIns || openFullLoading()
  }

  if (config.method === 'get' || config.method === 'GET') {
    config.params = config.data
  }

  return config
})

instance.interceptors.response.use(
  (
    response: AxiosResponse<StandardHttpResponse> & {
      config: StandardRequestConfig
    },
  ) => {
    closeLoading()

    const { config, data } = response
    const { ignoreErrorMsg = false, ignoreSuccessMsg = true } = config

    const message = data.Message ? String(data.Message) : ''

    if (data.Code === 0 && data.Success === true) {
      if (!ignoreSuccessMsg) {
        Message.success(message || '成功')
      }
    } else if (!ignoreErrorMsg) {
      showErrTips(message || '错误，请联系相关人员！', 'then')

      //   throw data
    }

    return data
  },
  err => {
    closeLoading()

    if (err.config.ignoreErrorMsg) {
      showErrTips(
        err.Message ? String(err.Message) : '错误，请联系相关人员！',
        'catch',
      )
    }

    return err
  },
)

// 经过处理的请求方法
// 对拦截器进行了一些逻辑处理，config参数类型为 StandardRequestConfig
export const cAxios = instance

/**
 * 返回值为 StandardHttpResponse (约定的标准返回类型)类型的请求方法
 * 泛型 T ，定义 StandardHttpResponse.Data 的类型
 * @param urlOrConfig 请求地址或者请求配置
 * @param config 请求配置（仅在 urlOrConfig 为请求地址时生效）
 */
async function request(url: string, config: StandardRequestConfig)
async function request(config: StandardRequestConfig)
async function request<T>(
  urlOrConfig: string | StandardRequestConfig,
  config?: StandardRequestConfig,
) {
  const res: StandardHttpResponse<T> = (
    typeof urlOrConfig === 'string'
      ? await instance(urlOrConfig, config)
      : await instance(urlOrConfig)
  ).data

  if (res.Code === SUCCESS_CODE && res.Success) {
    return res
  }

  throw res
}

export default request
