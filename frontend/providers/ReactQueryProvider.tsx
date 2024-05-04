'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      refetchOnWindowFocus: false
    }
  }
})

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider
