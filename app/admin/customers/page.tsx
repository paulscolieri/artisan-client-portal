import { DEMO_CUSTOMERS } from '@/data/customers'
import { DEMO_ORDERS } from '@/data/orders'
import { CUSTOMER_TYPE_LABELS } from '@/lib/types'

const TYPE_COLORS = {
  trade_established: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  trade_prospective: 'bg-blue-50 text-blue-700 border-blue-200',
  enthusiast: 'bg-stone-100 text-stone-600 border-stone-200',
}

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-stone-800">Customers</h1>
        <p className="text-stone-400 text-sm mt-1">{DEMO_CUSTOMERS.length} total</p>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-xs uppercase tracking-widest text-stone-400">
              <th className="text-left px-6 py-3 font-medium">Name</th>
              <th className="text-left px-6 py-3 font-medium">Company</th>
              <th className="text-left px-6 py-3 font-medium">Type</th>
              <th className="text-left px-6 py-3 font-medium">Orders</th>
              <th className="text-left px-6 py-3 font-medium">Source</th>
              <th className="text-left px-6 py-3 font-medium">Client Since</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_CUSTOMERS.map((customer, i) => {
              const orderCount = DEMO_ORDERS.filter(o => o.customerId === customer.id).length
              return (
                <tr
                  key={customer.id}
                  className={`hover:bg-stone-50 transition-colors ${i < DEMO_CUSTOMERS.length - 1 ? 'border-b border-stone-100' : ''}`}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-stone-800">
                      {customer.firstName} {customer.lastName}
                    </p>
                    <p className="text-xs text-stone-400">{customer.email}</p>
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    {customer.company ?? <span className="text-stone-300">—</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[customer.customerType]}`}>
                      {CUSTOMER_TYPE_LABELS[customer.customerType]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-600">{orderCount}</td>
                  <td className="px-6 py-4 text-stone-500 text-xs">{customer.source}</td>
                  <td className="px-6 py-4 text-stone-400 text-xs">{customer.createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
