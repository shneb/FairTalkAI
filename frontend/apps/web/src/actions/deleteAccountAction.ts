'use server'

import { getApiClient } from '@/lib/api'
import { authOptions } from '@/lib/auth'
import { deleteAccountFormSchema } from '@/lib/validation'
import { ApiError } from '@frontend/types/api'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export type DeleteAccountFormSchema = z.infer<typeof deleteAccountFormSchema>

export type DeleteAccountAction = (
  data: DeleteAccountFormSchema
) => Promise<boolean>

const deleteAccountAction = async () => {
  const session = await getServerSession(authOptions)

  try {
    const apiClient = await getApiClient(session)

    if (session !== null) {
      await apiClient.users.usersDeleteAccountDestroy()

      return true
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return false
    }
  }

  return false
}

export { deleteAccountAction }
