import Link from 'next/link'
import { DEMO_ORDERS } from '@/data/orders'
import { DEMO_CUSTOMERS } from '@/data/customers'
import { MONTHLY_METRICS, LOST_DEALS } from '@/data/sales'
import { StatusBadge } from '@/components/status-badge'
import { PRODUCT_LABELS, FINISH_LABELS, CUSTOMER_TYPE_LABELS } from '@/lib/types'
import { RevenueChart } from '@/components/revenue-chart'

// ── derived metrics ──────────────────────────────────────────────────────────
const ytdMonths = MONTHLY_METRICS.filter(m => m.revenue > 0)
const ytdRevenue = ytdMonths.reduce((s, m) => s + m.revenue, 0)
const ytdGrossProfit = ytdMonths.reduce((s, m) => s + m.grossProfit, 0)
const ytdGrossMargin = ytdRevenue > 0 ? (ytdGrossProfit / ytdRevenue) * 100 : 0

const activeOrders = DEMO_ORDERS.filter(o => !['delivered', 'closed_lost'].includes(o.stage))
const pipelineValue = activeOrders.reduce((s, o) => s + (o.quoteAmount ?? 0), 0)

// lost deal aggregates
const lostByReason = LOST_DEALS.reduce<Record<string, { count: number; value: number }>>((acc, d) => {
  const key = d.lostReason
  if (!acc[key]) acc[key] = { count: 0, value: 0 }
  acc[key].count++
  acc[key].value += d.dealValue
  return acc
}, {})
const lostTotal = LOST_DEALS.reduce((s, d) => s + d.dealValue, 0)

// ── helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n.toFixed(0)}`
}

function fmtFull(n: number) {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const REASON_COLORS: Record<string, string> = {
  'Declined': 'bg-red-400',
  'Cold Leads - Unresponsive': 'bg-stone-400',
  'Out of Budget': 'bg-amber-400',
}

const REASON_TEXT: Record<string, string> = {
  'Declined': 'text-red-700',
  'Cold Leads - Unresponsive': 'text-stone-600',
  'Out of Budget': 'text-amber-700',
}

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-stone-800">Dashboard</h1>
          <p className="text-stone-400 text-sm mt-1">2026 year-to-date &bull; Jan – May</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/pipeline" className="rounded-full border border-stone-200 px-4 py-1.5 text-sm text-stone-500 hover:bg-stone-50 transition-colors">
            Pipeline
          </Link>
          <Link href="/admin/orders" className="rounded-full border border-stone-200 px-4 py-1.5 text-sm text-stone-500 hover:bg-stone-50 transition-colors">
            All Orders
          </Link>
        </div>
      </div>

      {/* ── top KPIs ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">YTD Revenue</p>
          <p className="text-2xl font-light text-stone-800">{fmtFull(ytdRevenue)}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Gross Profit</p>
          <p className="text-2xl font-light text-stone-800">{fmtFull(ytdGrossProfit)}</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Gross Margin</p>
          <p className="text-2xl font-light text-stone-800">{ytdGrossMargin.toFixed(1)}%</p>
          <p className="text-xs text-emerald-500 mt-1">Strong &mdash; above 90% avg since Apr</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Active Pipeline</p>
          <p className="text-2xl font-light text-stone-800">{fmtFull(pipelineValue)}</p>
          <p className="text-xs text-stone-400 mt-1">{activeOrders.length} open orders</p>
        </div>
      </div>

      {/* ── revenue chart + margin ─────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-xl border border-stone-200 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs uppercase tracking-widest text-stone-400">Monthly Revenue</p>
            <p className="text-xs text-stone-400">2026</p>
          </div>
          <RevenueChart months={MONTHLY_METRICS} />
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-5">Gross Margin by Month</p>
          <div className="space-y-3">
            {ytdMonths.map(m => (
              <div key={m.month}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-stone-500">{m.abbr}</span>
                  <span className="text-stone-700 font-medium">{m.grossMarginPct.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#b87d6b]"
                    style={{ width: `${m.grossMarginPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-stone-100">
            <div className="flex justify-between text-xs">
              <span className="text-stone-400">Full year avg</span>
              <span className="text-stone-800 font-medium">{ytdGrossMargin.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── lost deals ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-5">Lost Deals by Reason</p>
          <div className="space-y-4">
            {Object.entries(lostByReason).map(([reason, { count, value }]) => {
              const pct = lostTotal > 0 ? (value / lostTotal) * 100 : 0
              return (
                <div key={reason}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className={`font-medium ${REASON_TEXT[reason] ?? 'text-stone-600'}`}>{reason}</span>
                    <span className="text-stone-400">{count} deal{count !== 1 ? 's' : ''} &bull; {fmt(value)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${REASON_COLORS[reason] ?? 'bg-stone-400'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between text-xs">
            <span className="text-stone-400">Total lost value</span>
            <span className="text-stone-700 font-medium">{fmtFull(lostTotal)}</span>
          </div>
        </div>

        <div className="col-span-2 rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">Recent Lost Deals</p>
          <div className="overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400">
                  <th className="text-left py-2 font-medium">Contact</th>
                  <th className="text-left py-2 font-medium">Deal</th>
                  <th className="text-left py-2 font-medium">Value</th>
                  <th className="text-left py-2 font-medium">Reason</th>
                  <th className="text-left py-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {LOST_DEALS.filter((d, i, arr) =>
                  arr.findIndex(x => x.dealNumber === d.dealNumber && x.lostReason === d.lostReason) === i
                ).slice(0, 8).map((deal, i, arr) => (
                  <tr key={i} className={`${i < arr.length - 1 ? 'border-b border-stone-50' : ''}`}>
                    <td className="py-2.5 pr-3">
                      <p className="font-medium text-stone-700">{deal.contact}</p>
                      {deal.company && deal.company !== 'N/A' && (
                        <p className="text-stone-400">{deal.company}</p>
                      )}
                    </td>
                    <td className="py-2.5 pr-3 text-stone-600 max-w-[140px]">
                      <p className="truncate">{deal.dealTitle}</p>
                    </td>
                    <td className="py-2.5 pr-3 text-stone-700 font-medium">{fmt(deal.dealValue)}</td>
                    <td className="py-2.5 pr-3">
                      <span className={`font-medium ${REASON_TEXT[deal.lostReason] ?? 'text-stone-500'}`}>
                        {deal.lostReason === 'Cold Leads - Unresponsive' ? 'Unresponsive' : deal.lostReason}
                      </span>
                    </td>
                    <td className="py-2.5 text-stone-400">{deal.date.slice(5)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── monthly breakdown table ────────────────────────────────────────── */}
      <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100">
          <p className="text-xs uppercase tracking-widest text-stone-400">Monthly P&amp;L Breakdown</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-xs uppercase tracking-widest text-stone-400">
              <th className="text-left px-6 py-3 font-medium">Month</th>
              <th className="text-right px-6 py-3 font-medium">Revenue</th>
              <th className="text-right px-6 py-3 font-medium">COGS</th>
              <th className="text-right px-6 py-3 font-medium">Shipping</th>
              <th className="text-right px-6 py-3 font-medium">Gross Profit</th>
              <th className="text-right px-6 py-3 font-medium">Margin %</th>
            </tr>
          </thead>
          <tbody>
            {ytdMonths.map((m, i) => (
              <tr key={m.month} className={`hover:bg-stone-50 ${i < ytdMonths.length - 1 ? 'border-b border-stone-100' : ''}`}>
                <td className="px-6 py-3 text-stone-700 font-medium">{m.month}</td>
                <td className="px-6 py-3 text-right text-stone-700">{fmtFull(m.revenue)}</td>
                <td className="px-6 py-3 text-right text-stone-500">{fmtFull(m.cogs)}</td>
                <td className="px-6 py-3 text-right text-stone-500">{fmtFull(m.shipping)}</td>
                <td className="px-6 py-3 text-right text-stone-700">{fmtFull(m.grossProfit)}</td>
                <td className="px-6 py-3 text-right">
                  <span className={`font-medium ${m.grossMarginPct >= 95 ? 'text-emerald-600' : m.grossMarginPct >= 88 ? 'text-stone-700' : 'text-amber-600'}`}>
                    {m.grossMarginPct.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
            <tr className="border-t-2 border-stone-200 bg-stone-50">
              <td className="px-6 py-3 text-stone-800 font-semibold text-xs uppercase tracking-wide">YTD Total</td>
              <td className="px-6 py-3 text-right text-stone-800 font-semibold">{fmtFull(ytdRevenue)}</td>
              <td className="px-6 py-3 text-right text-stone-600 font-medium">{fmtFull(ytdMonths.reduce((s, m) => s + m.cogs, 0))}</td>
              <td className="px-6 py-3 text-right text-stone-600 font-medium">{fmtFull(ytdMonths.reduce((s, m) => s + m.shipping, 0))}</td>
              <td className="px-6 py-3 text-right text-stone-800 font-semibold">{fmtFull(ytdGrossProfit)}</td>
              <td className="px-6 py-3 text-right text-stone-800 font-semibold">{ytdGrossMargin.toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
