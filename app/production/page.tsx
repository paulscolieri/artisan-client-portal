import Link from 'next/link'
import { DEMO_ORDERS } from '@/data/orders'
import { DEMO_CUSTOMERS } from '@/data/customers'
import { StatusBadge } from '@/components/status-badge'
import { PRODUCT_LABELS, FINISH_LABELS, ENVIRONMENT_LABELS, TIMELINE_LABELS } from '@/lib/types'

const prodOrders = DEMO_ORDERS.filter(o =>
  ['paid', 'in_production', 'shipped'].includes(o.stage)
)

const TIMELINE_PRIORITY = { '1_2_months': 0, '3_4_months': 1, flexible: 2 }
const sorted = [...prodOrders].sort(
  (a, b) => TIMELINE_PRIORITY[a.timeline] - TIMELINE_PRIORITY[b.timeline]
)

export default function ProductionQueue() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-stone-800">Production Queue</h1>
        <p className="text-stone-400 text-sm mt-1">{sorted.length} active pieces</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {sorted.map(order => {
          const customer = DEMO_CUSTOMERS.find(c => c.id === order.customerId)
          return (
            <Link
              key={order.id}
              href={`/production/orders/${order.id}`}
              className="rounded-xl border border-stone-200 bg-white p-6 hover:border-[#b87d6b]/40 hover:shadow-sm transition-all block"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-medium text-stone-800">{PRODUCT_LABELS[order.productType]}</p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {customer?.firstName} {customer?.lastName}
                    {customer?.company && ` — ${customer.company}`}
                  </p>
                </div>
                <StatusBadge stage={order.stage} />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-stone-400 text-xs">Dimensions</p>
                  <p className="text-stone-700 font-medium">{order.widthInches}&Prime; &times; {order.heightInches}&Prime;</p>
                </div>
                <div>
                  <p className="text-stone-400 text-xs">Finish</p>
                  <p className="text-stone-700">{FINISH_LABELS[order.finish]}</p>
                </div>
                {order.environment && (
                  <div>
                    <p className="text-stone-400 text-xs">Setting</p>
                    <p className="text-stone-700">{ENVIRONMENT_LABELS[order.environment]}</p>
                  </div>
                )}
                <div>
                  <p className="text-stone-400 text-xs">Timeline</p>
                  <p className={`text-sm font-medium ${
                    order.timeline === '1_2_months' ? 'text-red-500' :
                    order.timeline === '3_4_months' ? 'text-amber-600' : 'text-stone-600'
                  }`}>
                    {TIMELINE_LABELS[order.timeline]}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
