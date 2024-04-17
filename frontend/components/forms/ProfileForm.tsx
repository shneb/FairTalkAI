'use client'

import { ProfileAction } from '@/actions/profileAction'
import { fieldApiError } from '@/lib/forms'
import { profileFormSchema } from '@/lib/validation'
import { UserCurrent } from '@/packages/types/api'
import FormHeader from '@/components/ui/forms/FormHeader'
import SubmitField from '@/components/ui/forms/SubmitField'
import TextField from '@/components/ui/forms/TextField'
import SuccessMessage from '@/components/ui/messages/SuccessMessage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type ProfileFormSchema = z.infer<typeof profileFormSchema>

type ProfileFormProps = {
  currentUser: Promise<UserCurrent>
  onSubmitHandler: ProfileAction
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  currentUser,
  onSubmitHandler
}) => {
  const [success, setSuccess] = useState<boolean>(false)

  const { formState, handleSubmit, register, setError } =
    useForm<ProfileFormSchema>({
      resolver: zodResolver(profileFormSchema),
      defaultValues: async () => {
        const user = await currentUser

        return {
          firstName: user.first_name || '',
          lastName: user.last_name || ''
        }
      }
    })

  return (
    <>
      <FormHeader
        title="Update you profile information"
        description="Change your account data"
      />

      <form
        method="post"
        onSubmit={handleSubmit(async (data) => {
          const res = await onSubmitHandler(data)

          if (res !== true && typeof res !== 'boolean') {
            setSuccess(false)

            fieldApiError('first_name', 'firstName', res, setError)
            fieldApiError('last_name', 'lastName', res, setError)
          } else {
            setSuccess(true)
          }
        })}
      >
        {success && (
          <SuccessMessage>Profile has been succesfully updated</SuccessMessage>
        )}

        <TextField
          type="text"
          register={register('firstName')}
          label="First name"
          formState={formState}
        />

        <TextField
          type="text"
          register={register('lastName')}
          label="Last name"
          formState={formState}
        />

        <SubmitField isLoading={formState.isLoading}>
          Update profile
        </SubmitField>
      </form>
    </>
  )
}

export default ProfileForm
