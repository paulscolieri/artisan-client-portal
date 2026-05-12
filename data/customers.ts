import { Customer } from '@/lib/types'

export const DEMO_CUSTOMERS: Customer[] = [
  {
    id: 'cust-001',
    firstName: 'Margaret',
    lastName: 'Ashworth',
    email: 'margaret@ashworthdesign.com',
    phone: '(212) 555-0142',
    company: 'Ashworth Interior Design',
    customerType: 'trade_established',
    source: 'Showroom',
    createdAt: '2024-03-15',
  },
  {
    id: 'cust-002',
    firstName: 'James',
    lastName: 'Calloway',
    email: 'jcalloway@callowaystudio.com',
    phone: '(404) 555-0198',
    company: 'Calloway Studio',
    customerType: 'trade_established',
    source: 'Instagram',
    createdAt: '2024-07-02',
  },
  {
    id: 'cust-003',
    firstName: 'Diana',
    lastName: 'Mercer',
    email: 'diana.mercer@gmail.com',
    phone: '(615) 555-0071',
    company: 'Mercer Residential Group',
    customerType: 'trade_prospective',
    source: 'Pinterest',
    createdAt: '2025-01-18',
  },
  {
    id: 'cust-004',
    firstName: 'Thomas',
    lastName: 'Whitfield',
    email: 'twhitfield@gmail.com',
    phone: '(843) 555-0234',
    customerType: 'enthusiast',
    source: '1stDibs',
    createdAt: '2025-04-05',
  },
]

// The "active" demo customer when viewing as Customer role
export const DEMO_CUSTOMER = DEMO_CUSTOMERS[0]
