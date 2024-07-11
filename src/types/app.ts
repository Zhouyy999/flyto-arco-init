import type { RouteRecordNormalized } from 'vue-router'

export interface ServerMenu extends RouteRecordNormalized {
  url?: string
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
  serverMenu: ServerMenu[]
  [key: string]: unknown
}
