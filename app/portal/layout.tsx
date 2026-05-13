import Link from 'next/link'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/portal" className="font-heading text-xl tracking-widest uppercase text-stone-800">
            Forge & Patina
          </Link>
          <nav className="flex items-center gap-6 text-sm text-stone-500">
            <Link href="/portal" className="hover:text-stone-900 transition-colors">Dashboard</Link>
            <Link href="/portal/orders" className="hover:text-stone-900 transition-colors">My Orders</Link>
            <Link
              href="/portal/new"
              className="rounded-full bg-[#b87d6b] px-4 py-1.5 text-white text-sm hover:bg-[#a56d5c] transition-colors"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-10">
        {children}
      </main>
    </div>
  )
}
