import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authApi } from '../services/service'
import { AxiosResponse } from 'axios'

type TokenRes = {
  access_token: string
  refresh_token: string
  token_typ: 'Bearer'
  expires_in: number
}

const decodeToken = (
  token: string
): {
  token_type: string
  exp: number
  iat: number
  jti: string
  user_id: number
} => {
  return JSON.parse(atob(token.split('.')[1]))
}

const authOptions: AuthOptions = {
  debug: true,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    session: async ({ session, token }) => {
      const access = decodeToken(token.access)
      const refresh = decodeToken(token.refresh)

      if (Date.now() / 1000 > access.exp && Date.now() / 1000 > refresh.exp) {
        return Promise.reject({
          error: new Error('Refresh token expired')
        })
      }

      session.user = {
        id: access.user_id,
        username: token.username
      }

      session.refreshToken = token.refresh
      session.accessToken = token.access

      return session
    },
    jwt: async ({ token, user }) => {
      if (user?.username) {
        return { ...token, ...user }
      }

      // Refresh token
      if (Date.now() / 1000 > decodeToken(token.access).exp) {
        const res: AxiosResponse<TokenRes> =
          await authApi.refreshAccessTokenAuthRefreshPost(token.access)

        token.access = res.data.access_token
      }

      return { ...token, ...user }
    }
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log(credentials, 'credentials')
        if (credentials === undefined) {
          return null
        }
        console.log('gg auth.tsx')
        try {
          console.log('try')
          const res: AxiosResponse<TokenRes> =
            await authApi.authenticateUserAuthTokenPost(
              credentials.username,
              credentials.password
            )
          console.log(res, 'res')
          return {
            id: decodeToken(res.data.access_token).user_id,
            username: credentials.username,
            access: res.data.access_token,
            refresh: res.data.refresh_token
          }
        } catch (error) {
          console.log(error, 'error')
          return null
        }
      }
    })
  ]
}

export { authOptions }
