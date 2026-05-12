import Link from 'next/link'
import { DEMO_ORDERS } from '@/data/orders'
import { DEMO_CUSTOMER } from '@/data/customers'
import { StatusBadge } from '@/components/status-badge'
import { PRODUCT_LABELS, FINISH_LABELS } from '@/lib/types'

const myOrders = DEMO_ORDERS.filter(o => o.customerId === DEMO_CUSTOMER.id)
const openOrders = myOrders.filter(o => !['delivered', 'closed_lost'].includes(o.stage))
const inProd = myOrders.filter(o => o.stage === 'in_production')

export default function CustomerDashboard() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm text-stone-400 uppercase tracking-widest mb-1">Welcome back</p>
        <h1 className="text-3xl text-stone-800">
          {DEMO_CUSTOMER.firstName} {DEMO_CUSTOMER.lastName}
        </h1>
        {DEMO_CUSTOMER.company && (
          <p className="text-stone-500 mt-1">{DEMO_CUSTOMER.company}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Open Quotes & Orders</p>
          <p className="text-4xl font-light text-stone-800">{openOrders.length}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">In Production</p>
          <p className="text-4xl font-light text-stone-800">{inProd.length}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Total Pieces</p>
          <p className="text-4xl font-light text-stone-800">{myOrders.length}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-stone-700">Recent Activity</h2>
          <Link href="/portal/orders" className="text-sm text-[#b87d6b] hover:underline">View all</Link>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
          {myOrders.slice(0, 4).map((order, i) => (
            <Link
              key={order.id}
              href={`/portal/orders/${order.id}`}
              className={`flex items-center justify-between px-6 py-4 hover:bg-stone-50 transition-colors ${i < myOrders.slice(0,4).length - 1 ? 'border-b border-stone-100' : ''}`}
            >
              <div>
                <p className="text-sm font-medium text-stone-800">
                  {PRODUCT_LABELS[order.productType]} &mdash; {order.widthInches}&Prime;W &times; {order.heightInches}&Prime;H
                </p>
                <p className="text-xs text-stone-400 mt-0.5">{FINISH_LABELS[order.finish]} &bull; {order.projectLocation}</p>
              </div>
              <div className="flex items-center gap-4">
                {order.quoteAmount && (
                  <span className="text-sm text-stone-500">${order.quoteAmount.toLocaleString()}</span>
                )}
                <StatusBadge stage={order.stage} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[#e8d5ce] bg-[#fdf6f4] p-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl text-stone-800 mb-1">Ready to start a new project?</h2>
          <p className="text-stone-500 text-sm">Submit your project details and we&apos;ll have a custom quote ready within 24-48 hours.</p>
        </div>
        <Link
          href="/portal/new"
          className="shrink-0 rounded-full bg-[#b87d6b] px-6 py-2.5 text-white text-sm font-medium hover:bg-[#a56d5c] transition-colors"
        >
          Start a Project
        </Link>
      </div>
    </div>
  )
}
