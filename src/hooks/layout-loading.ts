import { Ref, ref } from 'vue'
import useLoding from './loading'

interface WarpLoading {
  loading: Ref<boolean>
  setLoading: (value: boolean) => void
  toggle: () => void
  tip: Ref<string>
}

// 针对一部分需要整个显示loading状态组件的场景
// 因为这些组件可能为全局或者局部包裹组件，在控制显示时，使用同一个ref，所以值的定义在外层
// 例如：全局loading：在请求时，在某些时候需要一个整体的遮罩，来确保用户在请求完成前不会进行操作
const globalLoading: WarpLoading = {
  ...useLoding(),
  tip: ref('请稍等...'),
}

export function useLayoutLoading() {
  // 全局loading标识，挂载到App.vue的spin上
  const globalLoadingFlag = globalLoading.loading
  function toggleGlobalLoading(value?: boolean): void {
    globalLoading.setLoading(value ?? !globalLoadingFlag.value)
  }
  const globalLoadingTip = globalLoading.tip
  function setGlobalLoadingTip(value: string) {
    globalLoadingTip.value = value
  }

  return {
    globalLoadingFlag,
    toggleGlobalLoading,
    globalLoadingTip,
    setGlobalLoadingTip,
  }
}

export default null
