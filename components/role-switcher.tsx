'use client'

import { useRole } from '@/lib/role-context'
import { useRouter } from 'next/navigation'
import { Role } from '@/lib/types'

const ROLES: { value: Role; label: string }[] = [
  { value: 'customer', label: 'Customer' },
  { value: 'admin', label: 'Admin' },
  { value: 'production', label: 'Production' },
]

const ROLE_DESTINATIONS: Record<Role, string> = {
  customer: '/portal',
  admin: '/admin',
  production: '/production',
}

export function RoleSwitcher() {
  const { role, setRole } = useRole()
  const router = useRouter()

  function handleChange(next: Role) {
    setRole(next)
    router.push(ROLE_DESTINATIONS[next])
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1 rounded-full border border-stone-200 bg-white px-2 py-1.5 shadow-lg">
      <span className="pr-2 text-xs font-medium text-stone-400 uppercase tracking-wide">Demo</span>
      {ROLES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => handleChange(value)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            role === value
              ? 'bg-[#b87d6b] text-white'
              : 'text-stone-500 hover:bg-stone-100'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
