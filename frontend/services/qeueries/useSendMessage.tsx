import { AxiosError, AxiosResponse } from 'axios'
import { fairTalkApi } from '../service'
import { MessageCreate, MessageRead } from '../../packages/types/api'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { useContext } from 'react'
import { ChatContext } from '../../providers/ChatProvider'
import { queryClient } from '../../providers/ReactQueryProvider'

interface ISendMessageReq {
  message: MessageCreate
  chatId: number
}

const useSendMessage = () => {
  const { chatId } = useContext(ChatContext)

  const sendMessage = async (
    req: ISendMessageReq
  ): Promise<AxiosResponse<MessageRead[]>> => {
    const res: AxiosResponse<MessageRead[]> =
      await fairTalkApi.postMessageChatsMessagesPost(req.message, req.chatId)
    return res
  }

  const mutationOptions: UseMutationOptions<
    AxiosResponse<MessageRead[]>,
    AxiosError,
    ISendMessageReq
  > = {
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [chatId, 'chats', 'messages']
      })
    }
  }

  return useMutation<AxiosResponse<MessageRead[]>, AxiosError, ISendMessageReq>(
    mutationOptions
  )
}

export default useSendMessage
