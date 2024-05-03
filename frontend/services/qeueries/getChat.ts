import { useQuery } from '@tanstack/react-query'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import { getApiClient } from '../service'

const useGetChats = () => {
  const getChats = async () => {
    const session = await getServerSession(authOptions)
    const apiClient = await getApiClient(session)

    return apiClient.chats.chatsRetrieve()
  }

  return useQuery({
    queryKey: ['chat'],
    queryFn: getChats
  })
}

export default useGetChats
