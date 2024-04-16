import { changePasswordAction } from '@/actions/changePasswordAction'
import ChangePaswordForm from '@/components/forms/ChangePasswordForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Change password - FairTalkAI'
}

const ChangePassword = async () => {
  return <ChangePaswordForm onSubmitHandler={changePasswordAction} />
}

export default ChangePassword
