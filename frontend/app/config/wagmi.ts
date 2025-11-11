import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, sepolia, arbitrum, polygon, optimism, base } from 'wagmi/chains'

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || ''

export const chains = [mainnet, sepolia, arbitrum, polygon, optimism, base] as const

const networks = [...chains] as any

export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  chains,
  networks,
  projectId,
} as any)

export const config = wagmiAdapter.wagmiConfig

