import { ref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import { defineStore } from 'pinia'
import { DEFAULT_ROUTE, REDIRECT_ROUTE_NAME } from '@/router/constants'
import { TagProps } from '@/types'

const formatTag = (route: RouteLocationNormalized): TagProps => {
  const { name, meta, fullPath, query } = route
  return {
    title: meta.locale || '',
    name: String(name),
    fullPath,
    query,
    ignoreCache: meta.ignoreCache,
  }
}

// 不会添加到tabTag中的路由
const BAN_LIST = [REDIRECT_ROUTE_NAME]

export default defineStore('tabBar', () => {
  const tagList = ref<TagProps[]>([DEFAULT_ROUTE])

  function addTabTag(route: RouteLocationNormalized) {
    if (BAN_LIST.includes(route.name as string)) {
      return
    }

    tagList.value.push(formatTag(route))
  }
  function deleteTag(idx: number) {
    tagList.value.splice(idx, 1)
  }

  function freshTabList(tags: TagProps[]) {
    tagList.value = tags
  }
  function resetTabList() {
    tagList.value = [DEFAULT_ROUTE]
  }

  return {
    tagList,
    addTabTag,
    deleteTag,
    freshTabList,
    resetTabList,
  }
})
