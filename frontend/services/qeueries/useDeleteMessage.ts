import { AxiosError, AxiosResponse } from 'axios'
import { fairTalkApi } from '../service'
import { MessageCreate, MessageRead } from '../../packages/types/api'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { useContext } from 'react'
import { ChatContext } from '../../providers/ChatProvider'
import { queryClient } from '../../providers/ReactQueryProvider'

interface IDeleteMessageReq {
  chatId: number
}

const useDeleteMessage = () => {
  const DeleteMessage = async (
    req: IDeleteMessageReq
  ): Promise<AxiosResponse<void>> => {
    const res: AxiosResponse<void> =
      await fairTalkApi.deleteChatChatsChatIdDelete(req.chatId)
    return res
  }

  const mutationOptions: UseMutationOptions<
    AxiosResponse<void>,
    AxiosError,
    IDeleteMessageReq
  > = {
    mutationFn: DeleteMessage,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['chats']
      })
    }
  }

  return useMutation<AxiosResponse<void>, AxiosError, IDeleteMessageReq>(
    mutationOptions
  )
}

export default useDeleteMessage
