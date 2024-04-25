import { ApiClient } from '@/packages/types/api'
import { Session } from 'next-auth'

const getApiClient = async (session?: Session | null) => {
  return new ApiClient({
    BASE: "",
    HEADERS: {
      ...(session && {
        Authorization: `Bearer ${session.accessToken}`
      })
    }
  })
}

export { getApiClient }
