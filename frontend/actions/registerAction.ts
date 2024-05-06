'use server'

import { z } from 'zod'
import { registerFormSchema } from '@/lib/validation'
import { usersApi } from '@/services/service'
import { SignUpModal } from '../packages/types/api'
import { v4 as uuid } from 'uuid'
import { AxiosError } from 'axios'

export type RegisterFormSchema = z.infer<typeof registerFormSchema>

export type RegisterAction = (
  data: RegisterFormSchema
) => Promise<SignUpModal | boolean>

const registerAction: RegisterAction = async (data) => {
  try {
    usersApi.signupUsersSignupPost({
      id: Math.floor(Math.random() * 99999),
      username: data.username,
      email: data.username,
      password: data.password
    })

    return true
  } catch (error) {
    if (error instanceof AxiosError) {
      return false
    }
  }

  return false
}

export { registerAction }
