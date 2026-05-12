import { notFound } from 'next/navigation'
import { DEMO_ORDERS } from '@/data/orders'
import { PRODUCT_LABELS, FINISH_LABELS } from '@/lib/types'
import { CheckoutForm } from './checkout-form'

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = DEMO_ORDERS.find(o => o.id === id)
  if (!order || order.stage !== 'quote_sent' || !order.quoteAmount) notFound()

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex items-start justify-center pt-16 px-4 pb-16">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-center mb-8 gap-3">
          <span className="font-heading text-lg tracking-widest uppercase text-stone-700">
            Claire Crowe
          </span>
          <span className="text-stone-300">|</span>
          <span className="text-sm text-stone-400">Secure Checkout</span>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {/* Payment form */}
          <div className="col-span-3 order-1">
            <CheckoutForm orderId={order.id} amount={order.quoteAmount} />
          </div>

          {/* Order summary */}
          <div className="col-span-2 order-2">
            <div className="rounded-xl border border-stone-200 bg-white p-6 sticky top-6">
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">Order Summary</p>

              <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-stone-100">
                <div className="w-10 h-10 rounded-lg bg-[#f5ede9] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#b87d6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-800">{PRODUCT_LABELS[order.productType]}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{FINISH_LABELS[order.finish]}</p>
                  <p className="text-xs text-stone-400">{order.widthInches}&Prime; W &times; {order.heightInches}&Prime; H</p>
                  {order.quantity > 1 && <p className="text-xs text-stone-400">Qty: {order.quantity}</p>}
                </div>
                <p className="text-sm font-medium text-stone-800 shrink-0">${order.quoteAmount.toLocaleString()}</p>
              </div>

              <div className="space-y-2 text-sm mb-4 pb-4 border-b border-stone-100">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span><span>${order.quoteAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Shipping</span><span className="text-emerald-600">Included</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Tax</span><span className="text-stone-400 text-xs">Calculated at invoice</span>
                </div>
              </div>

              <div className="flex justify-between text-stone-800 font-medium text-sm">
                <span>Total due today</span>
                <span>${order.quoteAmount.toLocaleString()}</span>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-stone-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-xs">Secured by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
