'use client'

import { MonthlyMetric } from '@/data/sales'

const BAR_HEIGHT = 160
const BAR_WIDTH = 32
const GAP = 12

function formatK(n: number) {
  if (n === 0) return ''
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`
  return `$${n}`
}

export function RevenueChart({ months }: { months: MonthlyMetric[] }) {
  const maxRevenue = Math.max(...months.map(m => m.revenue), 1)
  const activeMonths = months.filter(m => m.revenue > 0)
  const totalWidth = months.length * (BAR_WIDTH + GAP) - GAP

  return (
    <div className="overflow-x-auto">
      <svg
        width={totalWidth}
        height={BAR_HEIGHT + 48}
        className="overflow-visible"
        style={{ minWidth: totalWidth }}
      >
        {/* horizontal grid lines */}
        {[0.25, 0.5, 0.75, 1].map(frac => {
          const y = BAR_HEIGHT - frac * BAR_HEIGHT
          return (
            <line
              key={frac}
              x1={0}
              y1={y}
              x2={totalWidth}
              y2={y}
              stroke="#e7e5e4"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          )
        })}

        {months.map((m, i) => {
          const x = i * (BAR_WIDTH + GAP)
          const barH = m.revenue > 0 ? Math.max((m.revenue / maxRevenue) * BAR_HEIGHT, 4) : 2
          const y = BAR_HEIGHT - barH
          const isEmpty = m.revenue === 0

          return (
            <g key={m.month}>
              {/* bar */}
              <rect
                x={x}
                y={isEmpty ? BAR_HEIGHT - 2 : y}
                width={BAR_WIDTH}
                height={isEmpty ? 2 : barH}
                rx={4}
                fill={isEmpty ? '#e7e5e4' : '#b87d6b'}
                opacity={isEmpty ? 0.5 : 1}
              />
              {/* value label above bar */}
              {m.revenue > 0 && (
                <text
                  x={x + BAR_WIDTH / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#78716c"
                  fontFamily="var(--font-sans)"
                >
                  {formatK(m.revenue)}
                </text>
              )}
              {/* month label below */}
              <text
                x={x + BAR_WIDTH / 2}
                y={BAR_HEIGHT + 16}
                textAnchor="middle"
                fontSize={10}
                fill={isEmpty ? '#d6d3d1' : '#78716c'}
                fontFamily="var(--font-sans)"
              >
                {m.abbr}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
