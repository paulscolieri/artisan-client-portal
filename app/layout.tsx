import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import { RoleProvider } from '@/lib/role-context'
import { RoleSwitcher } from '@/components/role-switcher'

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Claire Crowe Collection',
  description: 'Custom artisan metalwork for the discerning home.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full bg-[#faf9f7] text-stone-900 antialiased">
        <RoleProvider>
          {children}
          <RoleSwitcher />
        </RoleProvider>
      </body>
    </html>
  )
}
