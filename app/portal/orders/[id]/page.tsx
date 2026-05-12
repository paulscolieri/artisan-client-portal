import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DEMO_ORDERS } from '@/data/orders'
import { StatusBadge } from '@/components/status-badge'
import {
  PRODUCT_LABELS, FINISH_LABELS, ENVIRONMENT_LABELS,
  TIMELINE_LABELS, PIPELINE_STAGES, STAGE_LABELS, PipelineStage
} from '@/lib/types'

export default async function CustomerOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = DEMO_ORDERS.find(o => o.id === id)
  if (!order) notFound()

  const currentIndex = PIPELINE_STAGES.indexOf(order.stage)
  const activeStages = PIPELINE_STAGES.filter(s => s !== 'closed_lost')

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-2 text-sm text-stone-400">
        <Link href="/portal/orders" className="hover:text-stone-600">My Orders</Link>
        <span>/</span>
        <span className="text-stone-600">{PRODUCT_LABELS[order.productType]}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl text-stone-800">
            {PRODUCT_LABELS[order.productType]}
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            Order {order.id} &bull; Submitted {order.submittedAt}
          </p>
        </div>
        <StatusBadge stage={order.stage} />
      </div>

      {order.stage !== 'closed_lost' && (
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">Progress</p>
          <div className="flex items-center gap-0">
            {activeStages.map((stage, i) => {
              const stageIndex = PIPELINE_STAGES.indexOf(stage)
              const isPast = stageIndex < currentIndex
              const isCurrent = stage === order.stage
              const isLast = i === activeStages.length - 1
              return (
                <div key={stage} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      isPast || isCurrent ? 'bg-[#b87d6b] border-[#b87d6b]' : 'bg-white border-stone-300'
                    }`} />
                    <p className={`text-[10px] mt-1.5 text-center max-w-[60px] leading-tight ${
                      isCurrent ? 'text-[#b87d6b] font-medium' : isPast ? 'text-stone-400' : 'text-stone-300'
                    }`}>
                      {STAGE_LABELS[stage]}
                    </p>
                  </div>
                  {!isLast && (
                    <div className={`flex-1 h-px mb-4 ${isPast ? 'bg-[#b87d6b]' : 'bg-stone-200'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <p className="text-xs uppercase tracking-widest text-stone-400">Project Details</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-stone-400 text-xs mb-0.5">Product</p>
            <p className="text-stone-800">{PRODUCT_LABELS[order.productType]}</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs mb-0.5">Finish</p>
            <p className="text-stone-800">{FINISH_LABELS[order.finish]}</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs mb-0.5">Dimensions</p>
            <p className="text-stone-800">{order.widthInches}&Prime; W &times; {order.heightInches}&Prime; H</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs mb-0.5">Quantity</p>
            <p className="text-stone-800">{order.quantity}</p>
          </div>
          {order.environment && (
            <div>
              <p className="text-stone-400 text-xs mb-0.5">Setting</p>
              <p className="text-stone-800">{ENVIRONMENT_LABELS[order.environment]}</p>
            </div>
          )}
          <div>
            <p className="text-stone-400 text-xs mb-0.5">Timeline</p>
            <p className="text-stone-800">{TIMELINE_LABELS[order.timeline]}</p>
          </div>
          <div>
            <p className="text-stone-400 text-xs mb-0.5">Location</p>
            <p className="text-stone-800">{order.projectLocation}</p>
          </div>
          {order.quoteAmount && (
            <div>
              <p className="text-stone-400 text-xs mb-0.5">Quote Amount</p>
              <p className="text-stone-800 font-medium">${order.quoteAmount.toLocaleString()}</p>
            </div>
          )}
        </div>
        {order.additionalContext && (
          <div className="pt-2 border-t border-stone-100">
            <p className="text-stone-400 text-xs mb-1">Creative Context</p>
            <p className="text-stone-600 text-sm leading-relaxed">{order.additionalContext}</p>
          </div>
        )}
      </div>

      {order.qbInvoiceId && (
        <div className="rounded-xl border border-stone-200 bg-white p-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Quote / Invoice</p>
            <p className="text-stone-800 text-sm font-medium">{order.qbInvoiceId}</p>
          </div>
          <button className="rounded-full border border-stone-200 px-4 py-1.5 text-xs text-stone-500 hover:bg-stone-50 transition-colors">
            Download PDF
          </button>
        </div>
      )}

      {order.stage === 'quote_sent' && order.quoteAmount && (
        <div className="rounded-xl border border-[#e8d5ce] bg-[#fdf6f4] p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-stone-800 mb-0.5">Your quote is ready</p>
            <p className="text-stone-500 text-sm">
              Review the details above and approve to move forward.
              Total: <span className="font-medium text-stone-800">${order.quoteAmount.toLocaleString()}</span>
            </p>
          </div>
          <Link
            href={`/checkout/${order.id}`}
            className="shrink-0 rounded-full bg-[#b87d6b] px-6 py-2.5 text-white text-sm font-medium hover:bg-[#a56d5c] transition-colors ml-6"
          >
            Approve &amp; Pay
          </Link>
        </div>
      )}
    </div>
  )
}
