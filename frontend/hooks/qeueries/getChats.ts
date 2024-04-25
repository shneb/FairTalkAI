import { useQuery } from '@tanstack/react-query'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import { getApiClient } from '../../lib/api'

const useGetChats = () => {
  const getChats = async () => {
    const session = await getServerSession(authOptions)
    console.log(session, authOptions, 'gg')
    const apiClient = await getApiClient(session)

    const response = apiClient.chats.chatsRetrieve()
    console.log(response)
    return response
  }

  return useQuery({
    queryKey: ['chats'],
    queryFn: getChats
  })
}

export default useGetChats
