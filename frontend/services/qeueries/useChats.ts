import { useQuery } from '@tanstack/react-query'
import { fairTalkApi } from '../service'
import { ChatListRead } from '../../packages/types/api'

const useGetChats = () => {
  const getChats = async () => {
    const response = await fairTalkApi.listChatsChatsGet()
    return response.data
  }

  return useQuery<ChatListRead[]>({
    queryKey: ['chats'],
    queryFn: getChats
  })
}

export default useGetChats
