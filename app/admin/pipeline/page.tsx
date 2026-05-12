import Link from 'next/link'
import { DEMO_ORDERS } from '@/data/orders'
import { DEMO_CUSTOMERS } from '@/data/customers'
import {
  PIPELINE_STAGES, STAGE_LABELS, PRODUCT_LABELS, FINISH_LABELS, PipelineStage
} from '@/lib/types'

const STAGE_COLORS: Record<PipelineStage, string> = {
  form_submitted: 'bg-stone-100 text-stone-600',
  quote_sent: 'bg-blue-50 text-blue-600',
  quote_approved: 'bg-indigo-50 text-indigo-600',
  paid: 'bg-emerald-50 text-emerald-600',
  in_production: 'bg-amber-50 text-amber-600',
  shipped: 'bg-purple-50 text-purple-600',
  delivered: 'bg-teal-50 text-teal-600',
  closed_lost: 'bg-red-50 text-red-400',
}

export default function AdminPipeline() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-stone-800">Pipeline</h1>
        <p className="text-stone-400 text-sm mt-1">{DEMO_ORDERS.length} total orders</p>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {PIPELINE_STAGES.map(stage => {
            const stageOrders = DEMO_ORDERS.filter(o => o.stage === stage)
            return (
              <div key={stage} className="w-56 shrink-0">
                <div className={`rounded-lg px-3 py-2 mb-3 flex items-center justify-between ${STAGE_COLORS[stage]}`}>
                  <span className="text-xs font-medium uppercase tracking-wide">{STAGE_LABELS[stage]}</span>
                  <span className="text-xs font-medium opacity-60">{stageOrders.length}</span>
                </div>
                <div className="space-y-2">
                  {stageOrders.map(order => {
                    const customer = DEMO_CUSTOMERS.find(c => c.id === order.customerId)
                    return (
                      <Link
                        key={order.id}
                        href={`/admin/orders/${order.id}`}
                        className="block rounded-xl border border-stone-200 bg-white p-4 hover:border-[#b87d6b]/40 hover:shadow-sm transition-all"
                      >
                        <p className="text-xs font-medium text-stone-800 mb-1">
                          {customer?.firstName} {customer?.lastName}
                        </p>
                        <p className="text-xs text-stone-500 mb-2">
                          {PRODUCT_LABELS[order.productType]}
                        </p>
                        <p className="text-xs text-stone-400">
                          {FINISH_LABELS[order.finish]} &bull; {order.widthInches}&Prime; &times; {order.heightInches}&Prime;
                        </p>
                        {order.quoteAmount && (
                          <p className="text-xs font-medium text-stone-600 mt-2">
                            ${order.quoteAmount.toLocaleString()}
                          </p>
                        )}
                      </Link>
                    )
                  })}
                  {stageOrders.length === 0 && (
                    <div className="rounded-xl border border-dashed border-stone-200 p-4 text-center">
                      <p className="text-xs text-stone-300">No orders</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
