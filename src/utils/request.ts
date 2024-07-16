import { h } from 'vue'
import { ButtonProps } from '@arco-design/web-vue'
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { StandardHttpResponse, StandardRequestConfig } from '@types'
import { useLayoutLoading } from '@/hooks/layout-loading'
import { notify, alert } from './notify'

const SUCCESS_CODE = 0
const DEFAULT_AXIOS_CONFIG: AxiosRequestConfig = {
  timeout: 1000 * 60 * 2,
  method: 'post',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8',
  },
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

  alert(
    {
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
        alert(
          {
            title: `${typeLable}提示`,
            content: errMsg,
            okText: '确认',
            okButtonProps: confirmBtnProps,
            maskClosable: false,
            escToClose: false,
            modalClass: 'req-error-modal',
          },
          'error',
        )
      },
    },
    'error',
  )
}

// 全局遮罩层处理
const warpLoading = useLayoutLoading()
let tiemerId: NodeJS.Timer
const closeLoading = () => {
  // 遮罩延迟50毫秒关闭
  // 如果有两个连续的请求，这样动画就不会中断，体验感会比较好
  tiemerId = setTimeout(() => {
    warpLoading.toggleGlobalLoading(false)
  }, 10)
}

// 创建一个经过对拦截器进行了一些逻辑处理的请求方法
export const instance = axios.create(DEFAULT_AXIOS_CONFIG)
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
    warpLoading.toggleGlobalLoading(true)
  }

  if (config.method === 'get' || config.method === 'GET') {
    config.params = config.data
  }

  return config
})
instance.interceptors.response.use(
  (
    response: AxiosResponse & {
      config: StandardRequestConfig
    },
  ) => {
    closeLoading()

    const { config } = response
    const {
      ignoreErrorMsg = false,
      ignoreSuccessMsg = true,
      ignoreStandardHandler = false,
    } = config

    // 定义一个标准的错误处理
    if (!ignoreStandardHandler) {
      const data = response.data as StandardHttpResponse<StandardHttpResponse>
      const message = data.Message ? String(data.Message) : ''

      if (data.Code === SUCCESS_CODE && data.Success) {
        if (!ignoreSuccessMsg) {
          notify(message || '成功', 'success')
        }
      } else if (!ignoreErrorMsg) {
        showErrTips(message || '错误，请联系相关人员！', 'then')
        throw data
      }
    }

    return response
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

async function request<D = any, T = StandardHttpResponse<D>>(
  url: string,
  config?: StandardRequestConfig,
): Promise<T>
async function request<D = any, T = StandardHttpResponse<D>>(
  config: StandardRequestConfig,
): Promise<T>
/**
 * 一个标准的，通用的请求方法
 * @template D 返回的值中，data的类型（例如StandardHttpResponse中的Data）
 * @template T 返回值的类型，默认为StandardHttpResponse
 * @param urlOrConfig 请求地址或者请求配置
 * @param config 请求配置（仅在 urlOrConfig 为请求地址时生效）
 */
async function request<D = any, T = StandardHttpResponse<D>>(
  urlOrConfig: string | StandardRequestConfig,
  config?: StandardRequestConfig,
): Promise<T> {
  const params: StandardRequestConfig =
    typeof urlOrConfig === 'string'
      ? {
          method: 'post',
          ...config,
          url: urlOrConfig,
        }
      : urlOrConfig

  const res: T = (await instance(params)).data

  return res
}

export default request
