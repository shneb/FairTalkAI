import { deleteAccountAction } from '@/actions/deleteAccountAction'
import DeleteAccountForm from '@/components/forms/DeleteAccountForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Delete account - FairTalkAI'
}

const DeleteAccount = async () => {
  return <DeleteAccountForm onSubmitHandler={deleteAccountAction} />
}

export default DeleteAccount
