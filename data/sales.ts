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
  { month: 'January',   abbr: 'Jan', revenue: 47540.00,   cogs: 4360,  shipping: 2877, grossProfit: 40303.00,   grossMarginPct: 84.78 },
  { month: 'February',  abbr: 'Feb', revenue: 116921.63,  cogs: 10588, shipping: 2036, grossProfit: 104297.63,  grossMarginPct: 89.20 },
  { month: 'March',     abbr: 'Mar', revenue: 86480.11,   cogs: 8550,  shipping: 386,  grossProfit: 77544.11,   grossMarginPct: 89.67 },
  { month: 'April',     abbr: 'Apr', revenue: 104252.20,  cogs: 2900,  shipping: 0,    grossProfit: 101352.20,  grossMarginPct: 97.22 },
  { month: 'May',       abbr: 'May', revenue: 23960.00,   cogs: 450,   shipping: 0,    grossProfit: 23510.00,   grossMarginPct: 98.12 },
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
    date: '2026-04-09', dealNumber: 2500, company: 'Test Firm', contact: 'Paul Test',
    email: 'paul+test2@leveragency.ai', dealTitle: 'Fire Screen - 042026',
    description: 'Lily Stems\nWidth: 24\nHeight: 32', dealValue: 400,
    lostReason: 'Declined',
  },
  {
    date: '2026-04-17', dealNumber: 2452, company: 'Heylee Heep', contact: 'Heylee Heep',
    email: 'heyleeheepdesign@gmail.com', dealTitle: 'August FS',
    description: 'August Fire Screen\nCustom Size: 57"W\nFinish: Warm Black\nLead Time: 10-12 weeks',
    dealValue: 5000, lostReason: 'Cold Leads - Unresponsive',
  },
  {
    date: '2026-04-17', dealNumber: 2452, company: 'Heylee Heep', contact: 'Heylee Heep',
    email: 'heyleeheepdesign@gmail.com', dealTitle: 'August FS',
    description: 'August Fire Screen\nCustom Size: 57"W\nFinish: Warm Black\nLead Time: 10-12 weeks',
    dealValue: 5000, lostReason: 'Cold Leads - Unresponsive',
  },
  {
    date: '2026-04-20', dealNumber: 1902, company: 'N/A', contact: 'Julia Heiskanen',
    email: 'julia.takaaho@gmail.com', dealTitle: 'Butterfly Wall Sculpture - Horizontal',
    description: '', dealValue: 3800, lostReason: 'Cold Leads - Unresponsive',
  },
  {
    date: '2026-04-20', dealNumber: 1902, company: 'N/A', contact: 'Julia Heiskanen',
    email: 'julia.takaaho@gmail.com', dealTitle: 'Butterfly Wall Sculpture - Horizontal',
    description: '', dealValue: 3800, lostReason: 'Cold Leads - Unresponsive',
  },
  {
    date: '2026-04-24', dealNumber: 2514, company: 'Sandra Sampson', contact: 'Sandra Sampson',
    email: 'sandrawilliams817@gmail.com', dealTitle: 'Sakura/Ginkgo',
    description: 'Sakura/Ginkgo\n45W x 30H', dealValue: 4340, lostReason: 'Out of Budget',
  },
  {
    date: '2026-04-27', dealNumber: 2494, company: '', contact: 'Mary Margaret',
    email: 'marymargaret@ryanstreet.com', dealTitle: 'Ginkgo FS',
    description: '', dealValue: 100, lostReason: 'Cold Leads - Unresponsive',
  },
  {
    date: '2026-04-27', dealNumber: 2494, company: '', contact: 'Mary Margaret',
    email: 'marymargaret@ryanstreet.com', dealTitle: 'Ginkgo FS',
    description: '', dealValue: 100, lostReason: 'Cold Leads - Unresponsive',
  },
  {
    date: '2026-04-29', dealNumber: 2503, company: 'Omnilink Designs', contact: 'Alice Link',
    email: 'omnilinkdesigns@gmail.com', dealTitle: 'Ginkgo FS',
    description: 'Ginkgo Fire Screen\nCustom Size: 33"W\nFinish: Brilliant Gold\nLead Time: 10-12 weeks',
    dealValue: 100, lostReason: 'Out of Budget',
  },
  {
    date: '2026-04-29', dealNumber: 2503, company: 'Omnilink Designs', contact: 'Alice Link',
    email: 'omnilinkdesigns@gmail.com', dealTitle: 'Ginkgo FS',
    description: 'Ginkgo Fire Screen\nCustom Size: 33"W\nFinish: Brilliant Gold\nLead Time: 10-12 weeks',
    dealValue: 100, lostReason: 'Out of Budget',
  },
  {
    date: '2026-04-29', dealNumber: 2503, company: 'Omnilink Designs', contact: 'Alice Link',
    email: 'omnilinkdesigns@gmail.com', dealTitle: 'Ginkgo FS',
    description: 'Ginkgo Fire Screen\nCustom Size: 33"W\nFinish: Brilliant Gold\nLead Time: 10-12 weeks',
    dealValue: 100, lostReason: 'Out of Budget',
  },
]
