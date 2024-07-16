import axios from 'axios'
import request from '@request'

export interface MessageRecord {
  id: number
  type: string
  title: string
  subTitle: string
  avatar?: string
  content: string
  time: string
  status: 0 | 1
  messageType?: number
}
export type MessageListType = MessageRecord[]

export function queryMessageList() {
  return request<MessageListType>('/api/message/list', {
    openLoading: false,
  })
}

interface MessageStatus {
  ids: number[]
}

export function setMessageStatus(data: MessageStatus) {
  return axios.post<MessageListType>('/api/message/read', data)
}

export interface ChatRecord {
  id: number
  username: string
  content: string
  time: string
  isCollect: boolean
}

export function queryChatList() {
  return axios.post<ChatRecord[]>('/api/chat/list')
}
