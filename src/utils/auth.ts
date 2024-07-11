import { AppMenu } from '@types'

// 格式化服务端返回权限菜单数据
export function formatListToMenus(list): AppMenu[] {
  const menusMap: {
    [key: string]: AppMenu
  } = {}
  const menuTree: AppMenu[] = []
  function formatToMenu(data): AppMenu {
    return {
      sysno: data.SysNo,
      treeCode: data.TreeCode,
      key: data.FucntionKey,
      title: data.FunctionName,
      icon: data.MenuIcon,
      path: data.MenuUrl,
      ...(data.MenuUrl ? {} : { children: [] }),
    }
  }

  type AddAppMenu = AppMenu & { children: AppMenu[] }
  function addTree(parentMenu: AddAppMenu, menu: AppMenu): void {
    // 根据TreeCode来进行排序，越大的排在越后面
    const insertIndex = parentMenu.children.findIndex(
      o => o.treeCode > menu.treeCode,
    )

    if (insertIndex === -1) {
      parentMenu.children.push(menu)
    } else {
      parentMenu.children.splice(insertIndex, 0, menu)
    }
  }

  list.forEach(auth => {
    // 加入菜单
    if (auth.IsMenu === 1 && auth.CommonStatus === 1) {
      // 存入每一项菜单的映射数据
      if (menusMap[auth.TreeCode]) {
        Object.assign(menusMap[auth.TreeCode], {
          ...formatToMenu(auth),
          children: menusMap[auth.TreeCode].children || [],
        })
      } else {
        menusMap[auth.TreeCode] = formatToMenu(auth)
      }

      const parentCode = auth.TreeCode.slice(0, -2)
      // 没有父级code，均为一级菜单，直接加入树的最顶层
      if (!parentCode) {
        addTree({ children: menuTree } as AddAppMenu, menusMap[auth.TreeCode])
      } else {
        // 当父级不存在时，先存一个父级的初始化对象
        if (!menusMap[parentCode]) {
          menusMap[parentCode] = {
            sysno: 0,
            treeCode: '',
            key: '',
            title: '',
            icon: '',
            path: '',
            children: [],
          }
        }

        // 存入父级的 children 中，进行关联
        addTree(menusMap[parentCode] as AddAppMenu, menusMap[auth.TreeCode])
      }
    }
  })

  return menuTree as AppMenu[]
}

export default null
