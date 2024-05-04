import { FC } from 'react'
import { MessageRead } from '../../packages/types/api'
import clsx from 'clsx'

interface Props {
  message: MessageRead
}

export const ChatMessage: FC<Props> = ({ message }) => {
  return (
    <div
      style={{ overflowWrap: 'anywhere' }}
      className={`flex flex-col max-w-[850px] ${message.role === 'assistant' ? 'items-start' : 'items-end'}`}
    >
      {message.role === 'assistant' && message.bias && (
        <div
          className={clsx(
            'min-h-25 flex-col w-full rounded-t-lg pt-3 pb-2 px-4 text-sm bg-slate-800 text-white'
          )}
        >
          <p className="flex gap-2 items-center">
            <span
              className={clsx('w-3 h-3 rounded-full blur-[1px]', {
                'bg-green-500': Number(message.bias.score) <= 25,
                'bg-orange-500':
                  Number(message.bias.score) > 25 &&
                  Number(message.bias.score) < 70,
                'bg-red-500': Number(message.bias.score) >= 70
              })}
            />
            {message.bias.score}%{' '}
            <span className="text-bold">{message.bias.type}</span>
          </p>

          <p className="text-thin ml-5">{message.bias.description}</p>
        </div>
      )}
      <div
        className={`text-sm flex items-center ${
          message.role === 'assistant'
            ? 'w-full text-left justify-start bg-white dark:bg-gray-800 text-neutral-900 rounded-b-lg px-4 pt-2 pb-4'
            : 'bg-blue-500 text-white rounded-lg'
        }  p-4`}
        style={{ overflowWrap: 'anywhere' }}
      >
        {message.content}
      </div>
    </div>
  )
}
