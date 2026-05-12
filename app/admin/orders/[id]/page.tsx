import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DEMO_ORDERS } from '@/data/orders'
import { DEMO_CUSTOMERS } from '@/data/customers'
import { StatusBadge } from '@/components/status-badge'
import {
  PRODUCT_LABELS, FINISH_LABELS, ENVIRONMENT_LABELS,
  TIMELINE_LABELS, STAGE_LABELS, PIPELINE_STAGES,
  CUSTOMER_TYPE_LABELS,
} from '@/lib/types'

export default async function AdminOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = DEMO_ORDERS.find(o => o.id === id)
  if (!order) notFound()
  const customer = DEMO_CUSTOMERS.find(c => c.id === order.customerId)

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-stone-400">
        <Link href="/admin/orders" className="hover:text-stone-600">Orders</Link>
        <span>/</span>
        <span className="text-stone-600">{customer?.firstName} {customer?.lastName}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl text-stone-800">
            {PRODUCT_LABELS[order.productType]}
          </h1>
          <p className="text-stone-400 text-sm mt-1">{order.id} &bull; Submitted {order.submittedAt}</p>
        </div>
        <StatusBadge stage={order.stage} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
          <p className="text-xs uppercase tracking-widest text-stone-400">Customer</p>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-stone-800 font-medium">
                {customer?.firstName} {customer?.lastName}
              </p>
              {customer && (
                <p className="text-xs text-stone-400">{CUSTOMER_TYPE_LABELS[customer.customerType]}</p>
              )}
            </div>
            {customer?.company && (
              <div>
                <p className="text-stone-400 text-xs">Company</p>
                <p className="text-stone-700">{customer.company}</p>
              </div>
            )}
            <div>
              <p className="text-stone-400 text-xs">Email</p>
              <p className="text-stone-700">{customer?.email}</p>
            </div>
            {customer?.phone && (
              <div>
                <p className="text-stone-400 text-xs">Phone</p>
                <p className="text-stone-700">{customer.phone}</p>
              </div>
            )}
            <div>
              <p className="text-stone-400 text-xs">Source</p>
              <p className="text-stone-700">{customer?.source}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
          <p className="text-xs uppercase tracking-widest text-stone-400">Project Specs</p>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-stone-400 text-xs">Product</p>
              <p className="text-stone-700">{PRODUCT_LABELS[order.productType]} &times; {order.quantity}</p>
            </div>
            <div>
              <p className="text-stone-400 text-xs">Dimensions</p>
              <p className="text-stone-700">{order.widthInches}&Prime; W &times; {order.heightInches}&Prime; H</p>
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
              <p className="text-stone-700">{TIMELINE_LABELS[order.timeline]}</p>
            </div>
            <div>
              <p className="text-stone-400 text-xs">Location</p>
              <p className="text-stone-700">{order.projectLocation}</p>
            </div>
          </div>
        </div>
      </div>

      {order.additionalContext && (
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">Creative Context</p>
          <p className="text-stone-600 text-sm leading-relaxed">{order.additionalContext}</p>
        </div>
      )}

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <p className="text-xs uppercase tracking-widest text-stone-400">Operations</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-stone-400 text-xs mb-1">Quote Amount</p>
            <p className="text-stone-800 font-medium">
              {order.quoteAmount ? `$${order.quoteAmount.toLocaleString()}` : <span className="text-stone-300 font-normal">Not set</span>}
            </p>
          </div>
          <div>
            <p className="text-stone-400 text-xs mb-1">Status</p>
            <select className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm text-stone-700 focus:outline-none focus:border-[#b87d6b]" defaultValue={order.stage}>
              {PIPELINE_STAGES.map(s => (
                <option key={s} value={s}>{STAGE_LABELS[s]}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-stone-400 text-xs mb-1">QB Invoice #</p>
            <input
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm text-stone-700 font-mono focus:outline-none focus:border-[#b87d6b]"
              defaultValue={order.qbInvoiceId ?? ''}
              placeholder="e.g. QB-2025-0042"
            />
          </div>
          <div>
            <p className="text-stone-400 text-xs mb-1">Asana Project</p>
            <input
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm text-stone-400 focus:outline-none focus:border-[#b87d6b]"
              defaultValue={order.asanaLink ?? ''}
              placeholder="Paste Asana project URL"
            />
          </div>
        </div>

        {order.internalNotes !== undefined || true ? (
          <div>
            <p className="text-stone-400 text-xs mb-1">Internal Notes</p>
            <textarea
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 min-h-[80px] focus:outline-none focus:border-[#b87d6b]"
              defaultValue={order.internalNotes ?? ''}
              placeholder="Notes visible only to the team..."
            />
          </div>
        ) : null}

        <div className="flex justify-end pt-2">
          <button className="rounded-full bg-[#b87d6b] px-6 py-2 text-white text-sm hover:bg-[#a56d5c] transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
