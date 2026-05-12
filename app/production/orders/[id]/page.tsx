import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DEMO_ORDERS } from '@/data/orders'
import { DEMO_CUSTOMERS } from '@/data/customers'
import { StatusBadge } from '@/components/status-badge'
import { PRODUCT_LABELS, FINISH_LABELS, ENVIRONMENT_LABELS, TIMELINE_LABELS } from '@/lib/types'

export default async function ProductionOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = DEMO_ORDERS.find(o => o.id === id)
  if (!order) notFound()
  const customer = DEMO_CUSTOMERS.find(c => c.id === order.customerId)

  if (!['paid', 'in_production', 'shipped'].includes(order.stage)) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center gap-2 text-sm text-stone-400">
        <Link href="/production" className="hover:text-stone-600">Queue</Link>
        <span>/</span>
        <span className="text-stone-600">{PRODUCT_LABELS[order.productType]}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl text-stone-800">{PRODUCT_LABELS[order.productType]}</h1>
          <p className="text-stone-400 text-sm mt-1">
            {customer?.firstName} {customer?.lastName}
            {customer?.company && ` — ${customer.company}`}
          </p>
        </div>
        <StatusBadge stage={order.stage} />
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <p className="text-xs uppercase tracking-widest text-stone-400">Specifications</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-stone-400 text-xs mb-0.5">Product</p>
            <p className="text-stone-800 font-medium">{PRODUCT_LABELS[order.productType]}</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs mb-0.5">Quantity</p>
            <p className="text-stone-800">{order.quantity}</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs mb-0.5">Dimensions</p>
            <p className="text-stone-800 font-medium text-lg">{order.widthInches}&Prime; W &times; {order.heightInches}&Prime; H</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs mb-0.5">Finish</p>
            <p className="text-stone-800 font-medium">{FINISH_LABELS[order.finish]}</p>
          </div>
          {order.environment && (
            <div>
              <p className="text-stone-400 text-xs mb-0.5">Setting</p>
              <p className="text-stone-800">{ENVIRONMENT_LABELS[order.environment]}</p>
            </div>
          )}
          <div>
            <p className="text-stone-400 text-xs mb-0.5">Timeline</p>
            <p className={`font-medium ${
              order.timeline === '1_2_months' ? 'text-red-500' :
              order.timeline === '3_4_months' ? 'text-amber-600' : 'text-stone-700'
            }`}>
              {TIMELINE_LABELS[order.timeline]}
            </p>
          </div>
        </div>
        {order.additionalContext && (
          <div className="pt-3 border-t border-stone-100">
            <p className="text-stone-400 text-xs mb-1">Client Notes</p>
            <p className="text-stone-600 text-sm leading-relaxed">{order.additionalContext}</p>
          </div>
        )}
      </div>

      {order.stage === 'in_production' && (
        <button className="w-full rounded-full bg-[#b87d6b] py-3 text-white text-sm font-medium hover:bg-[#a56d5c] transition-colors">
          Mark as Shipped
        </button>
      )}
    </div>
  )
}
