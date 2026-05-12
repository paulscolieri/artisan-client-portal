import { PipelineStage, STAGE_LABELS } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

const STAGE_COLORS: Record<PipelineStage, string> = {
  form_submitted: 'bg-stone-100 text-stone-700 border-stone-200',
  quote_sent: 'bg-blue-50 text-blue-700 border-blue-200',
  quote_approved: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  in_production: 'bg-amber-50 text-amber-700 border-amber-200',
  shipped: 'bg-purple-50 text-purple-700 border-purple-200',
  delivered: 'bg-teal-50 text-teal-700 border-teal-200',
  closed_lost: 'bg-red-50 text-red-400 border-red-200',
}

export function StatusBadge({ stage }: { stage: PipelineStage }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STAGE_COLORS[stage]}`}
    >
      {STAGE_LABELS[stage]}
    </span>
  )
}
