import Link from 'next/link'
import { DEMO_ORDERS } from '@/data/orders'
import { DEMO_CUSTOMER } from '@/data/customers'
import { StatusBadge } from '@/components/status-badge'
import { PRODUCT_LABELS, FINISH_LABELS, TIMELINE_LABELS } from '@/lib/types'

const myOrders = DEMO_ORDERS.filter(o => o.customerId === DEMO_CUSTOMER.id)

export default function CustomerOrders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-stone-800">My Orders & Quotes</h1>
        <p className="text-stone-400 text-sm mt-1">{myOrders.length} total</p>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-xs uppercase tracking-widest text-stone-400">
              <th className="text-left px-6 py-3 font-medium">Product</th>
              <th className="text-left px-6 py-3 font-medium">Finish</th>
              <th className="text-left px-6 py-3 font-medium">Timeline</th>
              <th className="text-left px-6 py-3 font-medium">Quote</th>
              <th className="text-left px-6 py-3 font-medium">Submitted</th>
              <th className="text-left px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order, i) => (
              <tr
                key={order.id}
                className={`hover:bg-stone-50 transition-colors ${i < myOrders.length - 1 ? 'border-b border-stone-100' : ''}`}
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-stone-800">{PRODUCT_LABELS[order.productType]}</p>
                  <p className="text-xs text-stone-400">{order.widthInches}&Prime; &times; {order.heightInches}&Prime;</p>
                </td>
                <td className="px-6 py-4 text-stone-600">{FINISH_LABELS[order.finish]}</td>
                <td className="px-6 py-4 text-stone-600">{TIMELINE_LABELS[order.timeline]}</td>
                <td className="px-6 py-4 text-stone-600">
                  {order.quoteAmount ? `$${order.quoteAmount.toLocaleString()}` : <span className="text-stone-300">Pending</span>}
                </td>
                <td className="px-6 py-4 text-stone-400">{order.submittedAt}</td>
                <td className="px-6 py-4"><StatusBadge stage={order.stage} /></td>
                <td className="px-6 py-4">
                  <Link href={`/portal/orders/${order.id}`} className="text-[#b87d6b] hover:underline text-xs">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
