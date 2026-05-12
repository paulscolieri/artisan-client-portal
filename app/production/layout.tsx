import Link from 'next/link'

export default function ProductionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-heading text-xl tracking-widest uppercase text-stone-800">
              Claire Crowe
            </span>
            <span className="text-xs uppercase tracking-widest text-stone-300 border border-stone-200 rounded px-2 py-0.5">
              Production
            </span>
          </div>
          <Link href="/production" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
            Queue
          </Link>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-10">
        {children}
      </main>
    </div>
  )
}
