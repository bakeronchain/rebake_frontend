'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useState, useEffect } from 'react'
import { createAppKit } from '@reown/appkit/react'
import { wagmiAdapter, config, chains } from './config/wagmi'

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || ''

let appKitInitialized = false

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24,
          },
        },
      })
  )

  useEffect(() => {
    if (!appKitInitialized && typeof window !== 'undefined' && wagmiAdapter) {
      if (!projectId) {
        console.warn(
          '⚠️ NEXT_PUBLIC_REOWN_PROJECT_ID is not set. WalletConnect features will not work. ' +
          'Get your project ID from https://cloud.reown.com/'
        )
      }

      createAppKit({
        adapters: [wagmiAdapter],
        projectId: projectId || '00000000000000000000000000000000',
        networks: [...chains] as any,
        metadata: {
          name: 'Rebake',
          description: 'Rebake - Decentralized Platform',
          url: window.location.origin,
          icons: [],
        },
        features: {
          analytics: true,
          email: true,
          emailShowWallets: true,
        },
      })
      appKitInitialized = true
    }
  }, [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

