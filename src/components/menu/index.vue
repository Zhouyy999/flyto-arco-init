<script lang="tsx">
  import { defineComponent, ref, h, compile, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAppStore } from '@store'
  import { openWindow, regexUrl, listenerRouteChange } from '@utils'
  import { AppMenu } from '@types'

  export default defineComponent({
    emit: ['collapse'],
    setup() {
      const appStore = useAppStore()
      const router = useRouter()
      const menuTree = appStore.appData.menuList

      const collapsed = computed({
        get() {
          if (appStore.appData.device === 'desktop') {
            return appStore.appData.menuCollapse
          }
          return false
        },
        set(value: boolean) {
          appStore.updateSettings({ menuCollapse: value })
        },
      })
      const topMenu = computed(() => appStore.appData.topMenu)
      const openKeys = ref<string[]>([])
      const selectedKey = ref<string[]>([])

      const goto = (item: AppMenu) => {
        // 是否打开新窗口
        if (regexUrl.test(item.path)) {
          openWindow(item.path)
          selectedKey.value = [item.path as string]
          return
        }

        // Trigger router change
        router.push(item.path)
      }

      listenerRouteChange(newRoute => {
        const serverAuth = appStore.appData.serverAuthList.find(
          o => o.FucntionKey === newRoute.name,
        )

        if (serverAuth) {
          const treeCodes: string[] = []
          for (let i = 2; i <= serverAuth.TreeCode.length; i += 2) {
            treeCodes.push(serverAuth.TreeCode.slice(0, i))
          }

          openKeys.value = treeCodes
        }

        selectedKey.value = [newRoute.fullPath as string]
      }, true)
      const setCollapse = (val: boolean) => {
        if (appStore.appData.device === 'desktop') {
          appStore.updateSettings({ menuCollapse: val })
        }
      }

      const renderSubMenu = () => {
        function travel(_route: AppMenu[], nodes = []) {
          if (_route) {
            _route.forEach(element => {
              const icon = element.icon
                ? () => h(compile(`<${element.icon}/>`))
                : null

              // 有下一级，key为treeCode
              // 没有下一级，key为path
              const node =
                element.path === '' ? (
                  <a-sub-menu
                    key={element.treeCode}
                    v-slots={{
                      icon,
                      title: () => h(compile(element.title || '')),
                    }}
                  >
                    {travel(element?.children || [])}
                  </a-sub-menu>
                ) : (
                  <a-menu-item
                    key={element.path}
                    v-slots={{ icon }}
                    onClick={() => goto(element)}
                  >
                    {element?.title}
                  </a-menu-item>
                )
              nodes.push(node as never)
            })
          }
          return nodes
        }
        return travel(menuTree)
      }

      return () => (
        <a-menu
          mode={topMenu.value ? 'horizontal' : 'vertical'}
          v-model:collapsed={collapsed.value}
          v-model:open-keys={openKeys.value}
          show-collapse-button={appStore.appData.device !== 'mobile'}
          auto-open={false}
          selected-keys={selectedKey.value}
          auto-open-selected={true}
          level-indent={34}
          style="height: 100%;width:100%;"
          onCollapse={setCollapse}
        >
          {renderSubMenu()}
        </a-menu>
      )
    },
  })
</script>

<style lang="less" scoped>
  :deep(.arco-menu-inner) {
    .arco-menu-inline-header {
      display: flex;
      align-items: center;
    }
    .arco-icon {
      &:not(.arco-icon-down) {
        font-size: 18px;
      }
    }
  }
</style>
