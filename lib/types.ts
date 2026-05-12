export type Role = 'customer' | 'admin' | 'production'

export type CustomerType = 'trade_established' | 'trade_prospective' | 'enthusiast'

export type ProductType =
  | 'fire_screen'
  | 'lighting'
  | 'wall_sculpture'
  | 'mirror'
  | 'table'
  | 'multiple'
  | 'other'

export type Finish =
  | 'aged_gold'
  | 'aged_silver'
  | 'brilliant_gold'
  | 'gold_rubbed_black'
  | 'tobacco'
  | 'warm_black'
  | 'other'

export type Environment =
  | 'living_room'
  | 'dining_room'
  | 'bedroom'
  | 'study'
  | 'outdoor'

export type Timeline = '1_2_months' | '3_4_months' | 'flexible'

export type PipelineStage =
  | 'form_submitted'
  | 'quote_sent'
  | 'quote_approved'
  | 'paid'
  | 'in_production'
  | 'shipped'
  | 'delivered'
  | 'closed_lost'

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  customerType: CustomerType
  source: string
  createdAt: string
}

export interface Order {
  id: string
  customerId: string
  stage: PipelineStage
  productType: ProductType
  quantity: number
  widthInches: number
  heightInches: number
  finish: Finish
  environment?: Environment
  timeline: Timeline
  projectLocation: string
  additionalContext?: string
  quoteAmount?: number
  qbInvoiceId?: string
  asanaLink?: string
  acDealLink?: string
  internalNotes?: string
  submittedAt: string
  updatedAt: string
}

export const PRODUCT_LABELS: Record<ProductType, string> = {
  fire_screen: 'Fire Screen',
  lighting: 'Lighting',
  wall_sculpture: 'Wall Sculpture',
  mirror: 'Mirror',
  table: 'Table',
  multiple: 'Multiple Pieces',
  other: 'Other',
}

export const FINISH_LABELS: Record<Finish, string> = {
  aged_gold: 'Aged Gold',
  aged_silver: 'Aged Silver',
  brilliant_gold: 'Brilliant Gold',
  gold_rubbed_black: 'Gold Rubbed Black',
  tobacco: 'Tobacco',
  warm_black: 'Warm Black',
  other: 'Other',
}

export const ENVIRONMENT_LABELS: Record<Environment, string> = {
  living_room: 'Living Room',
  dining_room: 'Dining Room',
  bedroom: 'Bedroom',
  study: 'Study',
  outdoor: 'Outdoor Space',
}

export const TIMELINE_LABELS: Record<Timeline, string> = {
  '1_2_months': '1-2 Months',
  '3_4_months': '3-4 Months',
  flexible: 'Flexible',
}

export const STAGE_LABELS: Record<PipelineStage, string> = {
  form_submitted: 'Form Submitted',
  quote_sent: 'Quote Sent',
  quote_approved: 'Quote Approved',
  paid: 'Paid',
  in_production: 'In Production',
  shipped: 'Shipped',
  delivered: 'Delivered',
  closed_lost: 'Closed Lost',
}

export const CUSTOMER_TYPE_LABELS: Record<CustomerType, string> = {
  trade_established: 'Trade Member',
  trade_prospective: 'Prospective Trade',
  enthusiast: 'Design Enthusiast',
}

export const PIPELINE_STAGES: PipelineStage[] = [
  'form_submitted',
  'quote_sent',
  'quote_approved',
  'paid',
  'in_production',
  'shipped',
  'delivered',
  'closed_lost',
]
