export interface MonthlyMetric {
  month: string
  abbr: string
  revenue: number
  cogs: number
  shipping: number
  grossProfit: number
  grossMarginPct: number
}

export interface LostDeal {
  date: string
  dealNumber: number
  company: string
  contact: string
  email: string
  dealTitle: string
  description: string
  dealValue: number
  lostReason: string
  lostReasonDetail?: string
}

export const MONTHLY_METRICS: MonthlyMetric[] = [
  { month: 'January',   abbr: 'Jan', revenue: 38940.00,   cogs: 3580,  shipping: 2350, grossProfit: 33010.00,   grossMarginPct: 84.77 },
  { month: 'February',  abbr: 'Feb', revenue: 95880.00,   cogs: 8680,  shipping: 1670, grossProfit: 85530.00,   grossMarginPct: 89.21 },
  { month: 'March',     abbr: 'Mar', revenue: 70920.00,   cogs: 7010,  shipping: 320,  grossProfit: 63590.00,   grossMarginPct: 89.67 },
  { month: 'April',     abbr: 'Apr', revenue: 85440.00,   cogs: 2380,  shipping: 0,    grossProfit: 83060.00,   grossMarginPct: 97.22 },
  { month: 'May',       abbr: 'May', revenue: 19640.00,   cogs: 370,   shipping: 0,    grossProfit: 19270.00,   grossMarginPct: 98.12 },
  { month: 'June',      abbr: 'Jun', revenue: 0,          cogs: 0,     shipping: 0,    grossProfit: 0,          grossMarginPct: 0 },
  { month: 'July',      abbr: 'Jul', revenue: 0,          cogs: 0,     shipping: 0,    grossProfit: 0,          grossMarginPct: 0 },
  { month: 'August',    abbr: 'Aug', revenue: 0,          cogs: 0,     shipping: 0,    grossProfit: 0,          grossMarginPct: 0 },
  { month: 'September', abbr: 'Sep', revenue: 0,          cogs: 0,     shipping: 0,    grossProfit: 0,          grossMarginPct: 0 },
  { month: 'October',   abbr: 'Oct', revenue: 0,          cogs: 0,     shipping: 0,    grossProfit: 0,          grossMarginPct: 0 },
  { month: 'November',  abbr: 'Nov', revenue: 0,          cogs: 0,     shipping: 0,    grossProfit: 0,          grossMarginPct: 0 },
  { month: 'December',  abbr: 'Dec', revenue: 0,          cogs: 0,     shipping: 0,    grossProfit: 0,          grossMarginPct: 0 },
]

export const LOST_DEALS: LostDeal[] = [
  {
    date: '2026-04-09', dealNumber: 2500, company: 'Larkin Studio', contact: 'Lauren Marsh',
    email: 'lmarsh@larkinstudio.com', dealTitle: 'Fire Screen - 042026',
    description: 'Lily Stems\nWidth: 24\nHeight: 32', dealValue: 400,
    lostReason: 'Declined',
  },
  {
    date: '2026-04-17', dealNumber: 2452, company: 'Webb Interiors', contact: 'Courtney Webb',
    email: 'courtney@webbinteriors.com', dealTitle: 'August FS',
    description: 'August Fire Screen\nCustom Size: 57"W\nFinish: Warm Black\nLead Time: 10-12 weeks',
    dealValue: 5000, lostReason: 'Cold Leads - Unresponsive',
  },
  {
    date: '2026-04-20', dealNumber: 1902, company: 'N/A', contact: 'Priya Sharma',
    email: 'priya.s@gmail.com', dealTitle: 'Butterfly Wall Sculpture - Horizontal',
    description: '', dealValue: 3800, lostReason: 'Cold Leads - Unresponsive',
  },
  {
    date: '2026-04-24', dealNumber: 2514, company: 'Ellen Roth Design', contact: 'Ellen Roth',
    email: 'ellen@ellenrothdesign.com', dealTitle: 'Sakura/Ginkgo',
    description: 'Sakura/Ginkgo\n45W x 30H', dealValue: 4340, lostReason: 'Out of Budget',
  },
  {
    date: '2026-04-27', dealNumber: 2494, company: '', contact: 'Claire Donovan',
    email: 'claire.d@gmail.com', dealTitle: 'Ginkgo FS',
    description: '', dealValue: 100, lostReason: 'Cold Leads - Unresponsive',
  },
  {
    date: '2026-04-29', dealNumber: 2503, company: 'Meridian Studio', contact: 'Rachel Flores',
    email: 'rachel@meridianstudio.com', dealTitle: 'Ginkgo FS',
    description: 'Ginkgo Fire Screen\nCustom Size: 33"W\nFinish: Brilliant Gold\nLead Time: 10-12 weeks',
    dealValue: 100, lostReason: 'Out of Budget',
  },
]
