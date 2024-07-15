import {
  Message,
  MessageConfig,
  MessageReturn,
  Modal,
  ModalConfig,
  ModalReturn,
} from '@arco-design/web-vue'
import { RenderContent } from '@arco-design/web-vue/es/_utils/types'

const DEFAULT_CLOSE_TIME = 2500

export type NoifyType = 'success' | 'error' | 'warning' | 'info' | 'normal'

function notify(
  message: RenderContent,
  type?: NoifyType,
  config?: Omit<MessageConfig, 'content'>,
): void
function notify(config: MessageConfig, type?: NoifyType)
/**
 * 一个简单的提示
 * @param configOrMessage 提示内容或者配置，
 *                        RenderContent => 提示内容
 *                        MessageConfig => 配置项
 * @param type 提示类型
 * @param config 配置项 等同于 MessageConfig
 */
function notify(
  configOrMessage: RenderContent | MessageConfig,
  type?: NoifyType,
  config?: Omit<MessageConfig, 'content'>,
): MessageReturn {
  const options: MessageConfig = {
    duration: DEFAULT_CLOSE_TIME,
    content: '',
  }

  if (
    typeof configOrMessage === 'string' ||
    typeof configOrMessage === 'function'
  ) {
    options.content = configOrMessage
    Object.assign(options, config)
  } else {
    Object.assign(options, configOrMessage)
  }

  return Message[type || 'info'](options)
}

export type ModelNoifyType = 'success' | 'error' | 'warning' | 'info'

function modelNotify(
  message: RenderContent,
  type?: ModelNoifyType,
  config?: Omit<ModalConfig, 'content'>,
  _isConfirm?: boolean,
)
function modelNotify(
  config: ModalConfig,
  type?: ModelNoifyType,
  _isConfirm?: boolean,
)
/**
 * 弹出的提示
 * @param configOrMessage 提示内容或者配置，
 *                        RenderContent => 提示内容
 *                        MessageConfig => 配置项
 * @param type 提示类型
 * @param configOrIsConfirm 配置项或者是否为确认框
 *                        ModalConfig => 配置项
 *                        boolean => 是否为确认框
 * @param _isConfirm 是否为确认框
 */
function modelNotify(
  configOrMessage: RenderContent | ModalConfig,
  type?: ModelNoifyType,
  configOrIsConfirm?: Omit<ModalConfig, 'content'> | boolean,
  _isConfirm?: boolean,
): ModalReturn {
  const options: ModalConfig = {
    content: '',
    hideCancel: true,
    title: '提示',
  }
  let isConfirm = false

  if (
    typeof configOrMessage === 'string' ||
    typeof configOrMessage === 'function'
  ) {
    options.content = configOrMessage
    Object.assign(options, configOrIsConfirm)
    isConfirm = Boolean(_isConfirm)
  } else {
    Object.assign(options, configOrMessage)
    isConfirm = Boolean(configOrIsConfirm)
  }

  return Modal[type || 'info']({
    ...options,
    hideCancel: !isConfirm,
  })
}

function alert(
  configOrMessage: RenderContent | ModalConfig,
  type?: ModelNoifyType,
  config?: ModalConfig,
) {
  if (
    typeof configOrMessage === 'string' ||
    typeof configOrMessage === 'function'
  ) {
    return modelNotify(configOrMessage, type, config, false)
  }

  return modelNotify(configOrMessage, type, false)
}
function confirm(
  configOrMessage: RenderContent | ModalConfig,
  type?: ModelNoifyType,
  config?: ModalConfig,
) {
  if (
    typeof configOrMessage === 'string' ||
    typeof configOrMessage === 'function'
  ) {
    return modelNotify(configOrMessage, type, config, true)
  }

  return modelNotify(configOrMessage, type, true)
}

export { notify, alert, confirm }
