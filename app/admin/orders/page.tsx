import Link from 'next/link'
import { DEMO_ORDERS } from '@/data/orders'
import { DEMO_CUSTOMERS } from '@/data/customers'
import { StatusBadge } from '@/components/status-badge'
import { PRODUCT_LABELS, FINISH_LABELS, CUSTOMER_TYPE_LABELS } from '@/lib/types'

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-stone-800">All Orders</h1>
          <p className="text-stone-400 text-sm mt-1">{DEMO_ORDERS.length} orders</p>
        </div>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-xs uppercase tracking-widest text-stone-400">
              <th className="text-left px-6 py-3 font-medium">Customer</th>
              <th className="text-left px-6 py-3 font-medium">Product</th>
              <th className="text-left px-6 py-3 font-medium">Specs</th>
              <th className="text-left px-6 py-3 font-medium">Quote</th>
              <th className="text-left px-6 py-3 font-medium">QB Invoice</th>
              <th className="text-left px-6 py-3 font-medium">Submitted</th>
              <th className="text-left px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {DEMO_ORDERS.map((order, i) => {
              const customer = DEMO_CUSTOMERS.find(c => c.id === order.customerId)
              return (
                <tr
                  key={order.id}
                  className={`hover:bg-stone-50 transition-colors ${i < DEMO_ORDERS.length - 1 ? 'border-b border-stone-100' : ''}`}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-stone-800">
                      {customer?.firstName} {customer?.lastName}
                    </p>
                    {customer && (
                      <p className="text-xs text-stone-400">{CUSTOMER_TYPE_LABELS[customer.customerType]}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-stone-700">{PRODUCT_LABELS[order.productType]}</td>
                  <td className="px-6 py-4">
                    <p className="text-stone-600">{FINISH_LABELS[order.finish]}</p>
                    <p className="text-xs text-stone-400">{order.widthInches}&Prime; &times; {order.heightInches}&Prime;</p>
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    {order.quoteAmount ? `$${order.quoteAmount.toLocaleString()}` : <span className="text-stone-300">—</span>}
                  </td>
                  <td className="px-6 py-4">
                    {order.qbInvoiceId
                      ? <span className="text-xs text-stone-500 font-mono">{order.qbInvoiceId}</span>
                      : <span className="text-stone-300 text-xs">—</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-stone-400 text-xs">{order.submittedAt}</td>
                  <td className="px-6 py-4"><StatusBadge stage={order.stage} /></td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/orders/${order.id}`} className="text-[#b87d6b] hover:underline text-xs">
                      Manage
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
