<template>
  <div class="tab-bar-container">
    <a-affix ref="affixRef" :offset-top="60">
      <div class="tab-bar-box">
        <div class="tab-bar-scroll">
          <div class="tags-wrap">
            <TabItem
              v-for="(tag, index) in tabBarStore.tagList"
              :key="tag.fullPath"
              :index="index"
              :item-data="tag"
            />
          </div>
        </div>
        <div class="tag-bar-operation">
          <IconRefresh @click="refreshCurPage"></IconRefresh>
          <TabOperation></TabOperation>
        </div>
      </div>
    </a-affix>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onUnmounted } from 'vue'
  import { useRouter, useRoute, type RouteLocationNormalized } from 'vue-router'
  import { listenerRouteChange, removeRouteListener } from '@utils'
  import { useTabBarStore } from '@store'
  import { RELOAD_ROUTE_NAME } from '@/router/constants'
  import TabItem from './tab-item.vue'
  import TabOperation from './tab-operation.vue'

  const tabBarStore = useTabBarStore()
  const route = useRoute()
  const router = useRouter()

  const affixRef = ref()

  listenerRouteChange((route: RouteLocationNormalized) => {
    if (
      !route.meta.noTabBar &&
      !tabBarStore.tagList.some(tag => tag.fullPath === route.fullPath)
    ) {
      tabBarStore.addTabTag(route)
    }
  }, true)

  async function refreshCurPage() {
    await router.push({
      name: RELOAD_ROUTE_NAME,
      params: {
        path: route.fullPath,
      },
    })
  }

  onUnmounted(() => {
    removeRouteListener()
  })
</script>

<style scoped lang="less">
  .tab-bar-container {
    position: relative;
    background-color: var(--color-bg-2);
    .tab-bar-box {
      display: flex;
      padding: 0 0 0 20px;
      background-color: var(--color-bg-2);
      border-bottom: 1px solid var(--color-border);
      .tab-bar-scroll {
        height: 32px;
        flex: 1;
        overflow: hidden;
        .tags-wrap {
          padding: 4px 0;
          height: 48px;
          white-space: nowrap;
          overflow-x: auto;

          :deep(.arco-tag) {
            display: inline-flex;
            align-items: center;
            margin-right: 6px;
            cursor: pointer;
            &:first-child {
              .arco-tag-close-btn {
                display: none;
              }
            }
          }
        }
      }
    }

    .tag-bar-operation {
      width: 60px;
      height: 32px;
      display: flex;
      align-items: center;
    }
  }
</style>
