export interface ServerAuth {
  SysNo: number
  TreeCode: string
  FucntionKey: string
  FunctionName: string
  IsMenu: number
  MenuUrl: string
  MenuIcon: string
  CommonStatus: number
  [key: string]: unknown
}

export interface AppMenu {
  sysno: number
  treeCode: string
  key: string
  title: string
  icon: string
  path: string
  children?: AppMenu[]
}

export interface AppState {
  theme: string
  colorWeak: boolean
  menu: boolean
  topMenu: boolean
  hideMenu: boolean
  menuCollapse: boolean
  footer: boolean
  themeColor: string
  menuWidth: number
  globalSettings: boolean
  device: string
  menuList: AppMenu[]
  serverAuthList: ServerAuth[]
  [key: string]: unknown
}
