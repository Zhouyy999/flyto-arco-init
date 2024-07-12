import { h } from 'vue'
import { Modal, ModalReturn, ModalConfig, Spin } from '@arco-design/web-vue'
import { RenderContent } from '@arco-design/web-vue/es/_utils/types'

/**
 * 函数节流
 * @param {Function} fn: 函数
 * @param {Number} time: 节流时间
 * @return {Function} 处理后的函数
 */
export function throttle(fn: (...args: any[]) => any, time = 1000) {
  let flag = true

  // eslint-disable-next-line func-names
  return function (...args) {
    if (flag) {
      flag = false
      fn(...args)
      setTimeout(() => {
        flag = true
      }, time)
    }
  }
}

/**
 * 函数防抖
 * @param {Function} fn: 函数
 * @param {Number} time: 防抖时间
 * @return {Function} 处理后的函数
 */
export function debounce(fn, time = 1000) {
  let timeLock: NodeJS.Timeout

  // eslint-disable-next-line func-names
  return function (...args) {
    clearTimeout(timeLock)
    timeLock = setTimeout(() => {
      fn(...args)
    }, time)
  }
}

/**
 * 打开一个挂载在指定容器下并且铺满容器的loading层
 * @param {String | HTMLElement} container: 指定容器
 * @param {String} laodingTips: 提示语
 * @param {ModalConfig} config: 配置项
 * @returns {ModalReturn} 返回Modal的实例，如果需要关闭loading层，需要手动调用.close()
 */
export function openFullLoading(
  container?: string | HTMLElement,
  laodingTips?: string,
  config?: ModalConfig,
): ModalReturn {
  return Modal.info({
    hideTitle: true,
    content: () => h(Spin, { size: 50, tip: laodingTips }),
    modalClass: 'full-loading-modal',
    popupContainer: container,
    // 此处必须要显式的声明true，不然不能挂载到指定的container上
    renderToBody: true,
    maskClosable: false,
    escToClose: false,
    ...config,
  })
}

/**
 * url校验
 * @param {String} url: 需校验的url
 */
export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i',
)

/**
 * 通过window.open来打开一个窗口
 *
 * @param {string} url - 窗口地址
 * @param {Object} opts - window。open方法的配置项
 */
export const openWindow = (
  url: string,
  opts?: {
    target?: '_self' | '_parent' | '_blank' | '_top'
    [key: string]: any
  },
) => {
  const { target = '_blank', ...others } = opts || {}
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue
        return [...preValue, `${key}=${value}`]
      }, [])
      .join(','),
  )
}
