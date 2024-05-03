import { useQuery } from '@tanstack/react-query'
import { fairTalkApi } from '../service'
import { MessageRead } from '../../packages/types/api'

const useGetMessages = (id?: number) => {
  const getMessages = async () => {
    const response = await fairTalkApi.listMessagesChatsChatIdMessagesGet(id)
    return response.data
  }

  return useQuery<MessageRead[]>({
    queryKey: [id, 'chats', 'messages'],
    queryFn: getMessages
  })
}

export default useGetMessages
