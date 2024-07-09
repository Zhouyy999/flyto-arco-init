<template>
  <div class="content">
    <a-result
      class="result"
      status="404"
      subtitle="你没有当前页面的权限，请联系管理员分配权限"
    >
    </a-result>
  </div>
</template>

<script lang="tsx" setup>
  import { useRouter } from 'vue-router'
  import { useTabBarStore } from '@/store'
  import { getCurrentInstance, ref, h } from 'vue'
  import { ModalReturn } from '@arco-design/web-vue'

  const router = useRouter()
  const tabBarStore = useTabBarStore()

  let modalIns: ModalReturn | undefined
  // eslint-disable-next-line no-undef
  let timer: NodeJS.Timer

  function closePage() {
    const allTabs = tabBarStore.getTabList
    const curTabIdx = allTabs.findIndex(el => {
      return el.fullPath === router.currentRoute.value.fullPath
    })

    modalIns?.close()
    clearInterval(timer)
    router.push(allTabs[curTabIdx - 1].fullPath)
    tabBarStore.deleteTag(curTabIdx, allTabs[curTabIdx])
  }

  const countdown = ref(3)
  modalIns =
    getCurrentInstance()?.appContext.config.globalProperties.$modal.error({
      title: '页面错误',
      maskClosable: false,
      content: () =>
        h('div', { style: 'text-align: center' }, [
          h('div', `页面不存在或权限不足`),
          h('div', `将在${countdown.value}秒后自动关闭页面`),
        ]),
      closable: true,
      okText: '关闭页面',
      onOk: closePage,
    })

  timer = setInterval(() => {
    countdown.value -= 1

    if (countdown.value === 0) {
      clearInterval(timer)
      closePage()
    }
  }, 1000)
</script>

<style scoped lang="less">
  .content {
    // padding-top: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -95px;
    margin-top: -121px;
    text-align: center;
  }
</style>
