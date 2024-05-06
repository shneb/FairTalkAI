'use-client'

import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { MessageRead } from '../../packages/types/api'

interface Props {
  onSend: (message: MessageRead) => void
}

export const ChatInput: FC<Props> = ({ onSend }) => {
  const [content, setContent] = useState<string>('')

  const textareaRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length > 4000) {
      alert('Message limit is 4000 characters')
      return
    }
    setContent(value)
  }

  const handleSend = () => {
    if (!content.trim()) {
      alert('Please enter a message')
      return
    }
    onSend({ role: 'user', content } as MessageRead)
    setContent('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'inherit'
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`
    }
  }, [content])

  return (
    <div className=" items-center min-h-[44px] bg-white dark:bg-gray-800 rounded-lg p-4 flex gap-4">
      <Input
        className="flex-1"
        placeholder="Type your message..."
        style={{ resize: 'none' }}
        value={content}
        ref={textareaRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
      />
      <Button onClick={handleSend}>Send</Button>
    </div>
  )
}
