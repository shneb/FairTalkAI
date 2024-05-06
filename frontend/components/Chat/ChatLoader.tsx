import { IconDots } from '@tabler/icons-react'
import { FC } from 'react'

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div
      style={{ overflowWrap: 'anywhere' }}
      className="flex flex-col max-w-[850px] items-start"
    >
      <div className="min-h-25 flex-col w-full rounded-t-lg pt-3 pb-2 px-4 text-sm bg-slate-800 text-white">
        <p className="flex gap-2 items-center">
          <span className="text-bold" />
        </p>

        <p className="text-thin ml-5" />
      </div>
      <div
        className="text-sm flex items-center w-full text-left justify-start bg-white dark:bg-gray-800 text-neutral-900 rounded-b-lg px-4 pt-2 pb-4 p-4"
        style={{ overflowWrap: 'anywhere' }}
      >
        <IconDots className="animate-pulse" />
      </div>
    </div>
  )
}
