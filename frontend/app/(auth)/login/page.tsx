import LoginForm from '@/components/forms/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - FairTalkAI'
}

const Login = async () => {
  return <LoginForm />
}

export default Login
