'use client'

import { signIn } from 'next-auth/react'
import TextField from '@/components/ui/forms/TextField'
import SubmitField from '@/components/ui/forms/SubmitField'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema } from '@/lib/validation'
import { useSearchParams } from 'next/navigation'
import FormHeader from '@/components/ui/forms/FormHeader'
import FormFooter from '@/components/ui/forms/FormFooter'
import ErrorMessage from '@/components/ui/messages/ErrorMessage'
import { useEffect } from 'react'
import { AxiosResponse } from 'axios'
import fairTalkApi from '../../services/service'

type TokenRes = {
  access_token: string
  refresh_token: string
  token_typ: 'Bearer'
  expires_in: number
}

type LoginFormSchema = z.infer<typeof loginFormSchema>

const LoginForm: React.FC = () => {
  const search = useSearchParams()

  const { register, handleSubmit, formState } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema)
  })

  const onSubmitHandler = handleSubmit((data) => {
    signIn('credentials', {
      username: data.username,
      password: data.password,
      callbackUrl: '/'
    })
    // const login = async () => {
    //   try {
    //     const res: AxiosResponse<TokenRes> =
    //       await fairTalkApi.authenticateUserAuthTokenPost(
    //         data.username,
    //         data.password
    //       )
    //     console.log(res)
    //     return res
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
    // login()
  })

  return (
    <>
      <FormHeader
        title="Welcome back to FairTalkAI"
        description="Get an access to internal application"
      />

      {search.has('error') && search.get('error') === 'CredentialsSignin' && (
        <ErrorMessage>Provided account does not exists.</ErrorMessage>
      )}

      <form
        method="post"
        action="/api/auth/callback/credentials"
        onSubmit={onSubmitHandler}
      >
        <TextField
          type="text"
          register={register('username')}
          formState={formState}
          label="Email"
          placeholder="Email address"
        />

        <TextField
          type="password"
          register={register('password', { required: true })}
          formState={formState}
          label="Password"
          placeholder="Enter your password"
        />

        <SubmitField>Sign in</SubmitField>
      </form>

      <FormFooter
        cta="Don't have an account?"
        link="/register"
        title="Sign up"
      />
    </>
  )
}

export default LoginForm
