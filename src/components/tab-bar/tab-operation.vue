<template>
  <a-dropdown
    v-model:popup-visible="dropVisible"
    :popup-max-height="false"
    position="tr"
    @select="actionSelect"
    @popup-visible-change="onPopupVisibleChange"
  >
    <icon-apps
      class="operation-icon"
      :class="dropVisible ? 'operation-icon--active' : ''"
    />
    <template #content>
      <a-doption
        v-for="item in operationList"
        :key="item.action"
        :value="item.action"
        :disabled="item.disabled || false"
      >
        <component :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
  import { type Component, computed, reactive, markRaw, ref } from 'vue'
  import { Eaction } from '@enum'
  import {
    IconToLeft,
    IconToRight,
    IconSwap,
    IconFolderDelete,
  } from '@arco-design/web-vue/es/icon'
  import { useTabBarStore } from '@/store'
  import { TagProps } from '@/types'
  import { useRoute, useRouter } from 'vue-router'
  import { DEFAULT_ROUTE_NAME } from '@/router/constants'

  const tabBarStore = useTabBarStore()
  const route = useRoute()
  const router = useRouter()

  const dropVisible = ref(false)

  // 在下拉框显示时，才计算当前标签数据
  const curTabTag = ref<{
    idx: number
    tag: TagProps
  }>()
  function onPopupVisibleChange(visible: boolean): void {
    if (!visible) {
      return
    }
    const { fullPath } = route

    const idx = tabBarStore.tagList.findIndex(tag => tag.fullPath === fullPath)
    curTabTag.value = {
      idx,
      tag: tabBarStore.tagList[idx],
    }
  }

  // 下拉操作项列表
  const operationList: {
    label: string
    action: Eaction
    icon: Component
    disabled?: boolean
  }[] = reactive([
    {
      label: '关闭左侧页面',
      action: Eaction.left,
      icon: markRaw(IconToLeft),
      disabled: computed(
        () => !curTabTag.value?.idx || [0, 1].includes(curTabTag.value.idx),
      ),
    },
    {
      label: '关闭右侧页面',
      action: Eaction.right,
      icon: markRaw(IconToRight),
      disabled: computed(
        () =>
          !curTabTag.value?.idx ||
          curTabTag.value.idx === tabBarStore.tagList.length - 1,
      ),
    },
    {
      label: '关闭其他页面',
      action: Eaction.others,
      icon: markRaw(IconSwap),
    },
    {
      label: '关闭全部页面',
      action: Eaction.all,
      icon: markRaw(IconFolderDelete),
    },
  ])

  // 操作项具体逻辑
  function actionSelect(value: any) {
    const curTabTagIdx = curTabTag.value?.idx
    const copyTagList = [...tabBarStore.tagList]

    if (curTabTagIdx && value === Eaction.left) {
      copyTagList.splice(1, curTabTagIdx - 1)
      tabBarStore.freshTabList(copyTagList)
    } else if (curTabTagIdx && value === Eaction.right) {
      copyTagList.splice(curTabTagIdx + 1)
      tabBarStore.freshTabList(copyTagList)
    } else if (value === Eaction.others) {
      const filterList = copyTagList.filter(
        (_el, idx) => idx === 0 || idx === curTabTagIdx,
      )
      tabBarStore.freshTabList(filterList)
    } else if (value === Eaction.all) {
      tabBarStore.resetTabList()
      router.push({ name: DEFAULT_ROUTE_NAME })
    }
  }
</script>

<style scoped>
  .operation-icon {
    cursor: pointer;
    transform: rotate(0deg);
    transition: transform 0.3s ease;
    &.operation-icon--active {
      transform: rotate(180deg);
    }
  }
</style>
