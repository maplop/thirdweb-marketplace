'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar/Navbar'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { NETWORK } from '@/const/address'
import { ThemeProvider } from '@mui/material'
import { customTheme } from '@/styles/customTheme'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>NFT Marketplace</title>
      </head>
      <ThemeProvider theme={customTheme}>
        <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID} activeChain={NETWORK}>
          <body style={{ background: '#000' }} className={inter.className}>
            <Navbar />
            {children}
          </body>
        </ThirdwebProvider>
      </ThemeProvider>
    </html>
  )
}
