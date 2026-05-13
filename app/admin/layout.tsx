import Link from 'next/link'

const NAV = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/pipeline', label: 'Pipeline' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/customers', label: 'Customers' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-heading text-xl tracking-widest uppercase text-stone-800">
              Forge & Patina
            </span>
            <span className="text-xs uppercase tracking-widest text-stone-300 border border-stone-200 rounded px-2 py-0.5">
              Admin
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-stone-500">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className="hover:text-stone-900 transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-10">
        {children}
      </main>
    </div>
  )
}
